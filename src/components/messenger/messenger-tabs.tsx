import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Tab, CallType, CHATS, CONTACTS, SETTINGS } from "./messenger-data";
import { Avatar } from "./messenger-shared";

// ── CHATS TAB ─────────────────────────────────────────────────

interface ChatsTabProps {
  onOpenChat: (id: number) => void;
}

export function ChatsTab({ onOpenChat }: ChatsTabProps) {
  const [search, setSearch] = useState("");
  const filteredChats = CHATS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative z-10">
      <div className="px-5 pt-14 pb-3 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[26px] font-golos font-bold text-white tracking-tight">
            Сообщения
          </h1>
          <div className="flex gap-2">
            <button className="w-9 h-9 rounded-full glass-2 flex items-center justify-center tap-scale">
              <Icon name="Search" size={16} className="text-violet-400" />
            </button>
            <button className="w-9 h-9 rounded-full glass-2 flex items-center justify-center tap-scale">
              <Icon name="Edit" size={16} className="text-violet-400" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Icon
            name="Search"
            size={15}
            className="text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск чатов..."
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl text-sm text-white placeholder-white/30 outline-none border border-white/10 focus:border-violet-500/40 transition-colors"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
        </div>

        {/* Stories */}
        <div
          className="flex gap-3 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex flex-col items-center gap-1.5 flex-shrink-0 tap-scale cursor-pointer">
            <div className="w-14 h-14 rounded-full glass-2 flex items-center justify-center border border-dashed border-violet-500/50">
              <Icon name="Plus" size={18} className="text-violet-400" />
            </div>
            <span className="text-white/50 text-[10px]">Моя</span>
          </div>
          {CHATS.filter((c) => c.online)
            .slice(0, 5)
            .map((c) => (
              <div
                key={c.id}
                className="flex flex-col items-center gap-1.5 flex-shrink-0 tap-scale cursor-pointer"
              >
                <div
                  className={`w-14 h-14 rounded-full p-[2px] bg-gradient-to-br ${c.grad}`}
                >
                  <div
                    className={`w-full h-full rounded-full bg-gradient-to-br ${c.grad} flex items-center justify-center border-2 border-[#0d0d1a]`}
                  >
                    <span className="text-white text-sm font-bold">{c.avatar[0]}</span>
                  </div>
                </div>
                <span className="text-white/50 text-[10px] max-w-[52px] truncate">
                  {c.name.split(" ")[0]}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto px-3 pb-24">
        {filteredChats.map((chat, i) => (
          <button
            key={chat.id}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl mb-0.5 ripple tap-scale text-left transition-colors hover:bg-white/[0.04]"
            style={{ animation: `slideUp 0.3s ease ${i * 0.045}s both` }}
            onClick={() => onOpenChat(chat.id)}
          >
            <Avatar letters={chat.avatar} grad={chat.grad} size="md" online={chat.online} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-1 min-w-0">
                  <span className="text-white font-rubik font-medium text-[14.5px] truncate">
                    {chat.name}
                  </span>
                  {chat.verified && (
                    <Icon
                      name="BadgeCheck"
                      size={13}
                      className="text-cyan-400 flex-shrink-0"
                    />
                  )}
                </div>
                <span
                  className={`text-[11px] flex-shrink-0 ml-2 ${
                    chat.unread > 0 ? "text-violet-400" : "text-white/30"
                  }`}
                >
                  {chat.time}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12.5px] truncate flex items-center gap-1 text-white/45">
                  {chat.msgType === "voice" && (
                    <Icon name="Mic" size={11} className="text-violet-400 flex-shrink-0" />
                  )}
                  {chat.msgType === "call" && (
                    <Icon name="Video" size={11} className="text-blue-400 flex-shrink-0" />
                  )}
                  {chat.msg}
                </span>
                {chat.unread > 0 && (
                  <span className="ml-2 min-w-[20px] h-5 px-1.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── CONTACTS TAB ──────────────────────────────────────────────

interface ContactsTabProps {
  onCallAudio: (chatId: number) => void;
  onCallVideo: (chatId: number) => void;
}

export function ContactsTab({ onCallAudio, onCallVideo }: ContactsTabProps) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden relative z-10">
      <div className="px-5 pt-14 pb-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-[26px] font-golos font-bold text-white tracking-tight">
            Контакты
          </h1>
          <button className="w-9 h-9 rounded-full glass-2 flex items-center justify-center tap-scale">
            <Icon name="UserPlus" size={16} className="text-violet-400" />
          </button>
        </div>
        {/* Invite card */}
        <div className="glass-2 rounded-2xl p-3.5 flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
            <Icon name="Users" size={18} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-medium">Пригласить друзей</p>
            <p className="text-white/40 text-xs">Поделиться ссылкой на Nova</p>
          </div>
          <Icon name="ChevronRight" size={16} className="text-white/30" />
        </div>
        <p className="text-white/35 text-[11px] uppercase tracking-widest font-medium px-1 mb-1">
          Онлайн · {CONTACTS.filter((c) => c.online).length}
        </p>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        {CONTACTS.map((c, i) => (
          <div
            key={c.id}
            className="flex items-center gap-3 p-3 rounded-2xl mb-1 tap-scale cursor-pointer hover:bg-white/[0.04] transition-colors"
            style={{ animation: `slideUp 0.3s ease ${i * 0.055}s both` }}
          >
            <Avatar letters={c.avatar} grad={c.grad} size="md" online={c.online} />
            <div className="flex-1">
              <p className="text-white font-medium text-sm">{c.name}</p>
              <p className={`text-xs mt-0.5 ${c.online ? "text-emerald-400" : "text-white/35"}`}>
                {c.status}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className="w-9 h-9 rounded-full glass-2 flex items-center justify-center tap-scale hover:bg-violet-500/20 transition-colors"
                onClick={() => {
                  const chatId = CHATS.find((ch) => ch.name === c.name)?.id || 1;
                  onCallAudio(chatId);
                }}
              >
                <Icon name="Phone" size={15} className="text-violet-400" />
              </button>
              <button
                className="w-9 h-9 rounded-full glass-2 flex items-center justify-center tap-scale hover:bg-violet-500/20 transition-colors"
                onClick={() => {
                  const chatId = CHATS.find((ch) => ch.name === c.name)?.id || 1;
                  onCallVideo(chatId);
                }}
              >
                <Icon name="Video" size={15} className="text-violet-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PROFILE TAB ───────────────────────────────────────────────

export function ProfileTab() {
  return (
    <div className="flex-1 overflow-y-auto pb-24 relative z-10">
      {/* Hero */}
      <div className="relative overflow-hidden px-5 pt-14 pb-8">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(124,58,237,0.15) 0%, transparent 100%)",
          }}
        />
        <div className="relative flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-3xl font-bold text-white animate-pulse-glow">
              ВЫ
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center border-2 border-[#0d0d1a] tap-scale shadow-lg">
              <Icon name="Camera" size={13} className="text-white" />
            </button>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-golos font-bold text-white">Ваше Имя</h2>
            <p className="text-white/40 text-sm mt-0.5">@username</p>
            <div className="mt-2 px-4 py-1.5 rounded-full glass-2 inline-block">
              <p className="text-white/70 text-sm">Привет! Я использую Nova 🚀</p>
            </div>
          </div>
          <div className="flex gap-8 mt-1">
            {[
              { val: "247", label: "Контактов" },
              { val: "1.2K", label: "Сообщений" },
              { val: "48", label: "Групп" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-white font-golos font-bold text-xl">{s.val}</p>
                <p className="text-white/35 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 space-y-3">
        {/* Premium card */}
        <div className="relative overflow-hidden rounded-3xl p-5">
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, #7C3AED 0%, #4F46E5 60%, #06B6D4 100%)" }}
          />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="relative flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <Icon name="Star" size={22} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-golos font-bold text-lg">Nova Premium</p>
              <p className="text-white/70 text-sm">Безлимит · Эксклюзивные темы</p>
            </div>
            <button className="px-4 py-2 bg-white/20 rounded-xl text-white text-sm font-medium tap-scale backdrop-blur-sm">
              Попробовать
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="glass-2 rounded-3xl overflow-hidden">
          <p className="text-white/35 text-[11px] uppercase tracking-widest font-medium px-4 pt-4 pb-2">
            Аккаунт
          </p>
          {[
            { icon: "Phone", label: "Телефон", val: "+7 (999) 123-45-67" },
            { icon: "Mail", label: "Email", val: "you@nova.app" },
            { icon: "Globe", label: "Ник", val: "@username" },
          ].map((item, i, arr) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-4 py-3.5 ${
                i < arr.length - 1 ? "border-b border-white/5" : ""
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <Icon name={item.icon} size={14} className="text-white" />
              </div>
              <div>
                <p className="text-white/35 text-[10px]">{item.label}</p>
                <p className="text-white text-sm">{item.val}</p>
              </div>
              <Icon name="ChevronRight" size={14} className="text-white/20 ml-auto" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="glass-2 rounded-2xl p-4 flex flex-col gap-2 tap-scale text-left">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Icon name="QrCode" size={18} className="text-white" />
            </div>
            <p className="text-white font-medium text-sm">QR-код</p>
            <p className="text-white/35 text-xs leading-tight">Поделиться профилем</p>
          </button>
          <button className="glass-2 rounded-2xl p-4 flex flex-col gap-2 tap-scale text-left">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Icon name="Share2" size={18} className="text-white" />
            </div>
            <p className="text-white font-medium text-sm">Поделиться</p>
            <p className="text-white/35 text-xs leading-tight">Пригласить в Nova</p>
          </button>
        </div>

        <button className="w-full glass-2 rounded-2xl p-4 flex items-center gap-3 tap-scale">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
            <Icon name="LogOut" size={16} className="text-white" />
          </div>
          <span className="text-red-400 font-medium text-sm">Выйти из аккаунта</span>
          <Icon name="ChevronRight" size={15} className="text-white/20 ml-auto" />
        </button>
      </div>
    </div>
  );
}

// ── SETTINGS TAB ──────────────────────────────────────────────

interface SettingsTabProps {
  darkToggle: boolean;
  onToggleDark: () => void;
}

export function SettingsTab({ darkToggle, onToggleDark }: SettingsTabProps) {
  return (
    <div className="flex-1 overflow-y-auto pb-24 relative z-10">
      <div className="px-5 pt-14 pb-5">
        <h1 className="text-[26px] font-golos font-bold text-white tracking-tight">
          Настройки
        </h1>
        <p className="text-white/35 text-sm mt-0.5">Nova Messenger 3.0.1</p>
      </div>
      <div className="px-4 space-y-3">
        {/* Profile mini */}
        <div className="relative overflow-hidden rounded-3xl p-4">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-700 opacity-90" />
          <div className="relative flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-xl font-bold text-white">
              ВЫ
            </div>
            <div className="flex-1">
              <p className="text-white font-golos font-bold text-lg leading-tight">Ваше Имя</p>
              <p className="text-white/60 text-sm">@username · Nova Free</p>
            </div>
            <Icon name="ChevronRight" size={18} className="text-white/50" />
          </div>
        </div>

        {/* Settings list */}
        <div className="glass-2 rounded-3xl overflow-hidden">
          {SETTINGS.map((s, i) => (
            <button
              key={i}
              className={`w-full flex items-center gap-3 px-4 py-3.5 tap-scale hover:bg-white/[0.04] transition-colors text-left ${
                i < SETTINGS.length - 1 ? "border-b border-white/5" : ""
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.grad} flex items-center justify-center flex-shrink-0`}
              >
                <Icon name={s.icon} size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm">{s.label}</p>
                <p className="text-white/35 text-xs truncate">{s.sub}</p>
              </div>
              <Icon name="ChevronRight" size={14} className="text-white/20 flex-shrink-0" />
            </button>
          ))}
        </div>

        {/* Dark mode toggle */}
        <div className="glass-2 rounded-2xl px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Icon name="Moon" size={16} className="text-white" />
            </div>
            <span className="text-white font-medium text-sm">Тёмная тема</span>
          </div>
          <button
            className={`w-12 h-6 rounded-full relative transition-all duration-300 tap-scale ${
              darkToggle
                ? "bg-gradient-to-r from-violet-600 to-indigo-600"
                : "bg-white/20"
            }`}
            onClick={onToggleDark}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all duration-300 shadow ${
                darkToggle ? "right-0.5" : "left-0.5"
              }`}
            />
          </button>
        </div>

        <p className="text-center text-white/15 text-xs pt-2">Nova Messenger · Сделано с ♥</p>
      </div>
    </div>
  );
}

// ── BOTTOM NAV ────────────────────────────────────────────────

interface BottomNavProps {
  tab: Tab;
  onChangeTab: (tab: Tab) => void;
}

const NAV_ITEMS: { id: Tab; icon: string; label: string; badge: number }[] = [
  { id: "chats", icon: "MessageCircle", label: "Чаты", badge: 16 },
  { id: "contacts", icon: "Users", label: "Контакты", badge: 0 },
  { id: "profile", icon: "User", label: "Профиль", badge: 0 },
  { id: "settings", icon: "Settings", label: "Настройки", badge: 0 },
];

export function BottomNav({ tab, onChangeTab }: BottomNavProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20">
      <div className="glass border-t border-white/[0.06] px-5 pb-7 pt-2">
        <div className="flex items-center justify-around max-w-sm mx-auto">
          {NAV_ITEMS.map((item) => {
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChangeTab(item.id)}
                className="flex flex-col items-center gap-1 tap-scale"
              >
                <div
                  className={`relative w-12 h-12 rounded-[18px] flex items-center justify-center transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-br from-violet-600 to-indigo-600"
                      : "hover:bg-white/[0.06]"
                  }`}
                  style={
                    active ? { boxShadow: "0 4px 20px rgba(124,58,237,0.5)" } : undefined
                  }
                >
                  <Icon
                    name={item.icon}
                    size={22}
                    className={active ? "text-white" : "text-white/35"}
                  />
                  {item.badge > 0 && !active && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 flex items-center justify-center text-[9px] font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium transition-colors ${
                    active ? "text-violet-400" : "text-white/30"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
