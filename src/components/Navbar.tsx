import { useState } from "react";
import Icon from "@/components/ui/icon";
import NotificationPanel from "@/components/NotificationPanel";

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const NAV_ITEMS = [
  { id: "map", icon: "Map", label: "Карта" },
  { id: "routes", icon: "Route", label: "Маршруты" },
  { id: "profile", icon: "User", label: "Профиль" },
  { id: "about", icon: "Info", label: "О сервисе" },
  { id: "contact", icon: "MessageCircle", label: "Поддержка" },
];

const Navbar = ({ activePage, onNavigate }: NavbarProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = 2;

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:flex flex-col glass border-r border-border w-16 h-full shrink-0 py-4 items-center justify-between z-10">
        <div className="flex flex-col items-center gap-1">
          {/* Logo */}
          <div className="w-10 h-10 rounded-xl overflow-hidden mb-4 shrink-0">
            <img
              src="https://cdn.poehali.dev/projects/01a31de7-cd01-4828-a0d9-07c310f83a65/bucket/71a5b18a-ba03-467e-9a6e-6666a5df8856.jpg"
              alt="Teleru"
              className="w-full h-full object-cover"
            />
          </div>

          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={item.label}
              className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all group ${
                activePage === item.id
                  ? "bg-[#38bdf8]/20 text-[#38bdf8]"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              <Icon name={item.icon} size={18} />
              {activePage === item.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#38bdf8] rounded-r-full" />
              )}
              <div className="absolute left-full ml-2 glass px-2 py-1 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                {item.label}
              </div>
            </button>
          ))}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowNotifications((v) => !v)}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all relative"
          >
            <Icon name="Bell" size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full notification-dot" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute bottom-full left-full ml-2 mb-0">
              <NotificationPanel onClose={() => setShowNotifications(false)} />
            </div>
          )}
        </div>
      </nav>

      {/* Mobile bottom bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-border z-20 flex items-center justify-around px-2 py-2 safe-area-bottom">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
              activePage === item.id ? "text-[#38bdf8]" : "text-muted-foreground"
            }`}
          >
            <Icon name={item.icon} size={20} />
            <span className="text-[10px]">{item.label}</span>
          </button>
        ))}
        <button
          onClick={() => setShowNotifications((v) => !v)}
          className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-muted-foreground relative"
        >
          <Icon name="Bell" size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full notification-dot" />
          )}
          <span className="text-[10px]">Алерты</span>
        </button>

        {showNotifications && (
          <div className="absolute bottom-full right-2 mb-2">
            <NotificationPanel onClose={() => setShowNotifications(false)} />
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;