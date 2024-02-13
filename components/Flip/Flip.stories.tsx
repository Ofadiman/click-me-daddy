import { Meta, StoryObj } from '@storybook/react'
import { Flip } from './Flip'
import { Text } from 'react-native'

export default {
  title: 'Flip',
  component: Flip,
} satisfies Meta<typeof Flip>

export const Primary: StoryObj<typeof Flip> = {
  args: {
    children: (
      <Text
        style={{
          height: 120,
          width: 120,
          backgroundColor: '#b58df1',
          borderRadius: 20,
          textAlignVertical: 'center',
          textAlign: 'center',
        }}
      >
        Animating
      </Text>
    ),
    shouldAnimate: true,
    durationInMilliseconds: 3_000,
  },
}
