import {User} from "./User.ts";

export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  timestamp: Date;
  isRead: boolean;
}


export interface Conversation {
  user: User;
  lastMessage: string;
  lastMessageTime: Date;
  unreadMessages: number;
}

export enum UserStatus {
  Offline = 0,
  Online = 1,
  Away = 2
}

export enum ActiveTab {
  chats = 'chats',
  users = 'users'
}



export interface ChatContextState {
  messages: Message[];
  users: User[];
  filteredUsers: User[];
  selectedUser: User | null;
  conversations: Conversation[];
  filteredConversations: Conversation[];
}