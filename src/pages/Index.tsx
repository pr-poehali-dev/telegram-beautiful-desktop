import { useState } from "react";
import Icon from "@/components/ui/icon";

type Tab = "chats" | "contacts" | "profile" | "settings";
type CallType = "audio" | "video" | null;

const CHATS = [
  { id: 1, name: "Алексей Громов", avatar: "АГ", online: true, msg: "Окей, увидимся завтра в 10! 🔥", time: "14:32", unread: 3, grad: "from-violet-500 to-purple-600", verified: false, msgType: "text" },
  { id: 2, name: "Мария Соколова", avatar: "МС", online: true, msg: "Голосовое · 0:24", time: "13:15", unread: 0, grad: "from-pink-500 to-rose-500", verified: true, msgType: "voice" },
  { id: 3, name: "Команда Nova", avatar: "✦", online: false, msg: "Дизайн утверждён, запускаем!", time: "12:00", unread: 12, grad: "from-cyan-500 to-blue-500", verified: true, msgType: "text" },
  { id: 4, name: "Дмитрий Волков", avatar: "ДВ", online: false, msg: "Видеозвонок завершён · 47 мин", time: "11:30", unread: 0, grad: "from-amber-500 to-orange-500", verified: false, msgType: "call" },
  { id: 5, name: "Анастасия К.", avatar: "АК", online: true, msg: "Ты видел новый дизайн? 😍", time: "10:44", unread: 1, grad: "from-emerald-500 to-teal-500", verified: false, msgType: "text" },
  { id: 6, name: "Иван Петров", avatar: "ИП", online: false, msg: "Завтра скину ссылку", time: "Вчера", unread: 0, grad: "from-indigo-500 to-violet-500", verified: false, msgType: "text" },
  { id: 7, name: "Новости Nova", avatar: "📡", online: false, msg: "Обновление 3.0 уже доступно!", time: "Вчера", unread: 5, grad: "from-rose-500 to-pink-600", verified: true, msgType: "text" },
  { id: 8, name: "Семья", avatar: "🏠", online: false, msg: "Не забудьте про ужин 🍕", time: "Вчера", unread: 0, grad: "from-teal-500 to-cyan-500", verified: false, msgType: "text" },
];

const CONTACTS = [
  { id: 1, name: "Алексей Громов", status: "В сети", avatar: "АГ", grad: "from-violet-500 to-purple-600", online: true, phone: "+7 999 100-11-22" },
  { id: 2, name: "Анастасия К.", status: "В сети", avatar: "АК", grad: "from-emerald-500 to-teal-500", online: true, phone: "+7 999 200-33-44" },
  { id: 3, name: "Мария Соколова", status: "В сети", avatar: "МС", grad: "from-pink-500 to-rose-500", online: true, phone: "+7 999 300-55-66" },
  { id: 4, name: "Дмитрий Волков", status: "Был 2 часа назад", avatar: "ДВ", grad: "from-amber-500 to-orange-500", online: false, phone: "+7 999 400-77-88" },
  { id: 5, name: "Иван Петров", status: "Был вчера", avatar: "ИП", grad: "from-indigo-500 to-violet-500", online: false, phone: "+7 999 500-99-00" },
  { id: 6, name: "Ольга Смирнова", status: "Была неделю назад", avatar: "ОС", grad: "from-cyan-500 to-blue-500", online: false, phone: "+7 999 600-11-22" },
];

const MESSAGES = [
  { id: 1, from: "them", text: "Привет! Как дела? Давно не виделись 👋", time: "13:00", type: "text" },
  { id: 2, from: "me", text: "Всё отлично! Работаю над крутым проектом", time: "13:02", type: "text" },
  { id: 3, from: "them", text: "", time: "13:05", type: "voice", duration: "0:18" },
  { id: 4, from: "me", text: "Понял, звучит интересно 🔥", time: "13:07", type: "text" },
  { id: 5, from: "them", text: "Давай созвонимся вечером?", time: "13:10", type: "text" },
  { id: 6, from: "me", text: "Конечно! В 19:00 подойдёт?", time: "13:11", type: "text" },
  { id: 7, from: "them", text: "Отлично, буду ждать 👍", time: "13:12", type: "text" },
  { id: 8, from: "me", text: "Окей, увидимся завтра в 10! 🔥", time: "14:32", type: "text" },
];

