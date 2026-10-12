import { StyleSheet, View } from 'react-native';
import Animated, { Easing, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

type ScoreRingProps = {
  /** Score from 0-100 */
  score: number;
  /** Ring size in pixels */
  size?: number;
  /** Stroke width */
  strokeWidth?: number;
  /** Show score label in center */
  showLabel?: boolean;
  /** Label suffix */
  labelSuffix?: string;
};

const GREEN = '#10B981';
const AMBER = '#F59E0B';
const RED = '#EF4444';

function getScoreColor(score: number): string {
  if (score >= 70) return GREEN;
  if (score >= 40) return AMBER;
  return RED;
}

export function ScoreRing({ score, size = 80, strokeWidth = 8, showLabel = true, labelSuffix = '%' }: ScoreRingProps) {
  const clampedScore = Math.max(0, Math.min(100, score));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = clampedScore / 100;

  const animatedProgress = useSharedValue(0);
  const derivedOffset = useDerivedValue(() => {
    return circumference * (1 - animatedProgress.value);
  }, []);

  // Animate on mount
  if (animatedProgress.value === 0) {
    animatedProgress.value = withTiming(progress, { duration: 1000, easing: Easing.out(Easing.cubic) });
  }

  const color = getScoreColor(clampedScore);

  return (
    <View style={{ width: size, height: size, position: 'relative' }}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: size,
          height: size,
          transform: [{ rotate: '-90deg' }],
        }}>
        {/* Background track */}
        <Animated.Shape
          Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeColor="#1F202E"
          fill="transparent"
        />
        {/* Progress ring */}
        <Animated.Shape
          Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeColor={color}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={derivedOffset}
          strokeLinecap="round"
        />
      </Animated.View>

      {showLabel && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
        <ThemedText style={{ fontSize: size * 0.25, fontWeight: '700', color: '#fff' }}>
          {clampedScore}{labelSuffix}
        </ThemedText>
      </View>
      )}
    </View>
  );
}