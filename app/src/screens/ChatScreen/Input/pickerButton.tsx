import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { PickerButtonProps } from '../../../types';

const PickerButton = ({ source, onPress, size = 40 }: PickerButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, { width: size, height: size }]}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <Image
        source={source}
        style={[styles.image, { width: size * 0.6, height: size * 0.6 }]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default PickerButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    tintColor: '#000',
  },
});
