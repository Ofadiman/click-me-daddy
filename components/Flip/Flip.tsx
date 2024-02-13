import { PropsWithChildren, useEffect } from 'react'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

export const Flip = (
  props: PropsWithChildren<{ shouldAnimate: boolean; durationInMilliseconds: number }>,
) => {
  const deg = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${deg.value}deg` }],
  }))

  useEffect(() => {
    if (props.shouldAnimate) {
      deg.value = withRepeat(
        withTiming(deg.value + 360, {
          duration: props.durationInMilliseconds,
          easing: Easing.inOut(Easing.quad),
        }),
        Number.POSITIVE_INFINITY,
      )
    }
  }, [props.shouldAnimate])

  return <Animated.View style={[animatedStyles]}>{props.children}</Animated.View>
}
