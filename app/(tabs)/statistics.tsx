import { useStatistics } from '@/utils/useStatistics'
import { Image } from 'expo-image'
import { Tabs } from 'expo-router'
import { Fragment } from 'react'
import { ScrollView, View } from 'react-native'
import { Text } from 'react-native-paper'
import { Shadow } from 'react-native-shadow-2'

const Card = (props: {
  image: { uri: string; width: number; height: number; isAnimated: boolean }
  title: string
}) => {
  return (
    <Shadow distance={4} stretch={true}>
      <View
        style={{
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
        }}
      >
        <Image
          source={{
            width: props.image.width,
            height: props.image.height,
            uri: props.image.uri,
            isAnimated: props.image.isAnimated,
          }}
          style={{
            width: props.image.width,
            height: props.image.height,
          }}
        />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingRight: 10,
          }}
        >
          <Text style={{ fontSize: 20, textAlign: 'center' }}>{props.title}</Text>
        </View>
        <Image
          source={{
            width: props.image.width,
            height: props.image.height,
            uri: props.image.uri,
            isAnimated: props.image.isAnimated,
          }}
          style={{
            width: props.image.width,
            height: props.image.height,
          }}
        />
      </View>
    </Shadow>
  )
}

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
        <ScrollView contentContainerStyle={{ padding: 10, gap: 10 }}>
          <Card
            title={`Zagraueś ${statistics.gamesPlayed()} ${statistics.gamesPlayed() === 1 ? 'raz' : 'razy'}`}
            image={{
              height: 64,
              width: 64,
              uri: 'https://cdn.7tv.app/emote/61c6cbd812987d64d6ae7d4b/4x.webp',
              isAnimated: false,
            }}
          />
          <Card
            title={`Zmarnowaueś ${statistics.secondsPlayed()} sekund rzycia w tej grze`}
            image={{
              height: 64,
              width: 70,
              uri: 'https://cdn.7tv.app/emote/621c1d047f7ec26e095e1b41/4x.webp',
              isAnimated: true,
            }}
          />
          <Card
            title={`Pomyślnie dotknołeś ${statistics.emotesPressed()} emotek`}
            image={{
              height: 64,
              width: 64,
              isAnimated: true,
              uri: 'https://cdn.7tv.app/emote/60e2fd9378cfe95e2d76eb34/4x.webp',
            }}
          />
          <Card
            title={`Tfoja ulubiona emotka to ${statistics.favouriteEmote().name}`}
            image={{
              height: Math.round(statistics.favouriteEmote().height / 2),
              width: Math.round(statistics.favouriteEmote().width / 2),
              isAnimated: statistics.favouriteEmote().isAnimated,
              uri: statistics.favouriteEmote().uri,
            }}
          />
          <Card
            title="Zajebaueś missklika 69 razy"
            image={{
              height: 64,
              width: 64,
              isAnimated: true,
              uri: 'https://cdn.7tv.app/emote/60afbd30a3648f409a5d34a5/4x.webp',
            }}
          />
        </ScrollView>
      )}
    </Fragment>
  )
}
