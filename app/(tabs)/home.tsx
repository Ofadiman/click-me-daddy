import { EMOTES } from '@/constants/emotes'
import { faker } from '@faker-js/faker'
import { Link, Tabs } from 'expo-router'
import { Image } from 'expo-image'
import { FlatList, Pressable, Text, View } from 'react-native'

faker.seed(1)

const maps = Object.keys(EMOTES).sort()

export default function IndexScreen() {
  return (
    <>
      <Tabs.Screen
        options={{
          headerTitle: 'Wybiesz mape pszyjacielu',
        }}
      />

      <FlatList
        keyExtractor={(item) => item}
        data={maps}
        style={{
          padding: 10,
        }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => {
          return (
            <Link
              key={item}
              href={{
                pathname: '/[map]',
                params: {
                  map: item,
                },
              }}
              style={{
                flex: 1,
              }}
              asChild
            >
              <Pressable
                style={{
                  flexDirection: 'row',
                }}
              >
                <Image
                  source={{
                    uri: 'https://cdn.7tv.app/emote/61fabc30b687024c3843b52d/4x.webp',
                  }}
                  style={{
                    height: 128,
                    width: 188,
                  }}
                />
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                  }}
                >
                  <Text>{item}</Text>
                  <Text>{faker.company.catchPhrase()}</Text>
                </View>
              </Pressable>
            </Link>
          )
        }}
      ></FlatList>
    </>
  )
}
