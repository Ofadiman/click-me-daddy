import { Link, Stack, useLocalSearchParams } from "expo-router";
import { Button, Text } from "react-native-paper";

export default function MapScreen() {
  const localSearchParams = useLocalSearchParams();

  return (
    <>
      <Stack.Screen
        options={{ headerTitle: `Map: ${localSearchParams.map as string}` }}
      />
      <Text>{JSON.stringify(localSearchParams)}</Text>
      <Link
        href={{
          pathname: "/",
        }}
        asChild
      >
        <Button>Index Screen</Button>
      </Link>
    </>
  );
}
