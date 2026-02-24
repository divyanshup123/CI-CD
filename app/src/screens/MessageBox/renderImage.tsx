import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { Fragment, useLayoutEffect, useRef, useState } from 'react';
import { MessageMetadata } from '../../types';
import ViewImage from '../../components/ViewImage';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../ChatScreen/Input';

const RenderImage = ({
  metadata,
}: {
  metadata: MessageMetadata | undefined;
}) => {
  const imageRef = useRef<Image>(null);
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [visible, setVisible] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (metadata?.url) {
      if (!metadata.width || !metadata.height) {
        Image.getSize(
          metadata.url,
          (width, height) => {
            setAspectRatio(width / height);
          },
          error => console.error(error),
        );
      } else {
        const width = metadata.width || 1;
        const height = metadata.height || 1;
        setAspectRatio(width / height);
      }
    }
  }, []);

  return (
    <Fragment>
      <Pressable
        style={[
          styles.container,
          aspectRatio > 1 ? styles.containerWidth : styles.containerHeight,
        ]}
        onPress={() => setVisible(true)}
      >
        <Image
          ref={imageRef}
          source={{ uri: metadata?.url }}
          style={[
            styles.image,
            {
              aspectRatio: aspectRatio,
            },
          ]}
        />
        {metadata?.caption && (
          <Text style={styles.text}>{metadata.caption}</Text>
        )}
      </Pressable>
      {visible && (
        <ViewImage
          visible={visible}
          setVisible={setVisible}
          imageUrl={metadata?.url}
        />
      )}
    </Fragment>
  );
};

export default RenderImage;

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  containerWidth: {
    width: SCREEN_WIDTH * 0.75,
  },
  containerHeight: {
    height: SCREEN_HEIGHT * 0.35,
  },
  image: {
    flex: 1,
    borderRadius: 5,
  },
  text: {
    paddingTop: 8,
    fontSize: 16,
  },
});
