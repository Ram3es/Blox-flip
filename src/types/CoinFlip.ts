import { IItemCard } from './ItemCard'

export type ICoin = 0 | 1

export type ICoinFlipStatus = 1 | 2 | 3 | 4

export interface ICoinFlipPlayer {
  id: string
  name: string
  avatar: string
  level: number
  value: number
  chance: number
  skins: IItemCard[]
  coin: ICoin
}

// state statuses
// 1 - lobby is open
// 2 - joining player
// 3 - locked and sending
// 4 - ended and go to bottom history

export interface ICoinFlip {
  state: ICoinFlipStatus
  id: string
  seed: string
  creator: ICoinFlipPlayer
  joining?: ICoinFlipPlayer
  timer?: number
  winner?: Omit<ICoinFlipPlayer, 'chance' | 'skins'>
  min: number
  max: number
}

export interface ICoinFlipCreate {
  type: 'coinflip'
  items: string[]
  coin: ICoin
  '2fa_code'?: string
  gameId?: string
}
