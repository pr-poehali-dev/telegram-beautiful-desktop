import { useState } from "react";
import { Tab, CallType, CHATS } from "@/components/messenger/messenger-data";
import { CallScreen, ChatScreen } from "@/components/messenger/messenger-screens";
import { ChatsTab, ContactsTab, ProfileTab, SettingsTab, BottomNav } from "@/components/messenger/messenger-tabs";

export default function Index() {
  const [tab, setTab] = useState<Tab>("chats");
  const [openChatId, setOpenChatId] = useState<number | null>(null);
  const [msgInput, setMsgInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showCall, setShowCall] = useState<CallType>(null);
  const [darkToggle, setDarkToggle] = useState(true);

  const activeChat = CHATS.find((c) => c.id === openChatId);

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
        msgInput={msgInput}
        isRecording={isRecording}
        onBack={() => setOpenChatId(null)}
        onCallAudio={() => setShowCall("audio")}
        onCallVideo={() => setShowCall("video")}
        onMsgChange={setMsgInput}
        onSendOrRecord={() => {
          if (msgInput) { setMsgInput(""); }
          else { setIsRecording(!isRecording); }
        }}
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