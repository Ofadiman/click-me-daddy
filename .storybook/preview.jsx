import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

/** @type{import("@storybook/react").Preview} */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [
    (Story, { parameters }) => {
      const style = parameters.rootStyle ?? {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }

      return (
        <SafeAreaProvider style={style}>
          <Story />
        </SafeAreaProvider>
      )
    },
  ],
}

export default preview
