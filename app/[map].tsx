import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import { Pressable, View, useWindowDimensions } from "react-native";
import { Avatar, Button, Text } from "react-native-paper";
import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";
import { Emote, emotes } from "@/constants/emotes";
import { faker } from "@faker-js/faker";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BUTTON_TOKENS = ["!", "@", "#", "$", "%", "^", "&", "*"];

export const ONE_SECOND = 1000;
export const GAME_CONSTANTS = {
  GAME_TIME: 30,
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
  emotes: GameEmote[];
};

export default function MapScreen() {
  const [score, setScore] = useState(0);
  const dimensions = useWindowDimensions();
  const localSearchParams = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const gameRef = useRef<Game>({
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

  if (gameState === GameState.Finished) {
    return (
      <View style={{ position: "relative", flex: 1, backgroundColor: "blue" }}>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            alignItems: "center",
            backgroundColor: "yellow",
          }}
        >
          <Text style={{ backgroundColor: "red" }}>game ended</Text>
        </View>
      </View>
    );
  }

  if (gameState === GameState.Initial) {
    return (
      <>
        <Stack.Screen
          options={{
            title: `Waste time clicking on ${localSearchParams.map}`,
          }}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
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
      </>
    );
  }

  return (
    <View style={{ position: "relative", flex: 1 }}>
      <Stack.Screen
        options={{
          title: `Score: ${score}`,
        }}
      />
      {gameRef.current.emotes.map((emote) => {
        return (
          <Pressable
            onPress={() => {
              if (emote.name === currentEmote) {
                setScore((prev) => prev + 1);
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

      <View
        style={{
          position: "absolute",
          top: 10,
          left: 0,
          right: 0,
          alignItems: "center",
        }}
      >
        <Text variant="headlineMedium">{currentEmote}</Text>
      </View>

      <Avatar.Text
        label={`${timeLeft}`}
        style={{
          position: "absolute",
          right: 20,
          bottom: 20,
        }}
      />
    </View>
  );
}
