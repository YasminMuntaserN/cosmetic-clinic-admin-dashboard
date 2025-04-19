import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSignalR } from './SignalRContext';
import {Message, Conversation, ChatContextState, ActiveTab, UserStatus} from '../types/chat';
import { useParams } from 'react-router-dom';
import {getAll, getAllBy} from "../services/BaseApi.ts";
import { User} from "../types/User.ts";
import {useClinic} from "./ClinicContext.tsx";

interface ChatContextType extends ChatContextState {
  sendMessage: (receiverId: string, content: string) => Promise<void>;
  markMessageAsRead: (messageId: string) => Promise<void>;
  selectUser: (user: User | null) => void;
  filteredConversations: Conversation[];
  setFilteredConversations: (conversations: Conversation[]) => void;
  filteredUsers: User[];
  setFilteredUsers: (users: User[]) => void;
  activeTab: ActiveTab;
  setActiveTab: (activeTab: ActiveTab) => void;
  userId:string;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}


export function ChatProvider({ children }: ChatProviderProps) {
  const { userId } = useParams<{ userId: string; }>();
  const signalR = useSignalR();
  const queryClient = useQueryClient();
  const {selectedUser, setSelectedUser} =useClinic();
  const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.chats);
  const [filteredConversations, setFilteredConversations] = useState<Conversation[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: ():Promise<User[]>=>getAll("users") 
  });

  const { data: conversations = [] } = useQuery({
    queryKey: ['conversations', userId],
    queryFn: ():Promise<Conversation[]> => getAllBy("chat" ,`conversations/${userId}`)
  });

  const { data: messages = [] } = useQuery({
    queryKey: ['messages', userId, selectedUser?.id],
    queryFn: ():Promise<Message[]> => selectedUser ?getAllBy("chat" ,`messages/${userId}/${selectedUser.id}`) : Promise.resolve([]),
    enabled: !!selectedUser
  });
  
  useEffect(() => {
    setFilteredConversations(conversations);
  }, [conversations]);

  useEffect(() => {
    if (userId && users) {
      setFilteredUsers(users);
    }
  }, [users, userId]);

  useEffect(() => {
    const initializeSignalR = async () => {
      if (!userId) return;

      try {
        await signalR.connect(userId);

        signalR.onReceiveMessage((message) => {
          queryClient.invalidateQueries({queryKey: ['messages', userId, message.senderId],});
          queryClient.invalidateQueries({ queryKey: ['conversations', userId] });
        });

        signalR.onMessageRead((messageId) => {
          queryClient.setQueryData<Message[]>(['messages'], (old = []) =>
              old.map(m => m.id === messageId ? { ...m, isRead: true } : m)
          );
        });

        signalR.onUserConnected((connectedUserId) => {
          queryClient.setQueryData<User[]>(['users'], (old = []) =>
              old.map(u => u.id === connectedUserId ? { ...u, status: UserStatus.Online } : u)
          );
        });

        signalR.onUserDisconnected((disconnectedUserId) => {
          queryClient.setQueryData<User[]>(['users'], (old = []) =>
              old.map(u => u.id === disconnectedUserId ? { ...u, status: UserStatus.Offline } : u)
          );
        });
      } catch (error) {
        console.error('Failed to initialize SignalR:', error);
      }
    };

    initializeSignalR();
    return () => signalR.disconnect();
  }, [userId, signalR, queryClient]);

  const sendMessage = async (receiverId: string, content: string) => {
    if (!userId) return;
    await signalR.sendMessage(receiverId, content);
    await queryClient.invalidateQueries({
      queryKey: ['messages', userId, receiverId],
    });
    await queryClient.invalidateQueries({ queryKey: ['conversations', userId] });
  };

  const markMessageAsRead = async (messageId: string) => {
    await signalR.markMessageAsRead(messageId);
    await queryClient.invalidateQueries({ queryKey: ['conversations', userId] });
  };

  const selectUser = (user: User | null) => {
    if(user){
      setSelectedUser(user);
    }
  };

  if (!userId) {
    return <div>User ID is required</div>;
  }

  return (
      <ChatContext.Provider value={{
        users,
        messages,
        conversations,
        filteredConversations,
        setFilteredConversations,
        filteredUsers,
        setFilteredUsers,
        selectedUser,
        sendMessage,
        markMessageAsRead,
        selectUser,
        activeTab,
        setActiveTab,
        userId
      }}>
        {children}
      </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}