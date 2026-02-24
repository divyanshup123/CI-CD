import { Message, ReplyMessageType } from '../../types';

export const senderMessage = (text: string): Message => {
  return {
    id: `msg001${Date.now()}`,
    senderId: 'user_001',
    text: text,
    timestamp: `${Date()}`,
    status: 'read',
    type: 'text',
  };
};

export const assistantMessage = (
  text: string,
  messageType: ReplyMessageType,
): Message => {
  return {
    id: `msg001${Date.now()}`,
    senderId: 'ai_assistant_001',
    text: text,
    metadata: messageType == 'image' ? { url: text } : undefined,
    timestamp: `${Date()}`,
    status: 'read',
    type: messageType,
  };
};

export const formatDate = (dateString: string) => {
  const date = dateString ? new Date(dateString) : new Date();
  const formattedDate = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return formattedDate;

  //   return dateString
  //     ? moment(dateString).format('hh:mm a')
  //     : moment().format('hh:mm a');
};
