export type Tab = "chats" | "contacts" | "profile" | "settings";
export type CallType = "audio" | "video" | null;

export interface Chat {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
  msg: string;
  time: string;
  unread: number;
  grad: string;
  verified: boolean;
  msgType: "text" | "voice" | "call";
}

export interface Contact {
  id: number;
  name: string;
  status: string;
  avatar: string;
  grad: string;
  online: boolean;
  phone: string;
}

export interface Message {
  id: number;
  from: "me" | "them";
  text: string;
  time: string;
  type: "text" | "voice";
  duration?: string;
}

export interface SettingItem {
  icon: string;
  label: string;
  sub: string;
  grad: string;
}

export const CHATS: Chat[] = [
  { id: 1, name: "Алексей Громов", avatar: "АГ", online: true, msg: "Окей, увидимся завтра в 10! 🔥", time: "14:32", unread: 3, grad: "from-violet-500 to-purple-600", verified: false, msgType: "text" },
  { id: 2, name: "Мария Соколова", avatar: "МС", online: true, msg: "Голосовое · 0:24", time: "13:15", unread: 0, grad: "from-pink-500 to-rose-500", verified: true, msgType: "voice" },
  { id: 3, name: "Команда Nova", avatar: "✦", online: false, msg: "Дизайн утверждён, запускаем!", time: "12:00", unread: 12, grad: "from-cyan-500 to-blue-500", verified: true, msgType: "text" },
  { id: 4, name: "Дмитрий Волков", avatar: "ДВ", online: false, msg: "Видеозвонок завершён · 47 мин", time: "11:30", unread: 0, grad: "from-amber-500 to-orange-500", verified: false, msgType: "call" },
  { id: 5, name: "Анастасия К.", avatar: "АК", online: true, msg: "Ты видел новый дизайн? 😍", time: "10:44", unread: 1, grad: "from-emerald-500 to-teal-500", verified: false, msgType: "text" },
  { id: 6, name: "Иван Петров", avatar: "ИП", online: false, msg: "Завтра скину ссылку", time: "Вчера", unread: 0, grad: "from-indigo-500 to-violet-500", verified: false, msgType: "text" },
  { id: 7, name: "Новости Nova", avatar: "📡", online: false, msg: "Обновление 3.0 уже доступно!", time: "Вчера", unread: 5, grad: "from-rose-500 to-pink-600", verified: true, msgType: "text" },
  { id: 8, name: "Семья", avatar: "🏠", online: false, msg: "Не забудьте про ужин 🍕", time: "Вчера", unread: 0, grad: "from-teal-500 to-cyan-500", verified: false, msgType: "text" },
];

export const CONTACTS: Contact[] = [
  { id: 1, name: "Алексей Громов", status: "В сети", avatar: "АГ", grad: "from-violet-500 to-purple-600", online: true, phone: "+7 999 100-11-22" },
  { id: 2, name: "Анастасия К.", status: "В сети", avatar: "АК", grad: "from-emerald-500 to-teal-500", online: true, phone: "+7 999 200-33-44" },
  { id: 3, name: "Мария Соколова", status: "В сети", avatar: "МС", grad: "from-pink-500 to-rose-500", online: true, phone: "+7 999 300-55-66" },
  { id: 4, name: "Дмитрий Волков", status: "Был 2 часа назад", avatar: "ДВ", grad: "from-amber-500 to-orange-500", online: false, phone: "+7 999 400-77-88" },
  { id: 5, name: "Иван Петров", status: "Был вчера", avatar: "ИП", grad: "from-indigo-500 to-violet-500", online: false, phone: "+7 999 500-99-00" },
  { id: 6, name: "Ольга Смирнова", status: "Была неделю назад", avatar: "ОС", grad: "from-cyan-500 to-blue-500", online: false, phone: "+7 999 600-11-22" },
];

export const MESSAGES: Message[] = [
  { id: 1, from: "them", text: "Привет! Как дела? Давно не виделись 👋", time: "13:00", type: "text" },
  { id: 2, from: "me", text: "Всё отлично! Работаю над крутым проектом", time: "13:02", type: "text" },
  { id: 3, from: "them", text: "", time: "13:05", type: "voice", duration: "0:18" },
  { id: 4, from: "me", text: "Понял, звучит интересно 🔥", time: "13:07", type: "text" },
  { id: 5, from: "them", text: "Давай созвонимся вечером?", time: "13:10", type: "text" },
  { id: 6, from: "me", text: "Конечно! В 19:00 подойдёт?", time: "13:11", type: "text" },
  { id: 7, from: "them", text: "Отлично, буду ждать 👍", time: "13:12", type: "text" },
  { id: 8, from: "me", text: "Окей, увидимся завтра в 10! 🔥", time: "14:32", type: "text" },
];

export const SETTINGS: SettingItem[] = [
  { icon: "Bell", label: "Уведомления", sub: "Все уведомления включены", grad: "from-violet-500 to-purple-600" },
  { icon: "Shield", label: "Приватность", sub: "Двухфакторная аутентификация", grad: "from-cyan-500 to-blue-500" },
  { icon: "Palette", label: "Оформление", sub: "Тёмная тема · Nova", grad: "from-pink-500 to-rose-500" },
  { icon: "Smartphone", label: "Устройства", sub: "2 активных устройства", grad: "from-amber-500 to-orange-500" },
  { icon: "HardDrive", label: "Хранилище", sub: "Использовано 2.4 ГБ из 15 ГБ", grad: "from-emerald-500 to-teal-500" },
  { icon: "HelpCircle", label: "Помощь", sub: "FAQ и поддержка", grad: "from-indigo-500 to-violet-500" },
];
