import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import GlassUI from 'rn-glass-ui';
import Tts from 'react-native-tts';
import Clipboard from '@react-native-clipboard/clipboard';
import RNFS, { DownloadFileOptions } from 'react-native-fs';
import {
  COPY,
  FILLEDLIKE,
  UNFILLEDLIKE,
  REGENERATE,
  VOLUME,
  DOWNLOAD,
} from '../../utils/assets/images';
import {
  RoundButtonProps,
  MessageButtonProps,
  MessageMetadata,
} from '../../types';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export const RoundButton = ({
  source,
  onPress,
  size = 30,
  borderRadius,
  tintColor = 'black',
  downloading = false,
}: RoundButtonProps) => {
  return (
    <GlassUI
      containerStyle={{
        width: size,
        height: size,
        borderRadius: borderRadius || size / 2,
      }}
      needBlur={false}
    >
      <TouchableOpacity
        style={[styles.button, { width: size, height: size }]}
        onPress={onPress}
        disabled={downloading}
        activeOpacity={0.6}
      >
        <Image
          source={source}
          style={[{ width: size * 0.6, height: size * 0.6 }]}
          resizeMode="contain"
          tintColor={tintColor}
        />
      </TouchableOpacity>
    </GlassUI>
  );
};

const MessageButtons = ({ message, handleRegenerate }: MessageButtonProps) => {
  const [like, setLike] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const messageText = message.text;
  const metadata = message.metadata;
  const readText = (text: string) => {
    Tts.speak(text);
  };
  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
  };
  const handleLike = () => {
    setLike(!like);
  };

  const downloadImage = async (metadata: MessageMetadata) => {
    console.log(metadata);
    if (!metadata.url) {
      return;
    }
    const extension = metadata.url.split('.').pop();
    const filePath = `${
      RNFS.DownloadDirectoryPath
    }/image_${Date.now()}.${extension}`;

    const downloadOptions: DownloadFileOptions = {
      fromUrl: metadata.url,
      toFile: filePath,
      begin(res) {
        setDownloading(true);
      },
      progress(res) {
        console.log(res);
        setProgress(res.bytesWritten / res.contentLength);
      },
    };
    const downloadImage = RNFS.downloadFile(downloadOptions);
    const imageData = await downloadImage.promise;
    console.log(downloadImage, imageData);
    setDownloading(false);
  };
  return (
    <View style={styles.buttonContainer}>
      <View style={styles.threeButtons}>
        <RoundButton
          source={COPY}
          onPress={() => copyToClipboard(messageText)}
        />
        <RoundButton
          source={like ? FILLEDLIKE : UNFILLEDLIKE}
          onPress={() => handleLike()}
        />
        {message.type == 'text' ? (
          <RoundButton source={VOLUME} onPress={() => readText(messageText)} />
        ) : (
          metadata && (
            <RoundButton
              source={DOWNLOAD}
              onPress={() => downloadImage(metadata)}
              downloading={downloading}
            />
          )
        )}
        {downloading && (
          <AnimatedCircularProgress
            size={30}
            width={5}
            fill={75}
            tintColor="#00e0ff"
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#3d5875"
          />
        )}
      </View>
      <View>
        <RoundButton source={REGENERATE} onPress={() => handleRegenerate()} />
      </View>
    </View>
  );
};

export default MessageButtons;

const styles = StyleSheet.create({
  borderRadius: {
    borderRadius: 15,
  },
  buttonContainer: {
    width: '95%',
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  threeButtons: {
    columnGap: 10,
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  quarter: {
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
    position: 'absolute',
  },
});
