import Animated, { useSharedValue, withSpring } from 'react-native-reanimated'
import { Pressable } from 'react-native'

export const AnimateWidth = (props: { initialWidth: number }) => {
  const width = useSharedValue(props.initialWidth)

  const handlePress = () => {
    width.value = withSpring(width.value + 50)
  }

  return (
    <Pressable onPress={handlePress}>
      <Animated.View
        style={{
          width,
          height: 100,
          backgroundColor: 'violet',
        }}
      />
    </Pressable>
  )
}
