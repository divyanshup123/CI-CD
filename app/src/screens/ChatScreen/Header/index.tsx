import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GlassUI from '../../../components/GlassUI';
import { BACK, CALL, VIDEO } from '../../../utils/assets/images';
import { RoundButton } from '../../MessageBox/messageButtons';

interface ChatHeaderProps {
  enableVoiceChat?: () => void;
}

const Header = ({ enableVoiceChat }: ChatHeaderProps) => {
  return (
    <GlassUI containerStyle={styles.glassContainer} needBlur={false}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backContainer}>
          <Image source={BACK} style={styles.backImg} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.backContainer}>
          <GlassUI
            containerStyle={styles.userProfileContainer}
            needBlur={false}
          >
            <View style={styles.userProfileCenter}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/300?img=56' }}
                style={styles.userProfile}
              />
            </View>
          </GlassUI>
        </TouchableOpacity>
        <Text style={styles.username}>Username</Text>
        <View style={styles.commButtons}>
          <RoundButton source={CALL} size={35} onPress={enableVoiceChat} />
          <RoundButton source={VIDEO} size={35} />
        </View>
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
  username: {
    flex: 1,
  },
  commButtons: {
    flexDirection: 'row',
    columnGap: 8,
    paddingRight: 5,
  },
});
