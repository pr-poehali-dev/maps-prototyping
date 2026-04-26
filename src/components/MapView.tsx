import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface Point {
  id: string;
  name: string;
  type: "cafe" | "museum" | "park" | "shop" | "hotel" | "transport";
  x: number;
  y: number;
  rating: number;
}

interface MapViewProps {
  onPointSelect?: (point: Point) => void;
  routeActive?: boolean;
  routeFrom?: string;
  routeTo?: string;
}

const POINTS: Point[] = [
  { id: "1", name: "Красная площадь", type: "museum", x: 52, y: 42, rating: 4.9 },
  { id: "2", name: "ГУМ", type: "shop", x: 54, y: 39, rating: 4.6 },
  { id: "3", name: "Кофемания", type: "cafe", x: 45, y: 55, rating: 4.5 },
  { id: "4", name: "Парк Горького", type: "park", x: 38, y: 65, rating: 4.8 },
  { id: "5", name: "Отель Метрополь", type: "hotel", x: 57, y: 44, rating: 4.7 },
  { id: "6", name: "ст. Охотный ряд", type: "transport", x: 48, y: 47, rating: 4.3 },
  { id: "7", name: "Пушкинский музей", type: "museum", x: 42, y: 58, rating: 4.8 },
  { id: "8", name: "Третьяковская галерея", type: "museum", x: 50, y: 62, rating: 4.9 },
];

const TYPE_ICONS: Record<string, { icon: string; color: string }> = {
  cafe: { icon: "Coffee", color: "#f59e0b" },
  museum: { icon: "Landmark", color: "#38bdf8" },
  park: { icon: "Trees", color: "#4ade80" },
  shop: { icon: "ShoppingBag", color: "#f472b6" },
  hotel: { icon: "Building2", color: "#a78bfa" },
  transport: { icon: "Train", color: "#fb923c" },
};

const MapView = ({ onPointSelect, routeActive }: MapViewProps) => {
  const [zoom, setZoom] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [userPos] = useState({ x: 50, y: 50 });
  const [trafficVisible, setTrafficVisible] = useState(false);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 2.5));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));

  const handlePoint = (point: Point) => {
    setSelected(point.id);
    onPointSelect?.(point);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0f1419] rounded-none">
      {/* Map grid background */}
      <div
        className="absolute inset-0 map-grid opacity-60"
        style={{ transform: `scale(${zoom})`, transformOrigin: "center", transition: "transform 0.3s ease" }}
      />

      {/* SVG Streets layer */}
      <svg
        className="absolute inset-0 w-full h-full route-svg"
        style={{ transform: `scale(${zoom})`, transformOrigin: "center", transition: "transform 0.3s ease" }}
      >
        {/* Streets */}
        <path d="M 10% 50% Q 30% 40% 50% 50% Q 70% 60% 90% 50%" stroke="rgba(255,255,255,0.07)" strokeWidth="12" fill="none" />
        <path d="M 50% 10% Q 45% 30% 50% 50% Q 55% 70% 50% 90%" stroke="rgba(255,255,255,0.07)" strokeWidth="8" fill="none" />
        <path d="M 20% 30% Q 40% 35% 55% 45% Q 65% 55% 80% 65%" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="none" />
        <path d="M 15% 70% Q 35% 60% 55% 62% Q 70% 63% 85% 70%" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="none" />
        <path d="M 25% 20% Q 38% 35% 48% 47% Q 52% 52% 57% 62%" stroke="rgba(255,255,255,0.04)" strokeWidth="4" fill="none" />

        {/* Traffic overlay */}
        {trafficVisible && (
          <>
            <path d="M 10% 50% Q 30% 40% 50% 50%" stroke="rgba(239,68,68,0.6)" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M 50% 50% Q 70% 60% 90% 50%" stroke="rgba(234,179,8,0.5)" strokeWidth="8" fill="none" strokeLinecap="round" />
          </>
        )}

        {/* Active route */}
        {routeActive && (
          <path
            d={`M ${POINTS[5].x}% ${POINTS[5].y}% Q 50% 50% ${POINTS[3].x}% ${POINTS[3].y}%`}
            stroke="url(#routeGrad)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="6 4"
          />
        )}

        <defs>
          <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>
        </defs>
      </svg>

      {/* Points of interest */}
      <div
        className="absolute inset-0"
        style={{ transform: `scale(${zoom})`, transformOrigin: "center", transition: "transform 0.3s ease" }}
      >
        {POINTS.map((point) => {
          const meta = TYPE_ICONS[point.type];
          const isSelected = selected === point.id;
          return (
            <button
              key={point.id}
              onClick={() => handlePoint(point)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
            >
              <div
                className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                  isSelected ? "scale-125 shadow-lg" : "hover:scale-110"
                }`}
                style={{
                  backgroundColor: `${meta.color}22`,
                  borderColor: meta.color,
                  boxShadow: isSelected ? `0 0 16px ${meta.color}66` : "none",
                }}
              >
                <Icon name={meta.icon} size={14} style={{ color: meta.color }} />
              </div>
              {isSelected && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 glass rounded-lg px-3 py-2 whitespace-nowrap z-10 animate-fade-in">
                  <p className="text-xs font-medium text-foreground">{point.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Icon name="Star" size={10} className="text-amber-400" />
                    <span className="text-[10px] text-muted-foreground">{point.rating}</span>
                  </div>
                </div>
              )}
            </button>
          );
        })}

        {/* User location */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${userPos.x}%`, top: `${userPos.y}%` }}
        >
          <div className="w-4 h-4 rounded-full bg-[#38bdf8] border-2 border-white shadow-lg">
            <div className="absolute inset-0 rounded-full bg-[#38bdf8] animate-ping opacity-30" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
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
        <div className="w-9 h-px bg-border mx-auto" />
        <button
          onClick={() => setTrafficVisible((v) => !v)}
          className={`glass w-9 h-9 rounded-lg flex items-center justify-center transition-all ${trafficVisible ? "border-[#38bdf8]/60" : ""}`}
          title="Пробки"
        >
          <Icon name="Car" size={16} className={trafficVisible ? "text-[#38bdf8]" : "text-muted-foreground"} />
        </button>
        <button className="glass w-9 h-9 rounded-lg flex items-center justify-center hover:border-[#38bdf8]/40 transition-all">
          <Icon name="Crosshair" size={16} className="text-[#38bdf8]" />
        </button>
      </div>

      {/* Scale */}
      <div className="absolute bottom-4 left-4 flex items-end gap-2">
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-1">
            <div className="w-16 h-0.5 bg-foreground/30" />
            <span className="text-[10px] text-muted-foreground">500м</span>
          </div>
        </div>
      </div>

      {/* Traffic badge */}
      {trafficVisible && (
        <div className="absolute top-4 left-4 glass rounded-lg px-3 py-1.5 flex items-center gap-2 animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-red-500 notification-dot" />
          <span className="text-xs text-foreground">Пробки активны</span>
        </div>
      )}
    </div>
  );
};

export default MapView;