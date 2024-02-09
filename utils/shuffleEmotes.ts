import { Emote } from "@/constants/emotes";
import { faker } from "@faker-js/faker";
import { clone } from "ramda";
import { LayoutRectangle, ScaledSize } from "react-native";

// TODO: Create universal type to represent an object on gird (e.g. Rectangle).
type Overlappable = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const isOverlapping = (first: Overlappable, second: Overlappable): boolean => {
  if (first.x > second.x + second.width || second.x > first.x + first.width) {
    return false;
  }

  if (first.y > second.y + second.height || second.y > first.y + first.height) {
    return false;
  }

  return true;
};

const EMOTE_PADDING = 5;

export const shuffleEmotes = ({
  emotes,
  layout,
  obstacles,
  dimensions,
}: {
  emotes: Emote[];
  layout: LayoutRectangle;
  obstacles: Array<{ x: number; y: number; width: number; height: number }>;
  dimensions: ScaledSize;
}): Emote[] => {
  const scale = (value: number) => {
    return Math.round(value / 2);
  };

  const randomizedEmotes: Emote[] = [];

  for (let i = 0; i < emotes.length; i++) {
    const emote = emotes[i];
    if (!emote) {
      throw new Error(`emote is undefined`);
    }

    let isEmoteOverlappingWithShuffledEmotes = true;
    while (isEmoteOverlappingWithShuffledEmotes) {
      isEmoteOverlappingWithShuffledEmotes = false;
      const x = faker.number.int({
        min: 0 + EMOTE_PADDING,
        max:
          Math.round(layout.width) -
          scale(emote.size.width) -
          EMOTE_PADDING * dimensions.scale,
      });
      const y = faker.number.int({
        min: 0 + EMOTE_PADDING,
        max:
          Math.round(layout.height) -
          scale(emote.size.height) -
          EMOTE_PADDING * dimensions.scale,
      });

      randomizedEmotes.forEach((randomizedEmote) => {
        if (
          isOverlapping(
            {
              x,
              y,
              width: scale(emote.size.width),
              height: scale(emote.size.height),
            },
            {
              x: randomizedEmote.position.x,
              y: randomizedEmote.position.y,
              width: randomizedEmote.size.width,
              height: randomizedEmote.size.height,
            },
          )
        ) {
          isEmoteOverlappingWithShuffledEmotes = true;
        }
      });

      obstacles.forEach((obstacle) => {
        if (
          isOverlapping(
            {
              x,
              y,
              width: scale(emote.size.width),
              height: scale(emote.size.height),
            },
            {
              x: obstacle.x,
              y: obstacle.y,
              width: obstacle.width,
              height: obstacle.height,
            },
          )
        ) {
          isEmoteOverlappingWithShuffledEmotes = true;
        }
      });

      if (isEmoteOverlappingWithShuffledEmotes === false) {
        const copy = clone(emote);
        copy.position.x = x;
        copy.position.y = y;
        copy.size.width = scale(copy.size.width);
        copy.size.height = scale(copy.size.height);
        randomizedEmotes.push(copy);
      }
    }
  }

  return randomizedEmotes;
};
