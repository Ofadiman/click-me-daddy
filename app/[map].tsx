import { Link, Stack, useLocalSearchParams } from 'expo-router'
import {
  LayoutRectangle,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native'
import { Avatar, Button, Card, Modal, Portal, Text } from 'react-native-paper'
import { Image, ImageStyle } from 'expo-image'
import { Fragment, useEffect, useRef, useState } from 'react'
import { EMOTES } from '@/constants/emotes'
import { faker } from '@faker-js/faker'
import { useSong } from '@/utils/useSong'
import { shuffleEmotes } from '@/utils/shuffleEmotes'
import { Emote } from '@/types'
import { useRound } from '@/utils/useRound'
import { useStatistics } from '@/utils/useStatistics'
import { MaterialIcons } from '@expo/vector-icons'
import R from 'ramda'
import { Rotate } from '@/components/Rotate/Rotate'
import { Flip } from '@/components/Flip/Flip'
import { Audio } from 'expo-av'
import { SoundObject } from 'expo-av/build/Audio'

const INITIAL_SCREEN_TITLES: Record<keyof typeof EMOTES, string> = {
  BRUG: 'Czar... ujący menszczyzna here',
  KNUR: 'Ale Knura to Ty szanój',
  PEPE: 'Po prostu rzaba',
}

const TIMER_WIDTH = 64
const TIMER_HEIGHT = 64
const TIMER_OFFSET_BOTTOM = 20
const TIMER_OFFSET_RIGHT = 20

const ONE_SECOND = 1000
const GAME_TIME_IN_SECONDS = 10

enum GameState {
  Initial = 'initial',
  Playing = 'playing',
  Finished = 'finished',
}

type Game = {
  emotes: Emote[]
}

const BackToHome = () => {
  return (
    <Link href="/(tabs)/home" style={{ padding: 10, paddingLeft: 0 }} asChild>
      <TouchableOpacity>
        <MaterialIcons name="arrow-back" size={24} />
      </TouchableOpacity>
    </Link>
  )
}

export default function MapScreen() {
  const round = useRound()
  const statistics = useStatistics()
  const [layout, setLayout] = useState<LayoutRectangle | null>(null)
  const localSearchParams = useLocalSearchParams()
  const dimensions = useWindowDimensions()

  const uwuRef = useRef<SoundObject | null>(null)
  const song = useSong()
  const emoteSetRef = useRef(EMOTES[localSearchParams.map as keyof typeof EMOTES])
  const gameRef = useRef<Game>({
    emotes: EMOTES[localSearchParams.map as keyof typeof EMOTES],
  })
  const [currentEmote, setCurrentEmote] = useState<string>('')
  const [gameState, setGameState] = useState<GameState>(GameState.Initial)
  const intervalRef = useRef<null | NodeJS.Timeout>(null)
  const [timeLeft, setTimeLeft] = useState(GAME_TIME_IN_SECONDS)

  useEffect(() => {
    Audio.Sound.createAsync(require('../assets/music/uwu.mp3'))
      .then((sound) => {
        uwuRef.current = sound
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  useEffect(() => {
    void (async () => {
      if (timeLeft === 0) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }

        setGameState(GameState.Finished)
        await song.stop()
        await statistics.saveRound({
          round: round.state(),
          // TODO: Handle correct map typings here.
          map: localSearchParams.map as any,
        })
      }
    })()
  }, [timeLeft])

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      // TODO: Reset round to default state to prevent issues while loading the screen for the second time.
    }
  }, [])

  const handleGameStart = async () => {
    if (layout === null) {
      throw new Error(`layout cannot be set to null when game starts`)
    }

    round.new()
    gameRef.current.emotes = shuffleEmotes({
      emotes: emoteSetRef.current,
      layout: layout,
      obstacles: [
        {
          x: layout.width - TIMER_WIDTH - TIMER_OFFSET_RIGHT,
          y: layout.height - TIMER_HEIGHT - TIMER_OFFSET_BOTTOM,
          width: TIMER_WIDTH,
          height: TIMER_HEIGHT,
        },
      ],
      dimensions,
    })

    await song.next()
    setGameState(GameState.Playing)
    setTimeLeft(GAME_TIME_IN_SECONDS)
    setCurrentEmote(faker.helpers.arrayElement(gameRef.current.emotes.map((emote) => emote.name)))

    intervalRef.current = setInterval(() => {
      round.incrementTime()
      setTimeLeft((prev) => prev - 1)
    }, ONE_SECOND)
  }

  if (gameState === GameState.Initial) {
    return (
      <Fragment>
        <Stack.Screen
          options={{
            headerTitle: INITIAL_SCREEN_TITLES[localSearchParams.map as keyof typeof EMOTES],
            headerLeft: BackToHome,
          }}
        />

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text variant="headlineMedium" style={{ color: 'transparent' }}>
            {currentEmote}
          </Text>
        </View>

        <View
          onLayout={async (event) => {
            setLayout(event.nativeEvent.layout)
          }}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Button
            onPress={() => {
              handleGameStart()
            }}
            mode="contained"
            contentStyle={{
              height: 50,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Image
                source={{
                  uri: 'https://cdn.7tv.app/emote/648ce03eb3fdb6379f1dff8e/4x.webp',
                  width: 24,
                  height: 24,
                  isAnimated: false,
                }}
                style={{ width: 24, height: 24 }}
              />
              <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>JAZDA</Text>
              <Image
                source={{
                  uri: 'https://cdn.7tv.app/emote/648ce03eb3fdb6379f1dff8e/4x.webp',
                  width: 24,
                  height: 24,
                  isAnimated: false,
                }}
                style={{ width: 24, height: 24, transform: [{ rotateY: '180deg' }] }}
              />
            </View>
          </Button>
        </View>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Stack.Screen
        options={{
          title: `Score: ${round.score()}`,
          headerLeft: BackToHome,
        }}
      />

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text variant="headlineMedium">{currentEmote}</Text>
      </View>

      <View style={{ position: 'relative', flex: 1 }}>
        {gameRef.current.emotes.map((emote, index) => {
          const handlePress = async () => {
            if (emote.name === currentEmote) {
              const updated = R.mergeAll([R.clone(emote), { isMissclick: false }])
              round.recordEmotePress(updated)
              setCurrentEmote(
                faker.helpers.arrayElement(gameRef.current.emotes.map((emote) => emote.name)),
              )
              if (uwuRef.current) {
                await uwuRef.current.sound.replayAsync()
              }
            } else {
              const updated = R.mergeAll([R.clone(emote), { isMissclick: true }])
              round.recordEmotePress(updated)
            }
          }
          const rootStyle: StyleProp<ViewStyle> = {
            left: emote.x,
            top: emote.y,
            position: 'absolute',
          }
          const imageStyle: StyleProp<ImageStyle> = {
            height: emote.height,
            width: emote.width,
          }

          const mod = index % 3
          if (mod === 0) {
            return (
              <Rotate
                key={emote.name}
                shouldAnimate={
                  timeLeft > 0 &&
                  timeLeft < GAME_TIME_IN_SECONDS - Math.round(GAME_TIME_IN_SECONDS / 3)
                }
                animationDuration={3_000}
                style={rootStyle}
              >
                <TouchableOpacity onPress={handlePress}>
                  <Image
                    source={{
                      uri: emote.uri,
                    }}
                    style={imageStyle}
                  />
                </TouchableOpacity>
              </Rotate>
            )
          }

          if (mod === 1) {
            return (
              <Flip
                key={emote.name}
                shouldAnimate={
                  timeLeft > 0 &&
                  timeLeft < GAME_TIME_IN_SECONDS - Math.round(GAME_TIME_IN_SECONDS / 3) * 2
                }
                animationDuration={3_000}
                style={rootStyle}
              >
                <TouchableOpacity onPress={handlePress}>
                  <Image
                    source={{
                      uri: emote.uri,
                    }}
                    style={imageStyle}
                  />
                </TouchableOpacity>
              </Flip>
            )
          }

          return (
            <TouchableOpacity key={emote.name} style={rootStyle} onPress={handlePress}>
              <Image
                source={{
                  uri: emote.uri,
                }}
                style={imageStyle}
              />
            </TouchableOpacity>
          )
        })}

        <Avatar.Text
          label={`${timeLeft}`}
          style={{
            position: 'absolute',
            right: TIMER_OFFSET_RIGHT,
            bottom: TIMER_OFFSET_BOTTOM,
          }}
        />

        <Portal>
          <Modal dismissable={false} visible={gameState === GameState.Finished}>
            <Card
              style={{
                alignSelf: 'center',
                width: '80%',
              }}
            >
              <Card.Content>
                {/* TODO: Replace LUL text to actual emote */}
                <Text variant="titleLarge">Przegrałeś Kappa</Text>
                <Text variant="bodyMedium">Punkty: {round.score()}</Text>
              </Card.Content>
              <Card.Actions>
                <Link href="/(tabs)/home" asChild>
                  <Button>Mapki</Button>
                </Link>
                <Button
                  onPress={() => {
                    handleGameStart()
                  }}
                >
                  Zagraj znowu
                </Button>
              </Card.Actions>
            </Card>
          </Modal>
        </Portal>
      </View>
    </Fragment>
  )
}
