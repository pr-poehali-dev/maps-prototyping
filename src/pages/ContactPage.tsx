import { useState } from "react";
import Icon from "@/components/ui/icon";

const FAQ = [
  {
    q: "Как построить маршрут?",
    a: "Перейдите на вкладку «Карта», нажмите «Маршрут» в панели поиска, укажите начальную и конечную точку и нажмите «Построить маршрут».",
  },
  {
    q: "Как сохранить место?",
    a: "Нажмите на точку на карте, в появившейся карточке нажмите «Сохранить». Место появится в вашем профиле.",
  },
  {
    q: "Откуда берутся данные о пробках?",
    a: "Данные о дорожной обстановке обновляются каждую минуту из множества источников, включая данные от пользователей сервиса.",
  },
  {
    q: "Работает ли навигация без интернета?",
    a: "Пока для работы необходимо подключение к сети. Офлайн-режим планируется в следующем обновлении.",
  },
];

const ContactPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", topic: "bug", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="glass border-b border-border px-6 py-4">
        <h1 className="text-lg font-semibold text-foreground">Поддержка</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Свяжитесь с нами или найдите ответ</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6 flex flex-col gap-4 max-w-2xl mx-auto">
          {/* Contact channels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { icon: "MessageCircle", label: "Чат", desc: "Ответ за 5 минут", color: "#38bdf8", action: "Написать" },
              { icon: "Mail", label: "Email", desc: "support@naviroute.ru", color: "#4ade80", action: "Отправить" },
              { icon: "Phone", label: "Телефон", desc: "8 800 123-45-67", color: "#a78bfa", action: "Позвонить" },
            ].map((c) => (
              <div key={c.label} className="glass rounded-xl p-4 flex flex-col gap-3 hover-lift">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${c.color}18`, border: `1px solid ${c.color}30` }}
                >
                  <Icon name={c.icon} size={18} style={{ color: c.color }} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{c.label}</h3>
                  <p className="text-xs text-muted-foreground">{c.desc}</p>
                </div>
                <button
                  className="text-xs font-medium transition-colors"
                  style={{ color: c.color }}
                >
                  {c.action} →
                </button>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="glass rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Часто задаваемые вопросы</h3>
            </div>
            <div className="divide-y divide-border">
              {FAQ.map((item, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/3 transition-colors"
                  >
                    <span className="text-sm text-foreground">{item.q}</span>
                    <Icon
                      name="ChevronDown"
                      size={15}
                      className={`text-muted-foreground shrink-0 ml-3 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 animate-fade-in">
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div className="glass rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Написать в поддержку</h3>
            </div>
            <div className="p-4">
              {sent ? (
                <div className="text-center py-6 animate-fade-in">
                  <div className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-3">
                    <Icon name="CheckCircle" size={24} className="text-green-400" />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground">Обращение отправлено!</h4>
                  <p className="text-xs text-muted-foreground mt-1">Мы ответим в течение 24 часов</p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", topic: "bug", message: "" }); }}
                    className="mt-4 text-xs text-[#38bdf8] hover:text-[#7dd3fc] transition-colors"
                  >
                    Отправить ещё
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">Имя</label>
                      <input
                        required
                        className="w-full bg-secondary rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-[#38bdf8]/40 transition-all"
                        placeholder="Ваше имя"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
                      <input
                        required
                        type="email"
                        className="w-full bg-secondary rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-[#38bdf8]/40 transition-all"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Тема</label>
                    <select
                      className="w-full bg-secondary rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:ring-1 focus:ring-[#38bdf8]/40 transition-all appearance-none"
                      value={form.topic}
                      onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
                    >
                      <option value="bug">Проблема / ошибка</option>
                      <option value="feature">Предложение</option>
                      <option value="map">Ошибка на карте</option>
                      <option value="other">Другое</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Сообщение</label>
                    <textarea
                      required
                      rows={4}
                      className="w-full bg-secondary rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-[#38bdf8]/40 transition-all resize-none"
                      placeholder="Опишите вашу проблему или предложение..."
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#38bdf8] text-[#0f1419] text-sm font-semibold hover:bg-[#7dd3fc] transition-colors"
                  >
                    Отправить обращение
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
