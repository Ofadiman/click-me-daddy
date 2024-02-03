import { Link, useLocalSearchParams } from "expo-router";
import { Button, Text } from "react-native-paper";

export default function MapScreen() {
  const localSearchParams = useLocalSearchParams();

  return (
    <>
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
