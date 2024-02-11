import { Stack } from 'expo-router'
import { PaperProvider } from 'react-native-paper'

export default function Layout() {
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
