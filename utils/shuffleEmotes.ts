import { Emote, Rectangle } from "@/types";
import { faker } from "@faker-js/faker";
import { clone } from "ramda";
import { LayoutRectangle, ScaledSize } from "react-native";

const isOverlapping = (first: Rectangle, second: Rectangle): boolean => {
  if (first.x > second.x + second.width || second.x > first.x + first.width) {
    return false;
  }

  if (first.y > second.y + second.height || second.y > first.y + first.height) {
    return false;
  }

  return true;
};

const EMOTE_PADDING = 5;

const SCALING_FACTOR = 2;
const scale = (value: number) => {
  return Math.round(value / SCALING_FACTOR);
};

export const shuffleEmotes = ({
  emotes,
  layout,
  obstacles,
  dimensions,
}: {
  emotes: Emote[];
  layout: LayoutRectangle;
  obstacles: Array<Rectangle>;
  dimensions: ScaledSize;
}): Emote[] => {
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
          scale(emote.width) -
          EMOTE_PADDING * dimensions.scale,
      });
      const y = faker.number.int({
        min: 0 + EMOTE_PADDING,
        max:
          Math.round(layout.height) -
          scale(emote.height) -
          EMOTE_PADDING * dimensions.scale,
      });

      randomizedEmotes.forEach((randomizedEmote) => {
        if (
          isOverlapping(
            {
              x,
              y,
              width: scale(emote.width),
              height: scale(emote.height),
            },
            {
              x: randomizedEmote.x,
              y: randomizedEmote.y,
              width: randomizedEmote.width,
              height: randomizedEmote.height,
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
              width: scale(emote.width),
              height: scale(emote.height),
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
        copy.x = x;
        copy.y = y;
        copy.width = scale(copy.width);
        copy.height = scale(copy.height);
        randomizedEmotes.push(copy);
      }
    }
  }

  return randomizedEmotes;
};
