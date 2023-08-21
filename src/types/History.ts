export interface IHistory {
  id: string
  game: string
  date: string
  multiplier?: number
  wager: number
  profit: number
  isError?: boolean
  isWinner: boolean
}
