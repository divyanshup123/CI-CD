import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import GlassUI from '../../components/GlassUI';
import { Message, ReplyMessageType, User } from '../../types';
import MessageButtons from './messageButtons';
import RenderImage from './renderImage';
import { formatDate } from '../../utils/helpers';
import { Loading } from '../../components/Loading';

type MessageBoxPros = {
  message: Message;
  loginUser: User;
  participants: User[];
  regenerateAssistantResult: (
    messageId: string,
    messageType: ReplyMessageType,
  ) => void;
};

const MessageBox = ({
  message,
  loginUser,
  participants,
  regenerateAssistantResult,
}: MessageBoxPros) => {
  const [regenerate, setRegenerate] = useState(false);
  const loggedInUser = message.senderId == loginUser.id;
  const avatar = participants.filter(item => item.id == message.senderId)[0]
    .avatar;
  const isText = message.type == 'text';
  const isImage = message.type == 'image';

  const formattedDate = formatDate(message.timestamp);

  const handleRegenerate = () => {
    setRegenerate(true);

    const timeoutId = setTimeout(() => {
      regenerateAssistantResult(message.id, message.type as ReplyMessageType);
      setRegenerate(false);
    }, 5000);
    return () => clearTimeout(timeoutId);
  };

  return (
    <View
      style={[
        styles.container,
        loggedInUser ? styles.userContainer : styles.otherUserContainer,
      ]}
    >
      <GlassUI containerStyle={styles.glassImageContainer} needBlur={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
        </View>
      </GlassUI>
      <View
        style={[
          styles.textContainer,
          loggedInUser
            ? styles.userTextContainer
            : styles.otherUserTextContainer,
        ]}
      >
        <GlassUI
          needBlur={false}
          blurAmount={10}
          containerStyle={{
            ...(loggedInUser
              ? styles.userGlassContainer
              : styles.otherUserGlassContainer),
          }}
        >
          <View style={styles.messageContainer}>
            {isText &&
              (regenerate ? (
                <Loading />
              ) : (
                <Text style={styles.text}>{message.text}</Text>
              ))}
            {isImage && <RenderImage metadata={message.metadata} />}
            <Text style={styles.time}>{formattedDate}</Text>
          </View>
        </GlassUI>
        {loggedInUser ? null : (
          <MessageButtons
            message={message}
            handleRegenerate={handleRegenerate}
          />
        )}
      </View>
    </View>
  );
};

export default MessageBox;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 5,
    justifyContent: 'flex-start',
    marginVertical: 5,
  },
  userContainer: {
    flexDirection: 'row-reverse',
  },
  otherUserContainer: {
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 10,
    alignSelf: 'flex-end',
  },
  userTextContainer: {
    alignItems: 'flex-end',
  },
  otherUserTextContainer: {
    alignItems: 'flex-start',
  },
  userGlassContainer: {
    borderBottomRightRadius: 2,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  otherUserGlassContainer: {
    borderTopLeftRadius: 2,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  messageContainer: {
    flex: 1,
  },
  text: {
    padding: 8,
    paddingBottom: 0,
    fontSize: 16,
  },
  glassImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignSelf: 'flex-end',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  activityIndicatorContainer: {
    width: 120,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontSize: 12,
    alignSelf: 'flex-end',
    paddingVertical: 2,
    paddingHorizontal: 4,
    includeFontPadding: false,
  },
});
