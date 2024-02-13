import type { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import { AnimateWidth } from './AnimateWidth'

const meta: Meta<typeof AnimateWidth> = {
  title: 'Animate width',
  component: AnimateWidth,
  parameters: {
    rootStyle: {
      flex: 1,
      backgroundColor: 'gray',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
}

export default meta

export const Primary: StoryObj<typeof AnimateWidth> = {
  render: () => {
    return (
      <View style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
        <AnimateWidth initialWidth={50} />
      </View>
    )
  },
}
