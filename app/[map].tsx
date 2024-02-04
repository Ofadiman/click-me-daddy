import { Stack, useLocalSearchParams } from "expo-router";
import { Pressable, View, useWindowDimensions } from "react-native";
import { Button, Text } from "react-native-paper";
import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";
import { Emote, emotes } from "@/constants/emotes";
import { faker } from "@faker-js/faker";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BUTTON_TOKENS = ["!", "@", "#", "$", "%", "^", "&", "*"];

export const ONE_SECOND = 1000;
export const GAME_CONSTANTS = {
  GAME_TIME: 3,
};

enum GameState {
  Initial = "initial",
  Playing = "playing",
  Finished = "finished",
}

type GameEmote = Emote & {
  position: {
    x: number;
    y: number;
  };
};

type Game = {
  isPlaying: boolean;
  points: number;
  emotes: GameEmote[];
};

export default function MapScreen() {
  const dimensions = useWindowDimensions();
  const localSearchParams = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const gameRef = useRef<Game>({
    isPlaying: true,
    points: 0,
    emotes: emotes[localSearchParams.map as keyof typeof emotes].map(
      (emote) => {
        const gamote: GameEmote = {
          ...emote,
          position: {
            x: faker.number.int({
              min: 0,
              max: dimensions.width - emote.size.width / 2,
            }),
            y: faker.number.int({
              min: 0 + insets.top,
              max: dimensions.height - emote.size.height / 2,
            }),
          },
        };

        return gamote;
      },
    ),
  });
  const [currentEmote, setCurrentEmote] = useState<string>(
    faker.helpers.arrayElement(
      gameRef.current.emotes.map((emote) => emote.name),
    ),
  );
  const [gameState, setGameState] = useState<GameState>(GameState.Initial);
  const intervalRef = useRef<null | number>(null);
  const [timeLeft, setTimeLeft] = useState(GAME_CONSTANTS.GAME_TIME);

  useEffect(() => {
    if (timeLeft === 0) {
      console.log(`intervalRef.current: ${intervalRef.current}`);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      setTimeLeft(GAME_CONSTANTS.GAME_TIME);
      setGameState(GameState.Finished);
    }
  }, [timeLeft]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  if (gameState === GameState.Initial) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button
          onPress={() => {
            setGameState(GameState.Playing);

            intervalRef.current = setInterval(() => {
              setTimeLeft((prev) => prev - 1);
            }, ONE_SECOND);
          }}
          mode="contained"
        >
          LETS GO{" "}
          {Array.from({ length: 10 })
            .map(() => faker.helpers.arrayElement(BUTTON_TOKENS))
            .join("")}
        </Button>
      </View>
    );
  }

  if (gameState === GameState.Finished) {
    // TODO: Handle game finished state
    return <Text>game ended</Text>;
  }

  return (
    <>
      <Stack.Screen
        options={{ headerTitle: `Map: ${localSearchParams.map as string}` }}
      />
      <Text>Time left: {timeLeft}</Text>
      <Text>
        emote: {currentEmote}, points: {gameRef.current.points}
      </Text>
      <View style={{ position: "relative", height: 500 }}>
        {gameRef.current.emotes.map((emote) => {
          return (
            <Pressable
              onPress={() => {
                if (emote.name === currentEmote) {
                  gameRef.current.points++;
                  setCurrentEmote(
                    faker.helpers.arrayElement(
                      gameRef.current.emotes.map((emote) => emote.name),
                    ),
                  );
                }
              }}
              key={emote.name}
              style={{
                left: emote.position.x,
                top: emote.position.y,
                position: "absolute",
              }}
            >
              <Image
                source={{
                  uri: emote.uri,
                  isAnimated: emote.isAnimated,
                }}
                style={{
                  height: emote.size.height / 2,
                  width: emote.size.width / 2,
                }}
              />
            </Pressable>
          );
        })}
      </View>
    </>
  );
}
