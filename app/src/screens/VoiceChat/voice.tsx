import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MICROPHONE, RECORDING } from '../../utils/assets/images';
import { VoiceInputProps } from '../../types';
import { RoundButton } from '../MessageBox/messageButtons';
import Voice, {
  SpeechEndEvent,
  SpeechErrorEvent,
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechStartEvent,
} from '@react-native-voice/voice';

const VoiceInput = ({ handleInput }: VoiceInputProps) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
  }, []);

  const onSpeechStart = (e: SpeechStartEvent) => {
    console.log(e, 'onSpeechStart');
  };
  const onSpeechRecognized = (e: SpeechRecognizedEvent) => {
    console.log(e, 'onSpeechRecognized');
  };
  const onSpeechEnd = (e: SpeechEndEvent) => {
    setIsRecording(false);
    console.log(e, 'onSpeechEnd');
  };
  const onSpeechError = (e: SpeechErrorEvent) => {
    setIsRecording(false);
    console.log(e, 'onSpeechError');
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    console.log(e, 'onSpeechResults');
    setIsRecording(false);
    const message = e?.value?.[0] || 'test';
    handleInput({ text: message, messageType: 'text' });
  };

  const onSpeechPartialResults = (e: SpeechResultsEvent) => {
    console.log(e, 'onSpeechPartialResults');
  };

  const startRecording = async () => {
    try {
      setIsRecording(true);
      await Voice.start('en-US');
    } catch (error) {
      console.error(error);
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      await Voice.stop();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.microphone}>
      <RoundButton
        source={!isRecording ? MICROPHONE : RECORDING}
        size={60}
        onPress={!isRecording ? startRecording : stopRecording}
      />
    </View>
  );
};

export default VoiceInput;

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
});
