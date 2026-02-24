import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import type { ViewStyle } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { hexToRgb } from '../../utils/helpers';

interface GlassUIProps {
  children?: React.ReactNode;
  blurType?: 'dark' | 'light' | 'xlight';
  blurAmount?: number;
  overlayColor?: string;
  containerColor?: string;
  containerStyle?: ViewStyle;
  needBlur?: boolean;
}

const DEFAULT_WIDTH = 200;
const DEFAULT_HEIGHT = 200;
const DEFAULT_BG = 'rgba(255, 255, 255, 0.01)';
const OVERLAY_COLOR = 'rgba(255, 255, 255, 0.02)';

const GlassUI = ({
  children,
  blurType = 'light',
  blurAmount = 1,
  overlayColor = OVERLAY_COLOR,
  containerColor,
  containerStyle,
  needBlur = true,
}: GlassUIProps) => {
  const backgroundColor = !containerColor
    ? DEFAULT_BG
    : useMemo(() => {
        const rgba = hexToRgb(containerColor);
        return rgba ? rgba : DEFAULT_BG;
      }, []);

  const boxShadowStyle = needBlur
    ? styles.boxShadowWithBlur
    : styles.boxShadowWithoutBlur;

  const widthStyle = !containerStyle
    ? children
      ? {}
      : styles.defaultDimension
    : containerStyle;

  const detailsHeightStyle = {
    height: containerStyle ? containerStyle['height'] : DEFAULT_HEIGHT,
  };
  return (
    <View style={[styles.mainContainer, widthStyle, boxShadowStyle]}>
      <View style={[styles.blurContainer]}>
        {needBlur && (
          <BlurView
            style={styles.blurView}
            blurType={blurType}
            blurAmount={blurAmount}
            reducedTransparencyFallbackColor="white"
            overlayColor={overlayColor}
          />
        )}
        <View style={[styles.innerContainer, { backgroundColor }]}>
          <View style={[styles.detailsContainer, detailsHeightStyle]}>
            {children}
          </View>
        </View>
      </View>
    </View>
  );
};

export default GlassUI;

const styles = StyleSheet.create({
  defaultDimension: {
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  blurView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  defaultWidth: {
    width: DEFAULT_WIDTH,
  },
  mainContainer: {
    // marginHorizontal: 10,
    // marginVertical: 10,
    // borderRadius: 16,
    overflow: 'hidden',
    // boxShadow: [
    //   {
    //     offsetX: 5,
    //     offsetY: 5,
    //     blurRadius: 8,
    //     color: '#00ff0040',
    //     spreadDistance: 0,
    //   },
    //   {
    //     offsetX: 10,
    //     offsetY: 10,
    //     blurRadius: 8,
    //     color: '#0000ff50',
    //     spreadDistance: 0,
    //   },
    //   {
    //     offsetX: 15,
    //     offsetY: 15,
    //     blurRadius: 8,
    //     color: '#ff000060',
    //     spreadDistance: 0,
    //   },
    // ],
  },
  boxShadowWithBlur: {
    boxShadow: [
      {
        offsetX: 3,
        offsetY: 3,
        blurRadius: 8,
        color: '#00000030',
        spreadDistance: 0,
      },
    ],
  },
  boxShadowWithoutBlur: {
    boxShadow: [
      {
        offsetX: 3,
        offsetY: 3,
        blurRadius: 8,
        color: '#00000070',
        spreadDistance: 0,
      },
    ],
  },
  blurContainer: {
    position: 'relative',
    width: '100%',
    // borderRadius: 16,
    overflow: 'hidden',
  },
  innerContainer: {
    width: '100%',
    // borderRadius: 16,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 5,
        color: '#00000015',
        spreadDistance: 0,
      },
    ],
    elevation: 0,
    shadowColor: 'rgba(0,0,0,0.2)',
  },
  detailsContainer: {
    width: '100%',
    // padding: 12,
    // backgroundColor: '#FFEE002F',
    // borderRadius: 16,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 0,
        color: '#00000030',
        spreadDistance: 0,
      },
    ],
    elevation: 0,
    shadowColor: 'rgba(0,0,0,0.2)',
  },
  height100: {
    height: '100%',
  },
  width100: {
    width: '100%',
  },
});
