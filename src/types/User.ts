export interface IUser {
  name: string
  avatar: string
  level: number
  progress: {
    current: number
    required: number
  }
}
export interface ISecondUser {
  game: string
  date: string
  bet: number
  rate: number
  profit: number
  username: string
  avatar: string
  level: number
  id: string
}
