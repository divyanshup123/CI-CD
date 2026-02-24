import React, { useRef, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, View } from 'react-native';
import { SOLIDBACKGROUND } from '../../utils/assets/images';
import MessageBox from '../MessageBox';
import { assistantReplies, conversation } from '../../utils/constants';
import Header from './Header';
import { Message, HandleInputProps, ReplyMessageType } from '../../types';
import VoiceInput from './voice';
import { assistantMessage, senderMessage } from '../../utils/helpers';
import { Loading } from '../../components/Loading';

const VoiceChatScreen = () => {
  const flatListRef = useRef<FlatList>(null);
  const chatMessagesRef = useRef<Message[]>([]);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInput = ({
    text,
    metadata,
    messageType = 'text',
  }: HandleInputProps) => {
    const newMessage: Message = senderMessage(text);
    chatMessagesRef.current.unshift(newMessage);
    setChatMessages([...chatMessagesRef.current]);
    setLoading(true);
    const timeoutId = setTimeout(
      () => assistantResult(messageType as ReplyMessageType),
      30 * 1000,
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
    chatMessagesRef.current.length > 0 &&
      flatListRef.current?.scrollToIndex({ index: 0, animated: true });
  };

  return (
    <ImageBackground source={SOLIDBACKGROUND} style={styles.backgroundImage}>
      <Header />
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
      <VoiceInput handleInput={handleInput} />
    </ImageBackground>
  );
};

export default VoiceChatScreen;

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
  microphone: {
    alignSelf: 'center',
    paddingVertical: 10,
  },
  lottie: {
    width: 80,
    height: 50,
  },
});
