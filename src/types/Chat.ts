import { IChatUser } from './User'

export interface IChatMessage {
  message: string
  time: number
  hash: string
  user: IChatUser
}

export interface IBanUser {
  id: number
  reason: string
  time: string
}
