import { PropsWithChildren, useEffect } from 'react'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

export const Rotate = (
  props: PropsWithChildren<{ shouldAnimate: boolean; animationDuration: number }>,
) => {
  const deg = useSharedValue(180)

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${deg.value}deg` }],
  }))

  useEffect(() => {
    if (props.shouldAnimate) {
      deg.value = withRepeat(
        withTiming(deg.value + 360, {
          duration: props.animationDuration,
          easing: Easing.inOut(Easing.quad),
        }),
        Number.POSITIVE_INFINITY,
      )
    }
  }, [props.shouldAnimate, props.animationDuration])

  return <Animated.View style={[animatedStyles]}>{props.children}</Animated.View>
}
