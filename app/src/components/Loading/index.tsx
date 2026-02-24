import { StyleSheet } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { LOADING } from '../../utils/assets/images';

export const Loading = () => {
  return <LottieView source={LOADING} autoPlay loop style={styles.lottie} />;
};

const styles = StyleSheet.create({
  lottie: {
    width: 80,
    height: 50,
  },
});
