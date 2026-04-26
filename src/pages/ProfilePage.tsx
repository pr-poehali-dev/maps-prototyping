import { useState } from "react";
import Icon from "@/components/ui/icon";

const SAVED_PLACES = [
  { id: "1", name: "Дом", address: "Ул. Садовая, 12", icon: "Home", color: "#38bdf8" },
  { id: "2", name: "Работа", address: "Невский пр., 88", icon: "Briefcase", color: "#4ade80" },
  { id: "3", name: "Парк Горького", address: "Крымский вал, 9", icon: "Trees", color: "#a78bfa" },
  { id: "4", name: "Кофемания", address: "Ул. Пятницкая, 7", icon: "Coffee", color: "#f59e0b" },
];

const ProfilePage = () => {
  const [notifications, setNotifications] = useState({
    traffic: true,
    routeChange: true,
    tips: false,
    news: false,
  });
  const [transportPref, setTransportPref] = useState("Car");
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="glass border-b border-border px-6 py-4">
        <h1 className="text-lg font-semibold text-foreground">Профиль</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Настройки и сохранённые места</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6 flex flex-col gap-4 max-w-2xl mx-auto">
          {/* User card */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#38bdf8]/30 to-[#4ade80]/20 border border-[#38bdf8]/20 flex items-center justify-center">
                <Icon name="User" size={28} className="text-[#38bdf8]" />
              </div>
              <div className="flex-1">
                {editMode ? (
                  <input className="bg-secondary rounded-lg px-3 py-1.5 text-sm text-foreground outline-none w-full mb-1" defaultValue="Александр М." />
                ) : (
                  <h2 className="text-base font-semibold text-foreground">Александр М.</h2>
                )}
                <p className="text-xs text-muted-foreground">alex@example.com</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20 px-2 py-0.5 rounded-full">
                    Активный навигатор
                  </span>
                </div>
              </div>
              <button
                onClick={() => setEditMode((v) => !v)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name={editMode ? "Check" : "Edit2"} size={16} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border">
              {[
                { label: "Поездок", value: "47" },
                { label: "Км", value: "312" },
                { label: "Мест", value: "12" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-lg font-bold text-foreground">{s.value}</p>
                  <p className="text-[10px] text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Saved places */}
          <div className="glass rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Сохранённые места</h3>
              <button className="flex items-center gap-1 text-xs text-[#38bdf8] hover:text-[#7dd3fc] transition-colors">
                <Icon name="Plus" size={13} />
                Добавить
              </button>
            </div>
            <div className="divide-y divide-border">
              {SAVED_PLACES.map((place) => (
                <div key={place.id} className="flex items-center gap-3 px-4 py-3 hover:bg-white/3 transition-colors">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${place.color}18`, border: `1px solid ${place.color}30` }}
                  >
                    <Icon name={place.icon} size={16} style={{ color: place.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{place.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{place.address}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-muted-foreground hover:text-[#38bdf8] transition-colors">
                      <Icon name="Navigation" size={14} />
                    </button>
                    <button className="text-muted-foreground hover:text-red-400 transition-colors">
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transport preference */}
          <div className="glass rounded-2xl p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Предпочтительный транспорт</h3>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: "Car", icon: "Car", label: "Авто" },
                { id: "Train", icon: "Train", label: "Метро" },
                { id: "Bike", icon: "Bike", label: "Вело" },
                { id: "Footprints", icon: "Footprints", label: "Пешком" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTransportPref(t.id)}
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all text-xs ${
                    transportPref === t.id
                      ? "bg-[#38bdf8]/20 border-[#38bdf8]/40 text-[#38bdf8]"
                      : "bg-secondary border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon name={t.icon} size={18} />
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications settings */}
          <div className="glass rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Уведомления</h3>
            </div>
            <div className="divide-y divide-border">
              {[
                { key: "traffic" as const, label: "Пробки на маршруте", desc: "Предупреждение при заторах" },
                { key: "routeChange" as const, label: "Изменение маршрута", desc: "Когда маршрут перестраивается" },
                { key: "tips" as const, label: "Рекомендации", desc: "Советы по маршруту" },
                { key: "news" as const, label: "Новости сервиса", desc: "Обновления и анонсы" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => setNotifications((n) => ({ ...n, [item.key]: !n[item.key] }))}
                    className={`w-10 h-5.5 rounded-full transition-all relative flex items-center ${
                      notifications[item.key] ? "bg-[#38bdf8]" : "bg-secondary"
                    }`}
                    style={{ width: 40, height: 22 }}
                  >
                    <div
                      className="w-4 h-4 rounded-full bg-white shadow transition-all absolute"
                      style={{ left: notifications[item.key] ? 20 : 3 }}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Logout */}
          <button className="glass rounded-2xl p-4 flex items-center gap-3 text-red-400 hover:bg-red-500/5 transition-colors w-full">
            <Icon name="LogOut" size={18} />
            <span className="text-sm font-medium">Выйти из аккаунта</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
