// TypeScript interfaces for chat conversation data

import { ColorValue, ImageSourcePropType } from 'react-native';

export type UserStatus = 'online' | 'offline' | 'away' | 'busy';

export type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed' | 'typing';

export type MessageType =
  | 'text'
  | 'image'
  | 'link'
  | 'file'
  | 'audio'
  | 'video'
  | 'typing_indicator';

export type ReplyMessageType = 'text' | 'image';

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: UserStatus;
}

export interface MessageMetadata {
  url?: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
  caption?: string;
  fileName?: string;
  fileSize?: number;
  duration?: number;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status: MessageStatus;
  type: MessageType;
  metadata?: MessageMetadata;
  replyTo?: string; // ID of message being replied to
  edited?: boolean;
  editedAt?: string;
}

export interface ConversationMetadata {
  createdAt: string;
  lastMessageAt: string;
  unreadCount: {
    [userId: string]: number;
  };
}

export interface Conversation {
  id: string;
  participants: User[];
  messages: Message[];
  metadata: ConversationMetadata;
}

export interface ChatData {
  conversation: Conversation;
}

// Utility types for working with chat data
export type MessageWithSender = Message & {
  sender: User;
};

export type ConversationPreview = {
  id: string;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
  updatedAt: string;
};

export interface RoundButtonProps {
  source: ImageSourcePropType;
  onPress?: () => void;
  size?: number;
  borderRadius?: number;
  tintColor?: ColorValue;
  duration?: number;
  downloading?: boolean;
}

export type PickerButtonProps = Omit<
  RoundButtonProps,
  'borderRadius, tintColor, duration, downloading'
>;

export interface InputBoxProps {
  handleInput: (data: HandleInputProps) => void;
}

export interface ChatScreenProps {
  messages: Message[];
}

export interface HandleInputProps {
  text: string;
  metadata?: MessageMetadata;
  messageType?: MessageType;
}
export interface MessageButtonProps {
  message: Message;
  handleRegenerate: () => void;
}

export interface VoiceInputProps {
  handleInput: (data: HandleInputProps) => void;
}
