import { useState } from "react";
import MapView from "@/components/MapView";
import SearchPanel from "@/components/SearchPanel";
import Icon from "@/components/ui/icon";

const MapPage = () => {
  const [routeActive, setRouteActive] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<{ name: string; rating: number } | null>(null);

  const handleBuildRoute = (_from: string, _to: string) => {
    setRouteActive(true);
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Map fills entire space */}
      <div className="flex-1 relative">
        <MapView
          onPointSelect={(p) => setSelectedPoint({ name: p.name, rating: p.rating })}
          routeActive={routeActive}
        />

        {/* Search panel overlay */}
        <div className="absolute top-4 left-4 z-10">
          <SearchPanel onBuildRoute={handleBuildRoute} />
        </div>

        {/* Active route info */}
        {routeActive && (
          <div className="absolute bottom-6 left-4 right-4 md:right-auto md:w-80 glass rounded-2xl p-4 animate-slide-up">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">Маршрут построен</h3>
              <button
                onClick={() => setRouteActive(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name="X" size={15} />
              </button>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-xl font-bold text-[#38bdf8]">25</p>
                <p className="text-xs text-muted-foreground">мин</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-foreground">8.3</p>
                <p className="text-xs text-muted-foreground">км</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-[#4ade80]">Свободно</p>
                <p className="text-xs text-muted-foreground">дороги</p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="flex-1 py-2 rounded-xl bg-[#38bdf8] text-[#0f1419] text-sm font-semibold hover:bg-[#7dd3fc] transition-colors">
                Начать
              </button>
              <button className="px-3 py-2 rounded-xl bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="Share2" size={15} />
              </button>
            </div>
          </div>
        )}

        {/* Point info card */}
        {selectedPoint && !routeActive && (
          <div className="absolute bottom-6 left-4 right-4 md:right-auto md:w-72 glass rounded-2xl p-4 animate-slide-up">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">{selectedPoint.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <Icon name="Star" size={12} className="text-amber-400" />
                  <span className="text-xs text-muted-foreground">{selectedPoint.rating}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedPoint(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setRouteActive(true)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#38bdf8]/20 border border-[#38bdf8]/30 text-[#38bdf8] text-xs hover:bg-[#38bdf8]/30 transition-colors"
              >
                <Icon name="Navigation" size={13} />
                Маршрут
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-secondary text-muted-foreground hover:text-foreground text-xs transition-colors">
                <Icon name="Bookmark" size={13} />
                Сохранить
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPage;
