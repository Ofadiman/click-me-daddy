import { emotes } from "@/constants/emotes";
import { faker } from "@faker-js/faker";
import { Audio } from "expo-av";
import { SoundObject } from "expo-av/build/Audio";
import { Link, Stack } from "expo-router";
import { Button, FlatList, Image, Pressable, Text, View } from "react-native";

faker.seed(1);

const maps = Object.keys(emotes).sort();

let soundObject: SoundObject | null;

export default function IndexScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Choose your poison",
        }}
      ></Stack.Screen>

      <Button
        title="Play"
        onPress={async () => {
          try {
            soundObject = await Audio.Sound.createAsync(
              require("../assets/music/firma_reprezentuje_jp.mp3"),
            );
            await soundObject.sound.playAsync();
          } catch (e) {
            console.error(`fucking not working`);
            console.error(e);
          }
        }}
      />
      <Button
        title="Pause"
        onPress={async () => {
          await soundObject?.sound.pauseAsync();
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
