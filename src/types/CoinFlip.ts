import { IItemCard } from './ItemCard'
import { GameStatus } from './enums'

export interface CoinFlipPlayer {
  username: string
  coin: number
  items: IItemCard[]
}

export interface CoinFlipGame {
  firstPlayer: CoinFlipPlayer
  secondPlayer?: CoinFlipPlayer
  status: keyof typeof GameStatus
}
