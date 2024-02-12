import { Emote, Round, Statistics } from '@/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import R from 'ramda'
import { EMOTES } from '@/constants/emotes'

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

  const emotesPressed = () => {
    return Object.values(statistics).reduce((acc1, rounds) => {
      return (
        acc1 +
        rounds.reduce((acc2, round) => {
          const roundSum = round.clicks.reduce((acc3, click) => {
            if (click.isMissclick) {
              return acc3
            }

            return acc3 + 1
          }, 0)

          return acc2 + roundSum
        }, 0)
      )
    }, 0)
  }

  const favouriteEmote = (): Emote => {
    const emotes: Record<string, number> = {}

    Object.values(statistics).forEach((rounds) => {
      rounds.forEach((round) => {
        round.clicks.forEach((click) => {
          if (emotes[click.name]) {
            emotes[click.name]++
          } else {
            emotes[click.name] = 1
          }
        })
      })
    })

    const list = Object.entries(emotes)
    list.sort((left, right) => {
      return left[1] - right[1]
    })
    const emote = list[list.length - 1]

    const found = [...EMOTES.BRUG, ...EMOTES.PEPE, ...EMOTES.KNUR].find((e) => e.name === emote![0])
    if (!found) {
      throw new Error(`favourite emote not found`)
    }

    return found
  }

  const missclicks = (): number => {
    let missclicks = 0
    Object.values(statistics).forEach((rounds) => {
      rounds.forEach((round) => {
        round.clicks.forEach((click) => {
          if (click.isMissclick) {
            missclicks++
          }
        })
      })
    })

    return missclicks
  }

  // TODO: WTF, useMemo for statistics and perform calculations once.
  return {
    missclicks,
    favouriteEmote,
    emotesPressed,
    secondsPlayed,
    gamesPlayed,
    isEmpty,
    get,
    saveRound,
  }
}
