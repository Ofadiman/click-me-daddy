import { Fragment } from 'react'
import { Button } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

const OFFSET = 40
const TIME = 250
const DELAY = 0

export const AnimateStyles = () => {
  const offset = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }))

  const handlePress = () => {
    offset.value = withDelay(
      DELAY,
      withSequence(
        withTiming(-OFFSET, { duration: TIME / 2 }),
        withRepeat(withTiming(OFFSET, { duration: TIME }), 5, true),
        withTiming(0, { duration: TIME / 2 }),
      ),
    )
  }

  return (
    <Fragment>
      <Animated.View
        style={[
          {
            height: 120,
            width: 120,
            backgroundColor: '#b58df1',
            borderRadius: 20,
            marginVertical: 50,
          },
          animatedStyles,
        ]}
      />
      <Button onPress={handlePress} title="Click me" />
    </Fragment>
  )
}
