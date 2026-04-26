import { useState } from "react";
import Icon from "@/components/ui/icon";

interface SearchResult {
  id: string;
  name: string;
  address: string;
  type: string;
  distance: string;
}

const MOCK_RESULTS: SearchResult[] = [
  { id: "1", name: "Красная площадь", address: "Москва, Китай-город", type: "Достопримечательность", distance: "0.3 км" },
  { id: "2", name: "Кофемания", address: "Ул. Пятницкая, 7", type: "Кафе", distance: "0.8 км" },
  { id: "3", name: "Парк Горького", address: "Крымский Вал, 9", type: "Парк", distance: "2.1 км" },
  { id: "4", name: "Пушкинский музей", address: "Ул. Волхонка, 12", type: "Музей", distance: "1.4 км" },
];

interface SearchPanelProps {
  onBuildRoute?: (from: string, to: string) => void;
}

const SearchPanel = ({ onBuildRoute }: SearchPanelProps) => {
  const [query, setQuery] = useState("");
  const [routeMode, setRouteMode] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [focused, setFocused] = useState(false);

  const handleSearch = (val: string) => {
    setQuery(val);
    if (val.length > 1) {
      setResults(MOCK_RESULTS.filter((r) => r.name.toLowerCase().includes(val.toLowerCase())));
    } else {
      setResults([]);
    }
  };

  const handleBuildRoute = () => {
    if (from && to) {
      onBuildRoute?.(from, to);
    }
  };

  return (
    <div className="glass rounded-2xl p-4 flex flex-col gap-3 w-full max-w-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Поиск и маршруты</h2>
        <button
          onClick={() => setRouteMode((v) => !v)}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all ${
            routeMode ? "bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/30" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Icon name="Navigation" size={12} />
          Маршрут
        </button>
      </div>

      {!routeMode ? (
        /* Search mode */
        <div className="relative">
          <div className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-2.5">
            <Icon name="Search" size={15} className="text-muted-foreground shrink-0" />
            <input
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
              placeholder="Поиск мест, адресов..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
            />
            {query && (
              <button onClick={() => { setQuery(""); setResults([]); }}>
                <Icon name="X" size={13} className="text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>

          {focused && results.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 glass rounded-xl overflow-hidden z-20 animate-fade-in">
              {results.map((r) => (
                <button
                  key={r.id}
                  className="w-full flex items-start gap-3 px-3 py-3 hover:bg-white/5 transition-colors text-left"
                  onClick={() => { setQuery(r.name); setResults([]); }}
                >
                  <Icon name="MapPin" size={14} className="text-[#38bdf8] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-foreground">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.address} · {r.distance}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Route mode */
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-2.5">
            <div className="w-2 h-2 rounded-full bg-[#38bdf8] shrink-0" />
            <input
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
              placeholder="Откуда"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-2.5">
            <div className="w-2 h-2 rounded-full bg-[#4ade80] shrink-0" />
            <input
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
              placeholder="Куда"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>

          {/* Transport options */}
          <div className="flex gap-2">
            {[
              { icon: "Car", label: "30 мин" },
              { icon: "Train", label: "25 мин" },
              { icon: "Bike", label: "45 мин" },
              { icon: "Footprints", label: "1.5 ч" },
            ].map((opt, i) => (
              <button
                key={i}
                className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-lg transition-all text-xs ${
                  i === 0 ? "bg-[#38bdf8]/20 border border-[#38bdf8]/40 text-[#38bdf8]" : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon name={opt.icon} size={14} />
                <span>{opt.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={handleBuildRoute}
            disabled={!from || !to}
            className="w-full py-2.5 rounded-xl bg-[#38bdf8] text-[#0f1419] text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#7dd3fc] transition-colors"
          >
            Построить маршрут
          </button>
        </div>
      )}

      {/* Quick categories */}
      {!routeMode && (
        <div className="flex gap-2 flex-wrap">
          {[
            { icon: "Coffee", label: "Кафе" },
            { icon: "Landmark", label: "Музеи" },
            { icon: "Trees", label: "Парки" },
            { icon: "ShoppingBag", label: "Магазины" },
          ].map((cat) => (
            <button
              key={cat.label}
              className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-secondary text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all"
            >
              <Icon name={cat.icon} size={11} />
              {cat.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPanel;
