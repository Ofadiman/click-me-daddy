import { Round, RoundEmote } from '@/types'
import { useRef } from 'react'

export const useRound = () => {
  const roundRef = useRef<Round>({
    time: 0,
    clicks: [],
    timestamp: new Date().toISOString(),
  })

  const recordEmotePress = (emote: RoundEmote) => {
    roundRef.current.clicks.push(emote)
  }

  const incrementTime = () => {
    roundRef.current.time++
  }

  const state = () => {
    return roundRef.current
  }

  const score = () => {
    return roundRef.current.clicks.filter((click) => click.isMissclick === false).length
  }

  return {
    new: () => {
      roundRef.current = {
        time: 0,
        clicks: [],
        timestamp: new Date().toISOString(),
      }
    },
    score,
    state,
    recordEmotePress,
    incrementTime,
  }
}
