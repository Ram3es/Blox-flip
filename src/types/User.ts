export interface IUser {
  id: string
  name: string
  avatar: string
  level: number
  role?: string
  progress: {
    current: number
    required: number
  }
}
export interface ISecondUser {
  isWinner: boolean
  game: string
  date: string
  bet: number
  rate: number
  profit: number
  username: string
  avatar: string
  level: number
  id: string
  isWin?: boolean
}
