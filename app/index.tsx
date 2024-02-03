import { Link } from "expo-router";
import { Text } from "react-native-paper";
import { Button } from "react-native-paper";

export default function IndexScreen() {
  return (
    <>
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
