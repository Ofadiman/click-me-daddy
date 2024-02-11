import { faker } from '@faker-js/faker'
import { SoundObject } from 'expo-av/build/Audio'
import { Audio } from 'expo-av'
import { useEffect, useRef } from 'react'

const songs = faker.helpers.shuffle([
  require('../assets/music/dawid_jasper_zwariowana_noc.mp3'),
  require('../assets/music/figo_samogony_erotyczne_pif_paf.mp3'),
  require('../assets/music/firma_reprezentuje_jp.mp3'),
])

let index = 0

export const useSong = () => {
  const soundObjectRef = useRef<SoundObject | null>(null)

  useEffect(() => {
    return () => {
      void (async () => {
        if (soundObjectRef.current) {
          await soundObjectRef.current.sound.stopAsync()
          await soundObjectRef.current.sound.unloadAsync()
        }
      })()
    }
  }, [])

  const next = async () => {
    if (soundObjectRef.current) {
      soundObjectRef.current.sound.unloadAsync()
    }

    soundObjectRef.current = await Audio.Sound.createAsync(songs[index % songs.length])
    index++
    await soundObjectRef.current.sound.playAsync()
  }

  const stop = async () => {
    if (soundObjectRef.current) {
      await soundObjectRef.current.sound.stopAsync()
    }
  }

  return {
    next,
    stop,
  }
}
