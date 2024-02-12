export type Rectangle = {
  x: number
  y: number
  width: number
  height: number
}

export type Emote = {
  name: string
  uri: string
  isAnimated: boolean
} & Rectangle

export type RoundEmote = {
  isMissclick: boolean
} & Emote

export type Round = {
  timestamp: string
  clicks: Array<RoundEmote>
  time: number
}

export type Statistics = Record<string, Round[]>
