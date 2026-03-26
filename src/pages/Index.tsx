import { useState } from "react";
import { Tab, CallType, CHATS, MESSAGES, Message } from "@/components/messenger/messenger-data";
import { CallScreen, ChatScreen } from "@/components/messenger/messenger-screens";
import { ChatsTab, ContactsTab, ProfileTab, SettingsTab, BottomNav } from "@/components/messenger/messenger-tabs";

function getNow() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export default function Index() {
  const [tab, setTab] = useState<Tab>("chats");
  const [openChatId, setOpenChatId] = useState<number | null>(null);
  const [msgInput, setMsgInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showCall, setShowCall] = useState<CallType>(null);
  const [darkToggle, setDarkToggle] = useState(true);
  const [chatMessages, setChatMessages] = useState<Record<number, Message[]>>({});
  const [isTyping, setIsTyping] = useState(false);

  const activeChat = CHATS.find((c) => c.id === openChatId);

  const getMessages = (chatId: number): Message[] =>
    chatMessages[chatId] ?? MESSAGES;

  const handleSend = () => {
    if (!msgInput.trim() || openChatId === null) return;
    const newMsg: Message = {
      id: Date.now(),
      from: "me",
      text: msgInput.trim(),
      time: getNow(),
      type: "text",
    };
    setChatMessages((prev) => ({
      ...prev,
      [openChatId]: [...getMessages(openChatId), newMsg],
    }));
    setMsgInput("");

    // Показываем "печатает..." сразу
    setIsTyping(true);

    const replies = [
      "Понял, окей 👍",
      "Хорошо, договорились!",
      "Отлично 🔥",
      "Ок, увидимся!",
      "Супер, спасибо!",
      "👌",
      "Ждём тебя!",
    ];
    const delay = 1200 + Math.random() * 1200;
    setTimeout(() => {
      setIsTyping(false);
      const reply: Message = {
        id: Date.now() + 1,
        from: "them",
        text: replies[Math.floor(Math.random() * replies.length)],
        time: getNow(),
        type: "text",
      };
      setChatMessages((prev) => ({
        ...prev,
        [openChatId]: [...(prev[openChatId] ?? MESSAGES), reply],
      }));
    }, delay);
  };

  const handleSendOrRecord = () => {
    if (msgInput.trim()) {
      handleSend();
    } else {
      setIsRecording(!isRecording);
    }
  };

  // ── CALL SCREEN ──────────────────────────────────────────────
  if (showCall) {
    return (
      <CallScreen
        showCall={showCall}
        activeChat={activeChat}
        onEndCall={() => setShowCall(null)}
      />
    );
  }

  // ── CHAT SCREEN ───────────────────────────────────────────────
  if (openChatId !== null) {
    return (
      <ChatScreen
        activeChat={activeChat}
        messages={getMessages(openChatId)}
        msgInput={msgInput}
        isRecording={isRecording}
        isTyping={isTyping}
        onBack={() => { setOpenChatId(null); setIsRecording(false); setIsTyping(false); }}
        onCallAudio={() => setShowCall("audio")}
        onCallVideo={() => setShowCall("video")}
        onMsgChange={setMsgInput}
        onSendOrRecord={handleSendOrRecord}
      />
    );
  }

  // ── MAIN SCREEN ───────────────────────────────────────────────
  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden" style={{ background: "#0d0d1a" }}>
      {/* Ambient background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }}
        />
        <div
          className="absolute -top-20 right-0 w-72 h-72 rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, #06B6D4, transparent)" }}
        />
        <div
          className="absolute bottom-24 -right-24 w-80 h-80 rounded-full opacity-6"
          style={{ background: "radial-gradient(circle, #EC4899, transparent)" }}
        />
      </div>

      {tab === "chats" && <ChatsTab onOpenChat={setOpenChatId} />}
      {tab === "contacts" && (
        <ContactsTab
          onCallAudio={(chatId) => { setOpenChatId(chatId); setShowCall("audio"); }}
          onCallVideo={(chatId) => { setOpenChatId(chatId); setShowCall("video"); }}
        />
      )}
      {tab === "profile" && <ProfileTab />}
      {tab === "settings" && (
        <SettingsTab darkToggle={darkToggle} onToggleDark={() => setDarkToggle(!darkToggle)} />
      )}

      <BottomNav tab={tab} onChangeTab={setTab} />
    </div>
  );
}