/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

declare global {
  interface Window {
    ymaps: any;
  }
}

interface MapViewProps {
  onPointSelect?: (point: { name: string; rating: number }) => void;
  routeActive?: boolean;
  routeFrom?: string;
  routeTo?: string;
}

const MapView = ({ onPointSelect, routeActive, routeFrom, routeTo }: MapViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const routeRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [trafficVisible, setTrafficVisible] = useState(false);
  const trafficRef = useRef<any>(null);
  const onPointSelectRef = useRef(onPointSelect);
  onPointSelectRef.current = onPointSelect;

  useEffect(() => {
    const init = () => {
      if (!containerRef.current || mapRef.current) return;

      window.ymaps.ready(() => {
        const map = new window.ymaps.Map(
          containerRef.current,
          {
            center: [55.751574, 37.573856],
            zoom: 14,
            controls: [],
          },
          { suppressMapOpenBlock: true }
        );

        mapRef.current = map;

        map.events.add("click", (e: any) => {
          const coords = e.get("coords");
          window.ymaps
            .geocode(coords, { results: 1 })
            .then((res: any) => {
              const obj = res.geoObjects.get(0);
              if (obj) {
                const name = obj.getAddressLine();
                onPointSelectRef.current?.({ name, rating: 0 });
              }
            });
        });

        setReady(true);
      });
    };

    if (window.ymaps) {
      init();
    } else {
      const interval = setInterval(() => {
        if (window.ymaps) {
          clearInterval(interval);
          init();
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, []);

  // Traffic layer
  useEffect(() => {
    if (!mapRef.current || !ready) return;
    if (trafficVisible) {
      const traffic = new window.ymaps.traffic.provider.Actual(
        {},
        { infoLayerShown: true }
      );
      traffic.setMap(mapRef.current);
      trafficRef.current = traffic;
    } else {
      if (trafficRef.current) {
        trafficRef.current.setMap(null);
        trafficRef.current = null;
      }
    }
  }, [trafficVisible, ready]);

  // Build route
  useEffect(() => {
    if (!mapRef.current || !ready) return;
    if (routeRef.current) {
      mapRef.current.geoObjects.remove(routeRef.current);
      routeRef.current = null;
    }
    if (routeActive && routeFrom && routeTo) {
      window.ymaps
        .route([routeFrom, routeTo], {
          routingMode: "auto",
          avoidTrafficJams: true,
        })
        .then((route: any) => {
          routeRef.current = route;
          mapRef.current.geoObjects.add(route);
          mapRef.current.setBounds(route.getBounds(), {
            checkZoomRange: true,
            zoomMargin: 40,
          });
        });
    }
  }, [routeActive, routeFrom, routeTo, ready]);

  const handleZoomIn = () =>
    mapRef.current?.setZoom(mapRef.current.getZoom() + 1, { smooth: true });
  const handleZoomOut = () =>
    mapRef.current?.setZoom(mapRef.current.getZoom() - 1, { smooth: true });

  const handleLocate = () => {
    if (!mapRef.current) return;
    window.ymaps.geolocation
      .get({ provider: "browser", mapStateAutoApply: true })
      .then((result: any) => {
        mapRef.current.geoObjects.add(result.geoObjects);
        mapRef.current.setBounds(result.geoObjects.getBounds(), {
          checkZoomRange: true,
          zoomMargin: 60,
        });
      });
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />

      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-[#38bdf8] border-t-transparent animate-spin" />
            <span className="text-sm text-muted-foreground">Загружаю карту...</span>
          </div>
        </div>
      )}

      {ready && (
        <div className="absolute right-4 top-4 flex flex-col gap-2 z-10">
          <button
            onClick={handleZoomIn}
            className="glass w-9 h-9 rounded-lg flex items-center justify-center hover:border-[#38bdf8]/40 transition-all"
          >
            <Icon name="Plus" size={16} className="text-foreground" />
          </button>
          <button
            onClick={handleZoomOut}
            className="glass w-9 h-9 rounded-lg flex items-center justify-center hover:border-[#38bdf8]/40 transition-all"
          >
            <Icon name="Minus" size={16} className="text-foreground" />
          </button>
          <div className="w-9 h-px bg-border" />
          <button
            onClick={() => setTrafficVisible((v) => !v)}
            className={`glass w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
              trafficVisible ? "border-[#38bdf8]/60" : ""
            }`}
            title="Пробки"
          >
            <Icon
              name="Car"
              size={16}
              className={trafficVisible ? "text-[#38bdf8]" : "text-muted-foreground"}
            />
          </button>
          <button
            onClick={handleLocate}
            className="glass w-9 h-9 rounded-lg flex items-center justify-center hover:border-[#38bdf8]/40 transition-all"
            title="Моё местоположение"
          >
            <Icon name="Crosshair" size={16} className="text-[#38bdf8]" />
          </button>
        </div>
      )}

      {trafficVisible && ready && (
        <div className="absolute top-4 left-4 glass rounded-lg px-3 py-1.5 flex items-center gap-2 animate-fade-in z-10">
          <div className="w-2 h-2 rounded-full bg-red-500 notification-dot" />
          <span className="text-xs text-foreground">Пробки активны</span>
        </div>
      )}
    </div>
  );
};

export default MapView;
