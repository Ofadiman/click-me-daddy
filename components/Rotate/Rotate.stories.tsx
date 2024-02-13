import { Meta, StoryObj } from '@storybook/react'
import { Rotate } from './Rotate'
import { Text } from 'react-native'

export default {
  title: 'Rotate',
  component: Rotate,
} satisfies Meta<typeof Rotate>

export const Primary: StoryObj<typeof Rotate> = {
  args: {
    shouldAnimate: true,
    animationDuration: 3_000,
    children: (
      <Text
        style={{
          height: 120,
          width: 120,
          backgroundColor: '#b58df1',
          borderRadius: 20,
          textAlign: 'center',
          textAlignVertical: 'center',
        }}
      >
        Animating
      </Text>
    ),
  },
}
