import React, { useRef, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { SOLIDBACKGROUND } from '../../utils/assets/images';
import MessageBox from '../MessageBox';
import { assistantReplies, conversation } from '../../utils/constants';
import Header from './Header';
import MessageInput from './Input';
import {
  Message,
  HandleInputProps,
  ChatScreenProps,
  ReplyMessageType,
  MessageType,
} from '../../types';
import VoiceChatScreen from '../VoiceChat';
import { assistantMessage, senderMessage } from '../../utils/helpers';
import { Loading } from '../../components/Loading';
import GeneratingImage from '../MessageBox/Placeholder/image';

const ChatScreen = ({ messages }: ChatScreenProps) => {
  const flatListRef = useRef<FlatList>(null);
  const chatMessagesRef = useRef<Message[]>([]);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [enableVoiceChat, setEnableVoiceChat] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [generating, setGenerating] = useState<boolean>(false);

  const handleInput = ({
    text,
    metadata,
    messageType = 'text',
  }: HandleInputProps) => {
    const newMessage: Message = {
      ...senderMessage(text),
      metadata: metadata,
      type: messageType,
    };

    chatMessagesRef.current.unshift(newMessage);
    setChatMessages(chatMessagesRef.current);
    messageType == 'text' ? setLoading(true) : setGenerating(true);

    const timeoutId = setTimeout(
      () => assistantResult(messageType as ReplyMessageType),
      6000,
    );
    return () => clearTimeout(timeoutId);
  };

  const assistantResult = (messageType: ReplyMessageType) => {
    const randomIndex = Math.floor(Math.random() * 10);
    const reply = assistantReplies[messageType][randomIndex];
    const message: Message = assistantMessage(reply, messageType);
    chatMessagesRef.current.unshift(message);
    setChatMessages(chatMessagesRef.current);
    scrollToNewMessage();
    setLoading(false);
    const timeoutId = setTimeout(() => {
      console.log('generating false');
      setGenerating(false);
    }, 1000);
    // return () => clearTimeout(timeoutId);
  };

  const regenerateAssistantResult = (
    messageId: string,
    messageType: ReplyMessageType,
  ) => {
    const index = chatMessagesRef.current
      .reverse()
      .findIndex(message => message.id == messageId);
    chatMessagesRef.current = chatMessagesRef.current.slice(0, index).reverse();

    const randomIndex = Math.floor(Math.random() * 10);
    const reply = assistantReplies[messageType][randomIndex];
    const message: Message = assistantMessage(reply, messageType);
    chatMessagesRef.current.unshift(message);
    setChatMessages(chatMessagesRef.current);
  };

  const scrollToNewMessage = () => {
    chatMessagesRef.current.length > 0;
    flatListRef.current?.scrollToIndex({ index: 0, animated: true });
  };

  const enableVoice = () => {
    setEnableVoiceChat(!enableVoiceChat);
  };

  return enableVoiceChat ? (
    <VoiceChatScreen />
  ) : (
    <ImageBackground source={SOLIDBACKGROUND} style={styles.backgroundImage}>
      <Header enableVoiceChat={enableVoice} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={50}
      >
        <FlatList
          ref={flatListRef}
          data={chatMessages}
          keyExtractor={(item, index) => `${item.id}${index}`}
          inverted
          renderItem={({ item, index }) => (
            <MessageBox
              key={`message-${index}`}
              message={item}
              loginUser={conversation.participants[0]}
              participants={conversation.participants}
              regenerateAssistantResult={regenerateAssistantResult}
            />
          )}
          contentContainerStyle={[styles.list]}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
          automaticallyAdjustsScrollIndicatorInsets={true}
          maintainVisibleContentPosition={{
            minIndexForVisible: 0,
          }}
        />
        {loading && <Loading />}
        {generating && <GeneratingImage />}
        <MessageInput handleInput={handleInput} />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    height: '100%',
  },
  list: {
    flexGrow: 1,
    marginHorizontal: 5,
  },
});
