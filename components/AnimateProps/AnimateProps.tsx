import { Pressable } from 'react-native'
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Circle } from 'react-native-svg'
import { Svg } from 'react-native-svg'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export const AnimateProps = () => {
  const r = useSharedValue(20)

  const handlePress = () => {
    r.value += 20
  }

  const animatedProps = useAnimatedProps(() => ({
    r: withTiming(r.value, { duration: 3_000, easing: Easing.inOut(Easing.quad) }),
  }))

  return (
    <Pressable onPress={handlePress} style={{ flex: 1, width: '100%' }}>
      <Svg height="100%" width="100%">
        <AnimatedCircle cx="50%" cy="50%" fill="#b58df1" animatedProps={animatedProps} />
      </Svg>
    </Pressable>
  )
}
