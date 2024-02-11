import { Round, Statistics } from '@/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import R from 'ramda'

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
    const newStatistics = R.clone(statistics)

    const map = newStatistics[args.map]
    const mapAlreadyPlayed = map !== undefined
    if (mapAlreadyPlayed) {
      map.push(args.round)
    } else {
      newStatistics[args.map] = [args.round]
    }

    await AsyncStorage.setItem(ASYNC_STORAGE_STATISTICS_KEY, JSON.stringify(newStatistics))
    setStatistics(newStatistics)
  }

  const get = () => {
    return statistics
  }

  const gamesPlayed = () => {
    return Object.values(statistics).reduce((acc, current) => {
      return acc + current.length
    }, 0)
  }

  const secondsPlayed = () => {
    return Object.values(statistics).reduce((acc, map) => {
      const time = map.reduce((roundsAccumulator, round) => {
        return roundsAccumulator + round.time
      }, 0)

      return acc + time
    }, 0)
  }

  const isEmpty = () => {
    return R.isEmpty(statistics)
  }
  return {
    secondsPlayed,
    gamesPlayed,
    isEmpty,
    get,
    saveRound,
  }
}
