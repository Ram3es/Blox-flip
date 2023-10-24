export type ICoin = 0 | 1

export type ICoinFlipStatus = '1' | '2' | '3' | '4'

export interface ICoinFlipPlayer {
  id: string
  name: string
  avatar: string
  level: number
  value: number
  chance: number
  coin: ICoin
}

// state statuses
// 1 - lobby is open
// 2 - joining player
// 3 - locked and sending
// 4 - ended and go to bottom history

export interface ICoinFlip {
  state: ICoinFlipStatus
  id: number
  seed: string
  creator: ICoinFlipPlayer
  joining?: ICoinFlipPlayer
  winner?: Omit<ICoinFlipPlayer, 'chance'>
  start_time: number
  min: number
  max: number
}

export interface ICoinFlipCreate {
  coin: ICoin
  wager: number
}

export type ICoinFlipList = Record<number, ICoinFlip>
