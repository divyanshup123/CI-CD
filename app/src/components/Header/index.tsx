import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GlassUI from '../GlassUI';
import { BACK } from '../../utils/assets/images';
import { HeaderProps } from '../../types/components';

const Header = ({ onBackPress, tintColor }: HeaderProps) => {
  return (
    <GlassUI containerStyle={styles.glassContainer} needBlur={false}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backContainer} onPress={onBackPress}>
          <Image source={BACK} style={styles.backImg} tintColor={tintColor} />
        </TouchableOpacity>
      </View>
    </GlassUI>
  );
};

export default Header;

const styles = StyleSheet.create({
  glassContainer: {
    height: 60,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  backContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  backImg: {
    width: 25,
    height: 25,
  },
  userProfileContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 5,
  },
  userProfileCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userProfile: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
