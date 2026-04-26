import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Notification {
  id: string;
  type: "traffic" | "route" | "tip";
  title: string;
  text: string;
  time: string;
  read: boolean;
}

const NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "traffic",
    title: "Пробки на маршруте",
    text: "На ул. Тверской 8-балльные пробки. Рекомендуем объезд через Садовое кольцо.",
    time: "2 мин назад",
    read: false,
  },
  {
    id: "2",
    type: "route",
    title: "Маршрут изменён",
    text: "Из-за ДТП на Ленинском проспекте ваш маршрут перестроен. Время в пути +12 мин.",
    time: "15 мин назад",
    read: false,
  },
  {
    id: "3",
    type: "tip",
    title: "Рекомендация",
    text: "Хорошее время для поездки! Дороги свободны, пробок нет.",
    time: "1 ч назад",
    read: true,
  },
];

const TYPE_META = {
  traffic: { icon: "AlertTriangle", color: "#ef4444", bg: "bg-red-500/10 border-red-500/20" },
  route: { icon: "Navigation", color: "#38bdf8", bg: "bg-[#38bdf8]/10 border-[#38bdf8]/20" },
  tip: { icon: "Lightbulb", color: "#4ade80", bg: "bg-green-500/10 border-green-500/20" },
};

interface NotificationPanelProps {
  onClose: () => void;
}

const NotificationPanel = ({ onClose }: NotificationPanelProps) => {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications((n) => n.map((item) => ({ ...item, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="glass rounded-2xl w-80 overflow-hidden animate-slide-up">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-foreground">Уведомления</h3>
          {unreadCount > 0 && (
            <span className="text-xs bg-[#38bdf8]/20 text-[#38bdf8] px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Прочитать все
            </button>
          )}
          <button onClick={onClose}>
            <Icon name="X" size={15} className="text-muted-foreground hover:text-foreground transition-colors" />
          </button>
        </div>
      </div>

      <div className="flex flex-col divide-y divide-border max-h-96 overflow-y-auto">
        {notifications.map((n) => {
          const meta = TYPE_META[n.type];
          return (
            <div key={n.id} className={`px-4 py-3 flex gap-3 transition-colors ${n.read ? "opacity-60" : "bg-white/2"}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${meta.bg}`}>
                <Icon name={meta.icon} size={14} style={{ color: meta.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-foreground leading-tight">{n.title}</p>
                  {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] notification-dot shrink-0 mt-1.5" />}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{n.text}</p>
                <p className="text-[10px] text-muted-foreground/60 mt-1">{n.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationPanel;
