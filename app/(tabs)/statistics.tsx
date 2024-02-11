import { useStatistics } from '@/utils/useStatistics'
import { Tabs } from 'expo-router'
import { Fragment } from 'react'
import { ScrollView } from 'react-native'
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

      <ScrollView>
        <Text>{JSON.stringify(statistics.get(), null, 2)}</Text>
      </ScrollView>
    </Fragment>
  )
}
