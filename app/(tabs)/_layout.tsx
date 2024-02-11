import { MaterialIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => <MaterialIcons name="map" size={24} />,
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => <MaterialIcons name="calculate" size={24} />,
        }}
      />
    </Tabs>
  )
}
