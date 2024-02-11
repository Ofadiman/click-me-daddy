import { EMOTES } from '@/constants/emotes'
import { faker } from '@faker-js/faker'
import { Link, Tabs } from 'expo-router'
import { Image } from 'expo-image'
import { FlatList, Text, View, useWindowDimensions } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import { Fragment } from 'react'

faker.seed(1)

const FLAT_LIST_PADDING = 10
const FLAT_LIST_ITEM_HEIGHT = 150

const MAP_TEASER_TEXT: Record<keyof typeof EMOTES, string> = {
  BRUG: 'Niech Brug bendzie z tobom',
  KNUR: 'Przyknurzymy coś?',
  PEPE: 'Co Ty kurwa wiesz o pepegowaniu?',
}

export default function IndexScreen() {
  const dimensions = useWindowDimensions()

  return (
    <>
      <Tabs.Screen
        options={{
          headerTitle: 'Wybiesz mape pszyjacielu',
        }}
      />

      <FlatList
        keyExtractor={([map]) => map}
        data={Object.entries(EMOTES)}
        style={{
          padding: FLAT_LIST_PADDING,
        }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item: [map, emotes] }) => {
          return (
            <Link
              key={map}
              href={{
                pathname: '/[map]',
                params: {
                  map: map,
                },
              }}
              asChild
            >
              <TouchableRipple
                style={{
                  backgroundColor: 'gray',
                  height: FLAT_LIST_ITEM_HEIGHT,
                  borderRadius: 10,
                  flexDirection: 'row',
                  position: 'relative',
                  overflow: 'hidden',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Fragment>
                  {emotes.map((emote) => {
                    const emoteWidth = Math.round(emote.width / 2)
                    const emoteHeight = Math.round(emote.height / 2)
                    return (
                      <Image
                        key={emote.name}
                        style={{
                          position: 'absolute',
                          height: emoteHeight,
                          width: emoteWidth,
                          left: faker.number.int({
                            min: 0,
                            max: dimensions.width - FLAT_LIST_PADDING * 2 - emoteWidth,
                          }),
                          top: faker.number.int({
                            min: 0,
                            max: FLAT_LIST_ITEM_HEIGHT - emoteHeight,
                          }),
                        }}
                        source={{
                          uri: emote.uri,
                          isAnimated: emote.isAnimated,
                          height: emoteHeight,
                          width: emoteWidth,
                        }}
                      />
                    )
                  })}
                  <Text
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      color: 'white',
                      flex: 1,
                      height: '100%',
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    {MAP_TEASER_TEXT[map]}
                  </Text>
                </Fragment>
              </TouchableRipple>
            </Link>
          )
        }}
      ></FlatList>
    </>
  )
}
