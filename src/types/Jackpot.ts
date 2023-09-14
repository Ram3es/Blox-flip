import { IRootMarketItem } from './Cases'
import { IItemCard } from './ItemCard'
import { IUser } from './User'

export interface IJackpotCard extends IItemCard {
  avatar: string
  pic: string
}

export interface IRootJackpotWager {
  id: number
  wager: number
}

export interface IRootJackpotNew {
  user: IUser
  wager: number
  color: string
  skins?: IRootMarketItem[]
  chance: number
}

export interface IRootJackpotAll {
  id: number
  hash: string
  value: string
  timer: number
  deposits: IRootJackpotNew[]
}

export interface IRootJackpotChance {
  color: string
  chance: number
}

export interface IRootJackpotRoll {
  winner: IUser
}

export interface IRootJackpotHistory {
  users: IRootJackpotAll[]
  winner: IRootJackpotRoll[]
}

export interface IRootJackpotInfo {
  hash: string
  history: any[]
  id: number
  len: number
  participants: IRootJackpotNew[]
  state: number
  timer: number
  time: number
  value: number
}