const SETTINGS = [
  { icon: "Bell", label: "Уведомления", sub: "Все уведомления включены", grad: "from-violet-500 to-purple-600" },
  { icon: "Shield", label: "Приватность", sub: "Двухфакторная аутентификация", grad: "from-cyan-500 to-blue-500" },
  { icon: "Palette", label: "Оформление", sub: "Тёмная тема · Nova", grad: "from-pink-500 to-rose-500" },
  { icon: "Smartphone", label: "Устройства", sub: "2 активных устройства", grad: "from-amber-500 to-orange-500" },
  { icon: "HardDrive", label: "Хранилище", sub: "Использовано 2.4 ГБ из 15 ГБ", grad: "from-emerald-500 to-teal-500" },
  { icon: "HelpCircle", label: "Помощь", sub: "FAQ и поддержка", grad: "from-indigo-500 to-violet-500" },
];

function Avatar({ letters, grad, size = "md", online = false }: { letters: string; grad: string; size?: "sm"|"md"|"lg"|"xl"; online?: boolean }) {
  const sizes = { sm: "w-9 h-9 text-xs", md: "w-12 h-12 text-sm", lg: "w-16 h-16 text-lg", xl: "w-24 h-24 text-3xl" };
  const dotSizes = { sm: "w-2.5 h-2.5", md: "w-3.5 h-3.5", lg: "w-4 h-4", xl: "w-5 h-5" };
  return (
    <div className="relative flex-shrink-0">
      <div className={`${sizes[size]} rounded-full bg-gradient-to-br ${grad} flex items-center justify-center font-bold text-white shadow-lg`}>
        {letters}
      </div>
      {online && (
        <span className={`absolute bottom-0 right-0 ${dotSizes[size]} bg-emerald-400 rounded-full border-2 border-[#0f0f1a]`} />
      )}
    </div>
  );
}

