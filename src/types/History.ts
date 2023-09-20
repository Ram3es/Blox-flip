export interface IHistory {
  id: string
  game: string
  time: string
  wager: number
  value: number
  won: boolean
}

export interface IGameInfo {
  id: number
  hash: string
  server: string
  nonce?: number
  random?: number
}
