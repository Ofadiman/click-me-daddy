export type Rectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Emote = {
  name: string;
  uri: string;
  isAnimated: boolean;
} & Rectangle;
