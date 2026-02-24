import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import GlassUI from 'rn-glass-ui';
import { IMAGEBACKGROUND } from '../../../utils/assets/images';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../ChatScreen/Input';

const GeneratingImage = () => {
  const avatar = 'https://i.pravatar.cc/300?img=56';
  const blurOpacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.timing(blurOpacity, {
      toValue: 1,
      duration: 7000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={[styles.container, styles.otherUserContainer]}>
      <GlassUI containerStyle={styles.glassImageContainer} needBlur={false}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
        </View>
      </GlassUI>
      <View style={[styles.textContainer, styles.otherUserTextContainer]}>
        <GlassUI
          needBlur={false}
          blurAmount={10}
          containerStyle={styles.otherUserGlassContainer}
        >
          <View style={styles.imageContainer}>
            <Animated.Image
              source={IMAGEBACKGROUND}
              style={[styles.image, { opacity: blurOpacity }]}
              blurRadius={30}
            />
          </View>
        </GlassUI>
      </View>
    </View>
  );
};

export default GeneratingImage;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 5,
    justifyContent: 'flex-start',
    marginVertical: 5,
  },
  otherUserContainer: {
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 10,
    alignSelf: 'flex-end',
  },
  otherUserTextContainer: {
    alignItems: 'flex-start',
  },
  otherUserGlassContainer: {
    borderRadius: 8,
  },
  glassImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignSelf: 'flex-end',
  },
  avatarContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  imageContainer: {
    padding: 5,
  },
  image: {
    height: SCREEN_HEIGHT * 0.35,
    width: SCREEN_WIDTH * 0.5,
    borderRadius: 5,
  },
});
