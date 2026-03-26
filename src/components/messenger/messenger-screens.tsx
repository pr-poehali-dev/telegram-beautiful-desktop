import { useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import { CallType, Chat, Message } from "./messenger-data";
import { Avatar, WaveVoice } from "./messenger-shared";

// ── CALL SCREEN ───────────────────────────────────────────────

interface CallScreenProps {
  showCall: CallType;
  activeChat: Chat | undefined;
  onEndCall: () => void;
}

export function CallScreen({ showCall, activeChat, onEndCall }: CallScreenProps) {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-between py-14 z-50 animate-fade-in overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0f0f1a 0%, #1a0a2e 50%, #0f0f1a 100%)" }}
    >
      {/* Ambient glow rings */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-64 h-64 rounded-full border border-violet-500/20 animate-ring-wave absolute inset-0" />
        <div className="w-64 h-64 rounded-full border border-violet-500/10 animate-ring-wave-2 absolute inset-0" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4 mt-4">
        <div className="relative">
          <div
            className={`w-28 h-28 rounded-full bg-gradient-to-br ${activeChat?.grad || "from-violet-500 to-purple-600"} flex items-center justify-center text-4xl font-bold text-white animate-call-pulse shadow-2xl`}
            style={{ boxShadow: "0 0 60px rgba(124,58,237,0.5)" }}
          >
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
          onClick={onEndCall}
        >
          <Icon name="PhoneOff" size={26} className="text-white" />
        </button>
      </div>
    </div>
  );
}

// ── CHAT SCREEN ───────────────────────────────────────────────

interface ChatScreenProps {
  activeChat: Chat | undefined;
  messages: Message[];
  msgInput: string;
  isRecording: boolean;
  onBack: () => void;
  onCallAudio: () => void;
  onCallVideo: () => void;
  onMsgChange: (val: string) => void;
  onSendOrRecord: () => void;
}

export function ChatScreen({
  activeChat,
  messages,
  msgInput,
  isRecording,
  onBack,
  onCallAudio,
  onCallVideo,
  onMsgChange,
  onSendOrRecord,
}: ChatScreenProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed inset-0 flex flex-col animate-fade-in" style={{ background: "#0d0d1a" }}>
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-20 -left-20 w-72 h-72 rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }}
        />
        <div
          className="absolute bottom-32 -right-16 w-64 h-64 rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #06B6D4, transparent)" }}
        />
      </div>

      {/* Header */}
      <div className="glass border-b border-white/5 px-4 pt-12 pb-3 flex items-center gap-3 relative z-10">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full flex items-center justify-center tap-scale"
        >
          <Icon name="ArrowLeft" size={22} className="text-white" />
        </button>
        <Avatar
          letters={activeChat!.avatar}
          grad={activeChat!.grad}
          size="sm"
          online={activeChat!.online}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <p className="text-white font-rubik font-medium text-base leading-tight truncate">
              {activeChat!.name}
            </p>
            {activeChat!.verified && (
              <Icon name="BadgeCheck" size={13} className="text-cyan-400 flex-shrink-0" />
            )}
          </div>
          <p className={`text-xs ${activeChat!.online ? "text-emerald-400" : "text-white/40"}`}>
            {activeChat!.online ? "в сети" : "был(а) недавно"}
          </p>
        </div>
        <button
          onClick={onCallAudio}
          className="w-10 h-10 rounded-full flex items-center justify-center tap-scale hover:bg-white/5"
        >
          <Icon name="Phone" size={20} className="text-violet-400" />
        </button>
        <button
          onClick={onCallVideo}
          className="w-10 h-10 rounded-full flex items-center justify-center tap-scale hover:bg-white/5"
        >
          <Icon name="Video" size={20} className="text-violet-400" />
        </button>
        <button className="w-10 h-10 rounded-full flex items-center justify-center tap-scale hover:bg-white/5">
          <Icon name="MoreVertical" size={20} className="text-white/50" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2 relative z-10">
        {messages.map((m, i) => (
          <div
            key={m.id}
            className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
            style={{ animation: `slideUp 0.3s ease ${i * 0.04}s both` }}
          >
            {m.type === "voice" ? (
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl max-w-[72%] ${
                  m.from === "me"
                    ? "bg-gradient-to-br from-violet-600 to-indigo-700 rounded-br-sm"
                    : "glass-2 rounded-bl-sm"
                }`}
              >
                <button
                  className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                    m.from === "me"
                      ? "bg-white/20"
                      : "bg-gradient-to-br from-violet-500 to-indigo-600"
                  }`}
                >
                  <Icon name="Play" size={13} className="text-white ml-0.5" />
                </button>
                <WaveVoice fromMe={m.from === "me"} />
                <span
                  className={`text-xs flex-shrink-0 ${
                    m.from === "me" ? "text-white/60" : "text-white/40"
                  }`}
                >
                  {m.duration}
                </span>
              </div>
            ) : (
              <div
                className={`px-4 py-2.5 rounded-2xl max-w-[78%] ${
                  m.from === "me"
                    ? "bg-gradient-to-br from-violet-600 to-indigo-700 rounded-br-sm"
                    : "glass-2 rounded-bl-sm"
                }`}
              >
                <p className="text-white text-sm leading-relaxed">{m.text}</p>
                <p
                  className={`text-[10px] mt-1 text-right ${
                    m.from === "me" ? "text-white/50" : "text-white/30"
                  }`}
                >
                  {m.time}
                </p>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
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
              onChange={(e) => onMsgChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSendOrRecord();
              }}
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
            style={
              isRecording ? undefined : { boxShadow: "0 0 20px rgba(124,58,237,0.5)" }
            }
            onClick={onSendOrRecord}
          >
            <Icon
              name={msgInput ? "Send" : isRecording ? "Square" : "Mic"}
              size={18}
              className={msgInput ? "text-white ml-0.5" : "text-white"}
            />
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