import { Stack } from 'expo-router'
import { PaperProvider } from 'react-native-paper'
import { view } from '../.storybook/storybook.requires'
import AsyncStorage from '@react-native-async-storage/async-storage'

function Layout() {
  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen name="index" redirect />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="[map]" />
      </Stack>
    </PaperProvider>
  )
}

let EntryPoint = Layout

const storybookEnabled = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true'
if (storybookEnabled) {
  const StorybookUIRoot = view.getStorybookUI({
    storage: {
      getItem: AsyncStorage.getItem,
      setItem: AsyncStorage.setItem,
    },
  })
  EntryPoint = StorybookUIRoot
}

export default EntryPoint
