import { IChatUser } from './User'

export interface IChatMessage {
  message: string
  time: string
  hash: string
  user: IChatUser
}

export interface IBanUser {
  id: string
  reason: string
  time: string
}
