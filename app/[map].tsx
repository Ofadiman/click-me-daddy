import { Link, Stack, useLocalSearchParams } from "expo-router";
import {
  Image,
  Pressable,
  ScaledSize,
  View,
  useWindowDimensions,
} from "react-native";
import { Avatar, Button, Card, Modal, Portal, Text } from "react-native-paper";
import { useEffect, useRef, useState } from "react";
import { Emote, emotes } from "@/constants/emotes";
import { faker } from "@faker-js/faker";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

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

type Game = {
  emotes: Emote[];
};

const shuffleEmotes = ({
  emotes,
  dimensions,
  insets,
}: {
  emotes: Emote[];
  dimensions: ScaledSize;
  insets: EdgeInsets;
}): Emote[] => {
  return emotes.map((emote) => {
    const gamote: Emote = {
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
  });
};

export default function MapScreen() {
  const dimensions = useWindowDimensions();
  const localSearchParams = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const [score, setScore] = useState(0);
  const gameRef = useRef<Game>({
    emotes: emotes[localSearchParams.map as keyof typeof emotes],
  });
  const [currentEmote, setCurrentEmote] = useState<string>("");
  const [gameState, setGameState] = useState<GameState>(GameState.Initial);
  const intervalRef = useRef<null | number>(null);
  const [timeLeft, setTimeLeft] = useState(GAME_CONSTANTS.GAME_TIME);

  useEffect(() => {
    if (timeLeft === 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

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

  const handleGameStart = () => {
    setScore(0);
    setGameState(GameState.Playing);
    setTimeLeft(GAME_CONSTANTS.GAME_TIME);
    setCurrentEmote(
      faker.helpers.arrayElement(
        gameRef.current.emotes.map((emote) => emote.name),
      ),
    );

    gameRef.current.emotes = shuffleEmotes({
      emotes: gameRef.current.emotes,
      dimensions,
      insets,
    });

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, ONE_SECOND);
  };

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
          <Button onPress={handleGameStart} mode="contained">
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

      <Portal>
        <Modal dismissable={false} visible={gameState === GameState.Finished}>
          <Card
            style={{
              alignSelf: "center",
              width: "80%",
            }}
          >
            <Card.Content>
              {/* TODO: Replace LUL text to actual emote */}
              <Text variant="titleLarge">You lost LUL</Text>
              <Text variant="bodyMedium">Your score: {score}</Text>
            </Card.Content>
            <Card.Actions>
              <Link href="/" asChild>
                <Button onPress={handleGameStart}>Maps</Button>
              </Link>
              <Button onPress={handleGameStart}>Play again</Button>
            </Card.Actions>
          </Card>
        </Modal>
      </Portal>
    </View>
  );
}
