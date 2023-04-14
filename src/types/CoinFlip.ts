import { IItemCard } from './ItemCard'
import { GameStatus } from './enums'

export type Coin = 1 | 0

export interface CoinFlipPlayer {
  username: string
  coin: Coin
  items: IItemCard[]
}

export interface CoinFlipGame {
  firstPlayer: CoinFlipPlayer
  secondPlayer?: CoinFlipPlayer
  status: keyof typeof GameStatus
  winCoin?: Coin
}
