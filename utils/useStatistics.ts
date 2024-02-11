import { Round, Statistics } from '@/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { clone } from 'ramda'
import { useEffect, useState } from 'react'

const ASYNC_STORAGE_STATISTICS_KEY = 'statistics'

export const useStatistics = () => {
  const [statistics, setStatistics] = useState<Statistics>({})

  useEffect(() => {
    // TODO: Handle error.
    AsyncStorage.getItem(ASYNC_STORAGE_STATISTICS_KEY).then((value) => {
      if (value === null) {
        console.log(`statistics are null, returning`)
        return
      }

      // TODO: Handle error.
      const parsed = JSON.parse(value) as Statistics
      setStatistics(parsed)
    })
  }, [])

  const saveRound = async (args: { map: string; round: Round }) => {
    const newStatistics = clone(statistics)

    const map = newStatistics[args.map]
    const mapAlreadyPlayed = map !== undefined
    if (mapAlreadyPlayed) {
      map.push(args.round)
    } else {
      newStatistics[args.map] = [args.round]
    }

    await AsyncStorage.setItem(ASYNC_STORAGE_STATISTICS_KEY, JSON.stringify(statistics))
    setStatistics(newStatistics)
    console.log(`round saved`)
  }

  const get = () => {
    return statistics
  }

  return {
    get,
    saveRound,
  }
}
