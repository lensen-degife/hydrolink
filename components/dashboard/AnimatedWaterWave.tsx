import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

type WaveProps = {
  height?: number;
  waveColor1?: string;
  waveColor2?: string;
  waveColor3?: string;
};

export function AnimatedWaterWave({
  height = 70,
  waveColor1 = 'rgba(255, 255, 255, 0.22)',
  waveColor2 = 'rgba(255, 255, 255, 0.14)',
  waveColor3 = 'rgba(255, 255, 255, 0.08)',
}: WaveProps) {
  const wave1TranslateX = useSharedValue(0);
  const wave2TranslateX = useSharedValue(0);
  const wave3TranslateX = useSharedValue(0);

  useEffect(() => {
    wave1TranslateX.value = withRepeat(
      withTiming(1, { duration: 4000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
    wave2TranslateX.value = withRepeat(
      withTiming(1, { duration: 5500, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
    wave3TranslateX.value = withRepeat(
      withTiming(1, { duration: 7000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
  }, [wave1TranslateX, wave2TranslateX, wave3TranslateX]);

  const styleWave1 = useAnimatedStyle(() => ({
    transform: [
      { translateX: wave1TranslateX.value * 40 - 20 },
      { scaleY: 1 + wave1TranslateX.value * 0.1 },
    ],
  }));

  const styleWave2 = useAnimatedStyle(() => ({
    transform: [
      { translateX: wave2TranslateX.value * -50 + 25 },
      { scaleY: 1 + wave2TranslateX.value * 0.15 },
    ],
  }));

  const styleWave3 = useAnimatedStyle(() => ({
    transform: [
      { translateX: wave3TranslateX.value * 30 - 15 },
      { translateY: wave3TranslateX.value * 4 },
    ],
  }));

  return (
    <View style={[styles.container, { height }]} pointerEvents="none">
      {/* Background layer 3 */}
      <Animated.View
        style={[
          styles.waveLayer,
          { backgroundColor: waveColor3, bottom: -20, height: height + 30, borderRadius: 180 },
          styleWave3,
        ]}
      />
      {/* Mid layer 2 */}
      <Animated.View
        style={[
          styles.waveLayer,
          { backgroundColor: waveColor2, bottom: -12, height: height + 20, borderRadius: 160 },
          styleWave2,
        ]}
      />
      {/* Front layer 1 */}
      <Animated.View
        style={[
          styles.waveLayer,
          { backgroundColor: waveColor1, bottom: -5, height: height + 10, borderRadius: 140 },
          styleWave1,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  waveLayer: {
    position: 'absolute',
    left: -80,
    right: -80,
  },
});
