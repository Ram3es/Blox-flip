export interface IUserLevel {
  level: number
  exp?: number
  levelup?: number
}

export interface IUser extends IUserLevel {
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
export type TBaseSecondUser = Omit<ISecondUser, 'isWinner' | 'rate' | 'id' | 'isWin' | 'bet' | 'date' | 'game' | 'profit'
>

export interface ILeaderboardUser extends TBaseUser {
  bet: number
  profit: number
}
