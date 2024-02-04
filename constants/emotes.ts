export type Emote = {
  name: string;
  uri: string;
  isAnimated: boolean;
  size: {
    width: number;
    height: number;
  };
  position: {
    x: number;
    y: number;
  };
};

export const brugEmotes: Emote[] = [
  {
    name: "brugJam",
    uri: "https://cdn.7tv.app/emote/6216855baff1c45709b481dc/4x.webp",
    isAnimated: true,
    size: {
      width: 280,
      height: 128,
    },
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    name: "brugHappy",
    uri: "https://cdn.7tv.app/emote/61fabc30b687024c3843b52d/4x.webp",
    isAnimated: false,
    size: {
      width: 188,
      height: 128,
    },
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    name: "brugSad",
    uri: "https://cdn.7tv.app/emote/61fabe5c9f7bac13c42e14d0/4x.webp",
    isAnimated: false,
    size: {
      width: 188,
      height: 128,
    },
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    name: "brugThis",
    uri: "https://cdn.7tv.app/emote/621683a378f6e57762f9bfe3/4x.webp",
    isAnimated: true,
    size: {
      width: 280,
      height: 128,
    },
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    name: "brugEZ",
    uri: "https://cdn.7tv.app/emote/61fabf88017b2a6f053af653/4x.webp",
    isAnimated: false,
    size: {
      width: 188,
      height: 128,
    },
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    name: "brugBox",
    uri: "https://cdn.7tv.app/emote/61e815e841a16ffa4aa288a5/4x.webp",
    isAnimated: true,
    size: {
      width: 224,
      height: 128,
    },
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    name: "brugChef",
    uri: "https://cdn.7tv.app/emote/61e0a72b37dd8d85f2e0c044/4x.webp",
    isAnimated: true,
    size: {
      width: 212,
      height: 128,
    },
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    name: "brugBedge",
    uri: "https://cdn.7tv.app/emote/61e9379ff20dcd151f06162e/4x.webp",
    isAnimated: false,
    size: {
      width: 128,
      height: 128,
    },
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    name: "cmonBrug",
    uri: "https://cdn.7tv.app/emote/615739fcb785e05aa26c071c/4x.webp",
    isAnimated: false,
    size: {
      width: 128,
      height: 128,
    },
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    name: "brugWokege",
    uri: "https://cdn.7tv.app/emote/61e938ce699aab943eab978a/4x.webp",
    isAnimated: false,
    size: {
      width: 128,
      height: 128,
    },
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    name: "brugSalute",
    uri: "https://cdn.7tv.app/emote/622642c5043b2a353ec880c3/4x.webp",
    isAnimated: false,
    size: {
      width: 128,
      height: 128,
    },
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    name: "brugDrums",
    uri: "https://cdn.7tv.app/emote/6314c810ae7e63d8ec73f368/4x.webp",
    isAnimated: true,
    size: {
      width: 128,
      height: 128,
    },
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    name: "bruggium",
    uri: "https://cdn.7tv.app/emote/6213a36821b4d5de1447209e/4x.webp",
    isAnimated: false,
    size: {
      width: 128,
      height: 128,
    },
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    name: "brugStop",
    uri: "https://cdn.7tv.app/emote/62d9bd92b33fe6c4fa9379bd/4x.webp",
    isAnimated: false,
    size: {
      width: 128,
      height: 128,
    },
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    name: "brugDance",
    uri: "https://cdn.7tv.app/emote/61ea97f10aadf8d57da4ef0b/4x.webp",
    isAnimated: true,
    size: {
      width: 128,
      height: 128,
    },
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    name: "brugPot",
    uri: "https://cdn.7tv.app/emote/62bda9f168a0391cc2397c91/4x.webp",
    isAnimated: false,
    size: {
      width: 128,
      height: 128,
    },
    position: {
      x: 0,
      y: 0,
    },
  },
];

export const pepeEmotes: Emote[] = [
  {
    name: "pepeJAM",
    uri: "https://cdn.7tv.app/emote/6040a8bccf6746000db10348/4x.webp",
    isAnimated: true,
    size: {
      width: 132,
      height: 128,
    },
    position: {
      x: 0,
      y: 0,
    },
  },
];

export const emotes = {
  pepe: pepeEmotes,
  brug: brugEmotes,
};
