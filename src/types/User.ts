export interface IUser {
  id: string
  name: string
  avatar: string
  level: number
  role?: string
  flag?: number
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

export interface IChatUser extends Omit<IUser, 'progress'> {
  flag?: number
}
export type TBaseUser = Omit<IUser, 'progress' | 'role' | 'flag'>

export interface ILeaderbordUser extends TBaseUser {
  bet: number
  profit: number
}
