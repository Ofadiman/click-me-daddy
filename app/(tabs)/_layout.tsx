import { MaterialIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { TouchableOpacity } from 'react-native'

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          tabBarShowLabel: false,
          tabBarButton: (props) => <TouchableOpacity {...props} />,
          tabBarIcon: () => <MaterialIcons name="map" size={24} />,
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          tabBarShowLabel: false,
          tabBarButton: (props) => <TouchableOpacity {...props} />,
          tabBarIcon: () => <MaterialIcons name="calculate" size={24} />,
        }}
      />
    </Tabs>
  )
}
