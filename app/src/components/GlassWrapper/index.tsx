import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GlassUI from '../GlassUI';

type WrapperProps = {
  children: React.ReactNode;
};

const GlassWrapper = ({ children }: WrapperProps) => {
  return <GlassUI containerStyle={styles.container}>{children}</GlassUI>;
};

export default GlassWrapper;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
