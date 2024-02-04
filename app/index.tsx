import { emotes } from "@/constants/emotes";
import { faker } from "@faker-js/faker";
import { Image } from "expo-image";
import { Link, Stack } from "expo-router";
import { FlatList, Pressable, View } from "react-native";
import { Text } from "react-native-paper";

faker.seed(1);

const maps = Object.keys(emotes).sort();

export default function IndexScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Choose your poison",
        }}
      ></Stack.Screen>
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
                pathname: "/[map]",
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
                  flexDirection: "row",
                }}
              >
                <Image
                  source={{
                    uri: "https://cdn.7tv.app/emote/61fabc30b687024c3843b52d/4x.webp",
                    isAnimated: false,
                  }}
                  style={{
                    height: 128,
                    width: 188,
                  }}
                />
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <Text>{item}</Text>
                  <Text>{faker.company.catchPhrase()}</Text>
                </View>
              </Pressable>
            </Link>
          );
        }}
      ></FlatList>
    </>
  );
}
