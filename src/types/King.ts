import { IItemCard } from './ItemCard'

export interface IKingGamePlayer {
  username: string
  items: IItemCard[]
}

export interface IKingGame {
  firstPlayer: IKingGamePlayer
  secondPlayer?: IKingGamePlayer
}