function WaveVoice({ fromMe }: { fromMe: boolean }) {
  const heights = [3, 5, 8, 6, 4, 7, 5, 8];
  return (
    <div className="flex items-center gap-0.5 h-8">
      {heights.map((h, i) => (
        <div
          key={i}
          className={`w-1 rounded-full wave-bar`}
          style={{
            height: `${h * 3.5}px`,
            background: fromMe ? "rgba(255,255,255,0.75)" : "#7C3AED",
            animationDelay: `${i * 0.09}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Index() {
  const [tab, setTab] = useState<Tab>("chats");
  const [openChatId, setOpenChatId] = useState<number | null>(null);
  const [msgInput, setMsgInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showCall, setShowCall] = useState<CallType>(null);
  const [search, setSearch] = useState("");
  const [darkToggle, setDarkToggle] = useState(true);

  const activeChat = CHATS.find(c => c.id === openChatId);

  const filteredChats = CHATS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // ── CALL SCREEN ──────────────────────────────────────────────
  if (showCall) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-between py-14 z-50 animate-fade-in overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0f0f1a 0%, #1a0a2e 50%, #0f0f1a 100%)" }}>
        {/* Ambient glow rings */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-64 h-64 rounded-full border border-violet-500/20 animate-ring-wave absolute inset-0" />
          <div className="w-64 h-64 rounded-full border border-violet-500/10 animate-ring-wave-2 absolute inset-0" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-4 mt-4">
          <div className="relative">
            <div className={`w-28 h-28 rounded-full bg-gradient-to-br ${activeChat?.grad || "from-violet-500 to-purple-600"} flex items-center justify-center text-4xl font-bold text-white animate-call-pulse shadow-2xl`}
              style={{ boxShadow: "0 0 60px rgba(124,58,237,0.5)" }}>
              {activeChat?.avatar}
            </div>
          </div>
          <div className="text-center">
            <p className="text-white text-2xl font-golos font-bold">{activeChat?.name}</p>
            <p className="text-white/50 text-sm mt-1">
              {showCall === "video" ? "Видеозвонок" : "Голосовой звонок"}
            </p>
            <p className="text-emerald-400 text-sm mt-0.5 font-medium">Соединяется...</p>
          </div>
        </div>

        {showCall === "video" && (
          <div className="relative z-10 w-full px-5 -mt-4">
            <div className="w-full h-44 rounded-3xl glass-2 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-white/30">
                <Icon name="VideoOff" size={28} />
                <p className="text-xs">Камера включится при соединении</p>
              </div>
            </div>
            <div className="absolute bottom-3 right-9 w-24 h-32 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-xl border border-white/10">
              <p className="text-white/70 text-xs font-medium">Вы</p>
            </div>
          </div>
        )}

        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="flex gap-5">
            {[
              { icon: "Mic", label: "Микрофон" },
              { icon: "Volume2", label: "Динамик" },
              ...(showCall === "video" ? [{ icon: "Camera", label: "Камера" }] : []),
            ].map((btn, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <button className="w-14 h-14 rounded-full glass-2 flex items-center justify-center tap-scale hover:bg-white/10 transition-colors">
                  <Icon name={btn.icon} size={22} className="text-white" />
                </button>
                <span className="text-white/40 text-[10px]">{btn.label}</span>
              </div>
            ))}
          </div>
          <button
            className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-2xl tap-scale glow-red"
            onClick={() => setShowCall(null)}
          >
            <Icon name="PhoneOff" size={26} className="text-white" />
          </button>
        </div>
      </div>
    );
  }

  // ── CHAT SCREEN ───────────────────────────────────────────────
  if (openChatId !== null) {
    return (
      <div className="fixed inset-0 flex flex-col animate-fade-in" style={{ background: "#0d0d1a" }}>
        {/* Subtle background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 -left-20 w-72 h-72 rounded-full opacity-[0.06]"
            style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />
          <div className="absolute bottom-32 -right-16 w-64 h-64 rounded-full opacity-[0.06]"
            style={{ background: "radial-gradient(circle, #06B6D4, transparent)" }} />
        </div>

        {/* Header */}
        <div className="glass border-b border-white/5 px-4 pt-12 pb-3 flex items-center gap-3 relative z-10">
          <button onClick={() => setOpenChatId(null)} className="w-9 h-9 rounded-full flex items-center justify-center tap-scale">
            <Icon name="ArrowLeft" size={22} className="text-white" />
          </button>
          <Avatar letters={activeChat!.avatar} grad={activeChat!.grad} size="sm" online={activeChat!.online} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <p className="text-white font-rubik font-medium text-base leading-tight truncate">{activeChat!.name}</p>
              {activeChat!.verified && <Icon name="BadgeCheck" size={13} className="text-cyan-400 flex-shrink-0" />}
            </div>
            <p className={`text-xs ${activeChat!.online ? "text-emerald-400" : "text-white/40"}`}>
              {activeChat!.online ? "в сети" : "был(а) недавно"}
            </p>
          </div>
          <button onClick={() => setShowCall("audio")} className="w-10 h-10 rounded-full flex items-center justify-center tap-scale hover:bg-white/5">
            <Icon name="Phone" size={20} className="text-violet-400" />
          </button>
          <button onClick={() => setShowCall("video")} className="w-10 h-10 rounded-full flex items-center justify-center tap-scale hover:bg-white/5">
            <Icon name="Video" size={20} className="text-violet-400" />
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center tap-scale hover:bg-white/5">
            <Icon name="MoreVertical" size={20} className="text-white/50" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2 relative z-10">
          {MESSAGES.map((m, i) => (
            <div
              key={m.id}
              className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
              style={{ animation: `slideUp 0.3s ease ${i * 0.04}s both` }}
            >
              {m.type === "voice" ? (
                <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl max-w-[72%] ${
                  m.from === "me"
                    ? "bg-gradient-to-br from-violet-600 to-indigo-700 rounded-br-sm"
                    : "glass-2 rounded-bl-sm"
                }`}>
                  <button className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                    m.from === "me" ? "bg-white/20" : "bg-gradient-to-br from-violet-500 to-indigo-600"
                  }`}>
                    <Icon name="Play" size={13} className="text-white ml-0.5" />
                  </button>
                  <WaveVoice fromMe={m.from === "me"} />
                  <span className={`text-xs flex-shrink-0 ${m.from === "me" ? "text-white/60" : "text-white/40"}`}>
                    {m.duration}
                  </span>
                </div>
              ) : (
                <div className={`px-4 py-2.5 rounded-2xl max-w-[78%] ${
                  m.from === "me"
                    ? "bg-gradient-to-br from-violet-600 to-indigo-700 rounded-br-sm"
                    : "glass-2 rounded-bl-sm"
                }`}>
                  <p className="text-white text-sm leading-relaxed">{m.text}</p>
                  <p className={`text-[10px] mt-1 text-right ${m.from === "me" ? "text-white/50" : "text-white/30"}`}>{m.time}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="px-3 pb-8 pt-2.5 glass border-t border-white/5 relative z-10">
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full flex items-center justify-center tap-scale">
              <Icon name="Smile" size={20} className="text-white/40" />
            </button>
            <div className="flex-1 relative">
              <input
                value={msgInput}
                onChange={e => setMsgInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") setMsgInput(""); }}
                placeholder="Сообщение..."
                className="w-full px-4 py-3 rounded-2xl text-sm text-white placeholder-white/30 outline-none border border-white/10 focus:border-violet-500/50 transition-colors"
                style={{ background: "rgba(255,255,255,0.07)" }}
              />
            </div>
            <button className="w-10 h-10 rounded-full flex items-center justify-center tap-scale">
              <Icon name="Paperclip" size={20} className="text-white/40" />
            </button>
            <button
              className={`w-10 h-10 rounded-full flex items-center justify-center tap-scale transition-all shadow-lg ${
                isRecording ? "bg-red-500" : "bg-gradient-to-br from-violet-600 to-indigo-600"
              }`}
              style={isRecording ? undefined : { boxShadow: "0 0 20px rgba(124,58,237,0.5)" }}
              onClick={() => {
                if (msgInput) { setMsgInput(""); }
                else { setIsRecording(!isRecording); }
              }}
            >
              <Icon name={msgInput ? "Send" : (isRecording ? "Square" : "Mic")} size={18} className={msgInput ? "text-white ml-0.5" : "text-white"} />
            </button>
          </div>
          {isRecording && (
            <div className="flex items-center gap-2 px-4 mt-2 animate-fade-in">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-400 text-xs">Запись голосового...</span>
              <WaveVoice fromMe={false} />
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── MAIN SCREEN ───────────────────────────────────────────────
  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden" style={{ background: "#0d0d1a" }}>
      {/* Ambient background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />
        <div className="absolute -top-20 right-0 w-72 h-72 rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, #06B6D4, transparent)" }} />
        <div className="absolute bottom-24 -right-24 w-80 h-80 rounded-full opacity-6"
          style={{ background: "radial-gradient(circle, #EC4899, transparent)" }} />
      </div>

      {/* ── CHATS TAB ── */}
      {tab === "chats" && (
        <div className="flex-1 flex flex-col overflow-hidden relative z-10">
          <div className="px-5 pt-14 pb-3 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-[26px] font-golos font-bold text-white tracking-tight">Сообщения</h1>
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
              <Icon name="Search" size={15} className="text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Поиск чатов..."
                className="w-full pl-9 pr-4 py-2.5 rounded-2xl text-sm text-white placeholder-white/30 outline-none border border-white/10 focus:border-violet-500/40 transition-colors"
                style={{ background: "rgba(255,255,255,0.06)" }}
              />
            </div>

            {/* Stories */}
            <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              <div className="flex flex-col items-center gap-1.5 flex-shrink-0 tap-scale cursor-pointer">
                <div className="w-14 h-14 rounded-full glass-2 flex items-center justify-center border border-dashed border-violet-500/50">
                  <Icon name="Plus" size={18} className="text-violet-400" />
                </div>
                <span className="text-white/50 text-[10px]">Моя</span>
              </div>
              {CHATS.filter(c => c.online).slice(0, 5).map((c) => (
                <div key={c.id} className="flex flex-col items-center gap-1.5 flex-shrink-0 tap-scale cursor-pointer">
                  <div className={`w-14 h-14 rounded-full p-[2px] bg-gradient-to-br ${c.grad}`}>
                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${c.grad} flex items-center justify-center border-2 border-[#0d0d1a]`}>
                      <span className="text-white text-sm font-bold">{c.avatar[0]}</span>
                    </div>
                  </div>
                  <span className="text-white/50 text-[10px] max-w-[52px] truncate">{c.name.split(" ")[0]}</span>
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
                onClick={() => setOpenChatId(chat.id)}
              >
                <Avatar letters={chat.avatar} grad={chat.grad} size="md" online={chat.online} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1 min-w-0">
                      <span className="text-white font-rubik font-medium text-[14.5px] truncate">{chat.name}</span>
                      {chat.verified && <Icon name="BadgeCheck" size={13} className="text-cyan-400 flex-shrink-0" />}
                    </div>
                    <span className={`text-[11px] flex-shrink-0 ml-2 ${chat.unread > 0 ? "text-violet-400" : "text-white/30"}`}>{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12.5px] truncate flex items-center gap-1 text-white/45">
                      {chat.msgType === "voice" && <Icon name="Mic" size={11} className="text-violet-400 flex-shrink-0" />}
                      {chat.msgType === "call" && <Icon name="Video" size={11} className="text-blue-400 flex-shrink-0" />}
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
      )}

      {/* ── CONTACTS TAB ── */}
      {tab === "contacts" && (
        <div className="flex-1 flex flex-col overflow-hidden relative z-10">
          <div className="px-5 pt-14 pb-4 flex-shrink-0">
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-[26px] font-golos font-bold text-white tracking-tight">Контакты</h1>
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
            <p className="text-white/35 text-[11px] uppercase tracking-widest font-medium px-1 mb-1">Онлайн · {CONTACTS.filter(c => c.online).length}</p>
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
                  <p className={`text-xs mt-0.5 ${c.online ? "text-emerald-400" : "text-white/35"}`}>{c.status}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="w-9 h-9 rounded-full glass-2 flex items-center justify-center tap-scale hover:bg-violet-500/20 transition-colors"
                    onClick={() => { setOpenChatId(CHATS.find(ch => ch.name === c.name)?.id || 1); setShowCall("audio"); }}
                  >
                    <Icon name="Phone" size={15} className="text-violet-400" />
                  </button>
                  <button
                    className="w-9 h-9 rounded-full glass-2 flex items-center justify-center tap-scale hover:bg-violet-500/20 transition-colors"
                    onClick={() => { setOpenChatId(CHATS.find(ch => ch.name === c.name)?.id || 1); setShowCall("video"); }}
                  >
                    <Icon name="Video" size={15} className="text-violet-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── PROFILE TAB ── */}
      {tab === "profile" && (
        <div className="flex-1 overflow-y-auto pb-24 relative z-10">
          {/* Hero */}
          <div className="relative overflow-hidden px-5 pt-14 pb-8">
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(124,58,237,0.15) 0%, transparent 100%)" }} />
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
                {[{ val: "247", label: "Контактов" }, { val: "1.2K", label: "Сообщений" }, { val: "48", label: "Групп" }].map((s, i) => (
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
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #7C3AED 0%, #4F46E5 60%, #06B6D4 100%)" }} />
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
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
              <p className="text-white/35 text-[11px] uppercase tracking-widest font-medium px-4 pt-4 pb-2">Аккаунт</p>
              {[
                { icon: "Phone", label: "Телефон", val: "+7 (999) 123-45-67" },
                { icon: "Mail", label: "Email", val: "you@nova.app" },
                { icon: "Globe", label: "Ник", val: "@username" },
              ].map((item, i, arr) => (
                <div key={i} className={`flex items-center gap-3 px-4 py-3.5 ${i < arr.length - 1 ? "border-b border-white/5" : ""}`}>
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
      )}

      {/* ── SETTINGS TAB ── */}
      {tab === "settings" && (
        <div className="flex-1 overflow-y-auto pb-24 relative z-10">
          <div className="px-5 pt-14 pb-5">
            <h1 className="text-[26px] font-golos font-bold text-white tracking-tight">Настройки</h1>
            <p className="text-white/35 text-sm mt-0.5">Nova Messenger 3.0.1</p>
          </div>
          <div className="px-4 space-y-3">
            {/* Profile mini */}
            <div className="relative overflow-hidden rounded-3xl p-4">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-700 opacity-90" />
              <div className="relative flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-xl font-bold text-white">ВЫ</div>
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
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.grad} flex items-center justify-center flex-shrink-0`}>
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
                className={`w-12 h-6 rounded-full relative transition-all duration-300 tap-scale ${darkToggle ? "bg-gradient-to-r from-violet-600 to-indigo-600" : "bg-white/20"}`}
                onClick={() => setDarkToggle(!darkToggle)}
              >
                <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all duration-300 shadow ${darkToggle ? "right-0.5" : "left-0.5"}`} />
              </button>
            </div>

            <p className="text-center text-white/15 text-xs pt-2">Nova Messenger · Сделано с ♥</p>
          </div>
        </div>
      )}

      {/* ── BOTTOM NAV ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="glass border-t border-white/[0.06] px-5 pb-7 pt-2">
          <div className="flex items-center justify-around max-w-sm mx-auto">
            {([
              { id: "chats" as Tab, icon: "MessageCircle", label: "Чаты", badge: 16 },
              { id: "contacts" as Tab, icon: "Users", label: "Контакты", badge: 0 },
              { id: "profile" as Tab, icon: "User", label: "Профиль", badge: 0 },
              { id: "settings" as Tab, icon: "Settings", label: "Настройки", badge: 0 },
            ]).map(item => {
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  className="flex flex-col items-center gap-1 tap-scale"
                >
                  <div className={`relative w-12 h-12 rounded-[18px] flex items-center justify-center transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-br from-violet-600 to-indigo-600"
                      : "hover:bg-white/[0.06]"
                  }`}
                    style={active ? { boxShadow: "0 4px 20px rgba(124,58,237,0.5)" } : undefined}
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
                  <span className={`text-[10px] font-medium transition-colors ${active ? "text-violet-400" : "text-white/30"}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}