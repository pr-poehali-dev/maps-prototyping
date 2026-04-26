import Icon from "@/components/ui/icon";

const FEATURES = [
  {
    icon: "Map",
    title: "Интерактивная карта",
    desc: "Детальная карта с точками интереса, масштабированием и слоями трафика в реальном времени.",
    color: "#38bdf8",
  },
  {
    icon: "Navigation",
    title: "Умные маршруты",
    desc: "Построение оптимального пути с учётом пробок, дорожных работ и предпочтений пользователя.",
    color: "#4ade80",
  },
  {
    icon: "AlertTriangle",
    title: "Уведомления о пробках",
    desc: "Мгновенные алерты при изменении дорожной обстановки и автоматическое перестроение маршрута.",
    color: "#f59e0b",
  },
  {
    icon: "Search",
    title: "Поиск мест",
    desc: "Быстрый поиск кафе, музеев, магазинов и других объектов вокруг вас.",
    color: "#a78bfa",
  },
  {
    icon: "Clock",
    title: "История поездок",
    desc: "Полная история всех маршрутов с возможностью быстрого повтора любой поездки.",
    color: "#f472b6",
  },
  {
    icon: "Bookmark",
    title: "Сохранённые места",
    desc: "Добавляйте любимые места в избранное и быстро прокладывайте к ним маршруты.",
    color: "#fb923c",
  },
];

const STATS = [
  { value: "2M+", label: "Пользователей" },
  { value: "15M", label: "Маршрутов в день" },
  { value: "98%", label: "Точность данных" },
  { value: "24/7", label: "Обновление карты" },
];

const AboutPage = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="glass border-b border-border px-6 py-4">
        <h1 className="text-lg font-semibold text-foreground">О сервисе</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Возможности и информация</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6 flex flex-col gap-6 max-w-2xl mx-auto">
          {/* Hero */}
          <div className="glass rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 map-grid opacity-30" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#38bdf8]/20 border border-[#38bdf8]/30 flex items-center justify-center">
                  <Icon name="Navigation" size={22} className="text-[#38bdf8]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">NaviRoute</h2>
                  <p className="text-xs text-muted-foreground">Навигация нового поколения</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                NaviRoute — интеллектуальный навигационный сервис, который помогает
                добираться до любой точки города быстро, удобно и без стресса.
                Реальное время, умные маршруты и персонализация под каждого пользователя.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {STATS.map((s) => (
              <div key={s.label} className="glass rounded-xl p-4 text-center hover-lift">
                <p className="text-2xl font-bold text-[#38bdf8]">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Features grid */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Возможности</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {FEATURES.map((f) => (
                <div key={f.title} className="glass rounded-xl p-4 hover-lift animate-fade-in">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${f.color}18`, border: `1px solid ${f.color}30` }}
                    >
                      <Icon name={f.icon} size={16} style={{ color: f.color }} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{f.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Roadmap */}
          <div className="glass rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Что планируется</h3>
            <div className="flex flex-col gap-3">
              {[
                { label: "Офлайн-карты", status: "soon", desc: "Навигация без интернета" },
                { label: "AR-навигация", status: "dev", desc: "Дополненная реальность в камере" },
                { label: "Интеграция с транспортом", status: "planned", desc: "Расписание автобусов и метро" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      item.status === "soon" ? "bg-[#4ade80]" :
                      item.status === "dev" ? "bg-[#38bdf8]" : "bg-muted-foreground/40"
                    }`}
                  />
                  <div className="flex-1">
                    <span className="text-sm text-foreground">{item.label}</span>
                    <span className="text-xs text-muted-foreground ml-2">— {item.desc}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                    item.status === "soon" ? "text-green-400 border-green-500/30 bg-green-500/10" :
                    item.status === "dev" ? "text-[#38bdf8] border-[#38bdf8]/30 bg-[#38bdf8]/10" :
                    "text-muted-foreground border-border bg-secondary"
                  }`}>
                    {item.status === "soon" ? "Скоро" : item.status === "dev" ? "В разработке" : "Планируется"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Version */}
          <p className="text-center text-xs text-muted-foreground/50">NaviRoute v1.0.0 · 2026</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
