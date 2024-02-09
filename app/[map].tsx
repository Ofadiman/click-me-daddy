import { Link, Stack, useLocalSearchParams } from "expo-router";
import {
  Image,
  LayoutRectangle,
  Pressable,
  View,
  useWindowDimensions,
} from "react-native";
import { Avatar, Button, Card, Modal, Portal, Text } from "react-native-paper";
import { Fragment, useEffect, useRef, useState } from "react";
import { emotes } from "@/constants/emotes";
import { faker } from "@faker-js/faker";
import { useSong } from "@/utils/useSong";
import { shuffleEmotes } from "@/utils/shuffleEmotes";
import { Emote } from "@/types";

const BUTTON_TOKENS = ["!", "@", "#", "$", "%", "^", "&", "*"];

const TIMER_WIDTH = 64;
const TIMER_HEIGHT = 64;
const TIMER_OFFSET_BOTTOM = 20;
const TIMER_OFFSET_RIGHT = 20;

const ONE_SECOND = 1000;
const GAME_TIME_IN_SECONDS = 10;

enum GameState {
  Initial = "initial",
  Playing = "playing",
  Finished = "finished",
}

type Game = {
  emotes: Emote[];
};

export default function MapScreen() {
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);
  const localSearchParams = useLocalSearchParams();
  const dimensions = useWindowDimensions();

  const song = useSong();
  const [score, setScore] = useState(0);
  const emoteSetRef = useRef(
    emotes[localSearchParams.map as keyof typeof emotes],
  );
  const gameRef = useRef<Game>({
    emotes: emotes[localSearchParams.map as keyof typeof emotes],
  });
  const [currentEmote, setCurrentEmote] = useState<string>("");
  const [gameState, setGameState] = useState<GameState>(GameState.Initial);
  const intervalRef = useRef<null | NodeJS.Timeout>(null);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME_IN_SECONDS);

  useEffect(() => {
    (async () => {
      if (timeLeft === 0) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }

        setGameState(GameState.Finished);
        await song.stop();
      }
    })();
  }, [timeLeft]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleGameStart = async () => {
    if (layout === null) {
      throw new Error(`layout cannot be set to null when game starts`);
    }

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
    });

    await song.next();
    setGameState(GameState.Playing);
    setScore(0);
    setTimeLeft(GAME_TIME_IN_SECONDS);
    setCurrentEmote(
      faker.helpers.arrayElement(
        gameRef.current.emotes.map((emote) => emote.name),
      ),
    );

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
          onLayout={(event) => {
            setLayout(event.nativeEvent.layout);
          }}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Button
            onPress={() => {
              handleGameStart();
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
    <Fragment>
      <Stack.Screen
        options={{
          title: `Score: ${score}`,
        }}
      />

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text variant="headlineMedium">{currentEmote}</Text>
      </View>

      <View style={{ position: "relative", flex: 1 }}>
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
                left: emote.x,
                top: emote.y,
                position: "absolute",
              }}
            >
              <Image
                source={{
                  uri: emote.uri,
                }}
                style={{
                  height: emote.height,
                  width: emote.width,
                }}
              />
            </Pressable>
          );
        })}

        <Avatar.Text
          label={`${timeLeft}`}
          style={{
            position: "absolute",
            right: TIMER_OFFSET_RIGHT,
            bottom: TIMER_OFFSET_BOTTOM,
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
                  <Button>Maps</Button>
                </Link>
                <Button
                  onPress={() => {
                    handleGameStart();
                  }}
                >
                  Play again
                </Button>
              </Card.Actions>
            </Card>
          </Modal>
        </Portal>
      </View>
    </Fragment>
  );
}
