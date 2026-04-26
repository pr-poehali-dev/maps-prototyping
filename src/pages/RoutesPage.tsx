import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Route {
  id: string;
  name: string;
  from: string;
  to: string;
  distance: string;
  duration: string;
  date: string;
  transport: string;
  favorite: boolean;
  status: "completed" | "saved" | "recent";
}

const ROUTES: Route[] = [
  {
    id: "1",
    name: "На работу",
    from: "Ул. Ленина, 14",
    to: "Офис на Невском",
    distance: "12.4 км",
    duration: "28 мин",
    date: "Сегодня, 09:15",
    transport: "Car",
    favorite: true,
    status: "recent",
  },
  {
    id: "2",
    name: "Парк Горького",
    from: "Дом",
    to: "Парк Горького",
    distance: "4.2 км",
    duration: "55 мин",
    date: "Вчера, 14:30",
    transport: "Bike",
    favorite: false,
    status: "completed",
  },
  {
    id: "3",
    name: "Третьяковская",
    from: "Красная площадь",
    to: "Третьяковская галерея",
    distance: "2.1 км",
    duration: "25 мин",
    date: "23 апр",
    transport: "Footprints",
    favorite: true,
    status: "saved",
  },
  {
    id: "4",
    name: "Аэропорт Шереметьево",
    from: "Центр Москвы",
    to: "ш. Шереметьево",
    distance: "38.6 км",
    duration: "55 мин",
    date: "20 апр",
    transport: "Car",
    favorite: false,
    status: "completed",
  },
  {
    id: "5",
    name: "Поход в ГУМ",
    from: "Метро Охотный ряд",
    to: "ГУМ, Красная пл.",
    distance: "0.8 км",
    duration: "10 мин",
    date: "18 апр",
    transport: "Footprints",
    favorite: false,
    status: "completed",
  },
];

const TRANSPORT_LABELS: Record<string, string> = {
  Car: "Авто",
  Bike: "Велосипед",
  Train: "Метро",
  Footprints: "Пешком",
};

const STATUS_BADGES: Record<string, { label: string; classes: string }> = {
  completed: { label: "Завершён", classes: "bg-green-500/10 text-green-400 border-green-500/20" },
  saved: { label: "Сохранён", classes: "bg-[#38bdf8]/10 text-[#38bdf8] border-[#38bdf8]/20" },
  recent: { label: "Недавний", classes: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
};

const RoutesPage = () => {
  const [routes, setRoutes] = useState(ROUTES);
  const [filter, setFilter] = useState<"all" | "saved" | "completed">("all");
  const [search, setSearch] = useState("");

  const toggleFavorite = (id: string) => {
    setRoutes((prev) => prev.map((r) => (r.id === id ? { ...r, favorite: !r.favorite } : r)));
  };

  const filtered = routes.filter((r) => {
    if (filter === "saved") return r.status === "saved" || r.favorite;
    if (filter === "completed") return r.status === "completed";
    return true;
  }).filter((r) =>
    search ? r.name.toLowerCase().includes(search.toLowerCase()) || r.from.toLowerCase().includes(search.toLowerCase()) : true
  );

  const stats = {
    total: routes.length,
    km: routes.reduce((acc, r) => acc + parseFloat(r.distance), 0).toFixed(0),
    hours: Math.round(routes.reduce((acc, r) => acc + parseInt(r.duration), 0) / 60),
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="glass border-b border-border px-6 py-4">
        <h1 className="text-lg font-semibold text-foreground">Маршруты</h1>
        <p className="text-xs text-muted-foreground mt-0.5">История и сохранённые поездки</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6 flex flex-col gap-4 max-w-2xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Поездок", value: stats.total, icon: "Route" },
              { label: "Км пройдено", value: stats.km, icon: "TrendingUp" },
              { label: "Часов в дороге", value: stats.hours, icon: "Clock" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-xl p-3 text-center hover-lift">
                <Icon name={s.icon} size={16} className="text-[#38bdf8] mx-auto mb-1" />
                <p className="text-xl font-bold text-foreground">{s.value}</p>
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Search & filter */}
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 bg-secondary rounded-xl px-3 py-2">
              <Icon name="Search" size={14} className="text-muted-foreground shrink-0" />
              <input
                className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
                placeholder="Поиск маршрутов..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-1 glass rounded-xl p-1">
              {(["all", "saved", "completed"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
                    filter === f ? "bg-[#38bdf8]/20 text-[#38bdf8]" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f === "all" ? "Все" : f === "saved" ? "Избранные" : "Завершённые"}
                </button>
              ))}
            </div>
          </div>

          {/* Routes list */}
          <div className="flex flex-col gap-2">
            {filtered.length === 0 && (
              <div className="glass rounded-2xl p-8 text-center">
                <Icon name="Route" size={32} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Маршруты не найдены</p>
              </div>
            )}
            {filtered.map((route) => {
              const badge = STATUS_BADGES[route.status];
              return (
                <div key={route.id} className="glass rounded-2xl p-4 hover-lift animate-fade-in">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                        <Icon name={route.transport} size={18} className="text-[#38bdf8]" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-foreground truncate">{route.name}</h3>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${badge.classes} shrink-0`}>
                            {badge.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Icon name="MapPin" size={10} className="text-muted-foreground shrink-0" />
                          <p className="text-xs text-muted-foreground truncate">{route.from} → {route.to}</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFavorite(route.id)}
                      className="shrink-0"
                    >
                      <Icon
                        name={route.favorite ? "Heart" : "Heart"}
                        size={16}
                        className={route.favorite ? "text-red-400" : "text-muted-foreground hover:text-foreground"}
                        style={{ fill: route.favorite ? "currentColor" : "none" }}
                      />
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={11} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{route.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="TrendingUp" size={11} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{route.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Calendar" size={11} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{route.date}</span>
                    </div>
                    <div className="ml-auto flex gap-2">
                      <button className="text-xs text-[#38bdf8] hover:text-[#7dd3fc] transition-colors flex items-center gap-1">
                        <Icon name="RotateCcw" size={11} />
                        Повторить
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutesPage;
