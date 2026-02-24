import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import GlassUI from 'rn-glass-ui';
import { RoundButton } from '../../MessageBox/messageButtons';
import {
  ATTACHMENT,
  CAMERA,
  CLOSE,
  MICROPHONE,
  SEND,
} from '../../../utils/assets/images';
import { InputBoxProps } from '../../../types';
import ImagePicker, {
  ImageOrVideo,
  Options,
} from 'react-native-image-crop-picker';
import PickerButton from './pickerButton';

export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;

const MessageInput = ({ handleInput }: InputBoxProps) => {
  const [message, setMessage] = useState('');
  const [imageData, setImageData] = useState<ImageOrVideo[]>([]);

  const handleCamera = async () => {
    const options: Options = {
      mediaType: 'photo',
      // cropping: true,
    };
    try {
      const metadata = await ImagePicker.openCamera(options);
      setImageData([...imageData, metadata]);
    } catch (error) {
      console.error(error);
    }
  };

  const openGallery = async () => {
    const options: Options = {
      mediaType: 'photo',
      // cropping: true,
    };
    try {
      const data = await ImagePicker.openPicker(options);
      // const aspectRatio = data.width / data.height;
      // const width = aspectRatio * SCREEN_WIDTH * 0.6;
      // const height = aspectRatio * SCREEN_HEIGHT * 0.6;
      const metadata = {
        ...data,
        modificationDate: `${Date.now()}`,
        // width,
        // height,
      };
      setImageData([...imageData, metadata]);
    } catch (error) {
      console.error(error);
    }
  };

  const onMessageSend = () => {
    imageData.length == 0
      ? handleInput({ text: message })
      : handleInput({
          text: message,
          messageType: 'image',
          metadata: {
            url: imageData[0].path,
            width: imageData[0].width,
            height: imageData[0].height,
            caption: message,
          },
        });

    setImageData([]);
    setMessage('');
  };

  const deleteImage = (imageId: string) => {
    const newImageData = imageData.filter(
      item => item.modificationDate != imageId,
    );
    setImageData(newImageData);
  };

  const RenderImageThumbnail = ({ item }: { item: ImageOrVideo }) => {
    return (
      <View style={styles.thumbnailImageContainer}>
        <View style={styles.closeButton}>
          <RoundButton
            source={CLOSE}
            size={20}
            onPress={() => {
              item.modificationDate ? deleteImage(item.modificationDate) : {};
            }}
          />
        </View>
        <Image
          source={{ uri: item.path }}
          style={styles.thumbnailImage}
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <GlassUI containerStyle={styles.glassContainer} needBlur={false}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputBox}
            multiline
            value={message}
            onChangeText={val => setMessage(val)}
          />

          <View style={styles.inputButton}>
            <PickerButton source={ATTACHMENT} size={40} onPress={openGallery} />
            {!message && (
              <PickerButton source={CAMERA} size={40} onPress={handleCamera} />
            )}
          </View>
        </View>
        {imageData.length > 0 && (
          <FlatList
            data={imageData}
            horizontal
            keyExtractor={(_, i) => `image-${i}`}
            renderItem={({ item }) => <RenderImageThumbnail item={item} />}
            contentContainerStyle={styles.thumbnailList}
          />
        )}
      </GlassUI>
      <RoundButton
        source={message ? SEND : MICROPHONE}
        size={40}
        borderRadius={15}
        onPress={() => onMessageSend()}
      />
    </View>
  );
};

export default MessageInput;

const styles = StyleSheet.create({
  container: {
    columnGap: 10,
    paddingHorizontal: 10,
    alignItems: 'flex-end',
    marginTop: 5,
    marginBottom: 10,
    flexDirection: 'row',
  },
  glassContainer: {
    flex: 1,
    borderRadius: 20,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  inputBox: {
    flex: 1,
    maxHeight: 120,
    paddingHorizontal: 10,
    color: '#0000000',
  },
  inputButton: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  thumbnailList: {
    columnGap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  thumbnailImageContainer: {
    width: 60,
    height: 60,
    marginRight: 5,
    borderRadius: 10,
  },
  thumbnailImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    top: -5,
    right: -8,
    zIndex: 1,
  },
});
