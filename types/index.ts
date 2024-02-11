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

export type Round = {
  timestamp: string
  clicks: Emote[]
  time: number
  missclicks: number
}

export type Statistics = Record<string, Round[]>
