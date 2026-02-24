import React from 'react';
import { Image, Modal, StyleSheet, Text, View } from 'react-native';
import { ViewImageProps } from '../../types/components';
import Header from '../Header';

const ViewImage = ({ imageUrl, visible, setVisible }: ViewImageProps) => {
  if (!visible || !imageUrl) return null;

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Header onBackPress={() => setVisible(false)} tintColor={'white'} />
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
};

export default ViewImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  image: {
    flex: 1,
  },
});
