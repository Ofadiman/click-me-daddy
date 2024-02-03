import { Link, Stack } from "expo-router";
import { Text } from "react-native-paper";
import { Button } from "react-native-paper";

export default function IndexScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Pick a map",
        }}
      ></Stack.Screen>
      <Text>Index Screen</Text>
      <Link
        href={{
          pathname: "/[map]",
          params: {
            map: "brug",
          },
        }}
        asChild
      >
        <Button>Brug</Button>
      </Link>
      <Link
        href={{
          pathname: "/[map]",
          params: {
            map: "pepe",
          },
        }}
        asChild
      >
        <Button>pepe</Button>
      </Link>
    </>
  );
}
