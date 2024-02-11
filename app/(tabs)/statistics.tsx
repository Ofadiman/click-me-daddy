import { useStatistics } from '@/utils/useStatistics'
import { Tabs } from 'expo-router'
import { Fragment } from 'react'
import { ScrollView, View } from 'react-native'
import { Text } from 'react-native-paper'

export default function StatisticsScreen() {
  const statistics = useStatistics()

  return (
    <Fragment>
      <Tabs.Screen
        options={{
          headerTitle: 'Tfoje podboje',
        }}
      />

      {statistics.isEmpty() ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: '15%',
          }}
        >
          <Text style={{ textAlign: 'center', fontSize: 30 }}>
            Zagraj kilka mapek kolego to pojawiom się tutaj statystyki
          </Text>
        </View>
      ) : (
        <ScrollView>
          <Text>{JSON.stringify(statistics.get(), null, 2)}</Text>
        </ScrollView>
      )}
    </Fragment>
  )
}
