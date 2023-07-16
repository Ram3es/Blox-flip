import { IUser } from './User'

export enum goldEnum {
  GOLD = 'gold'
}

export enum possibleBets {
  GRAY = 'gray',
  YELLOW = 'yellow',
  BLUE = 'blue',
  RED = 'red',
}

export interface IWheelGameHistory { ticket: possibleBets, gameId: number }
export interface IWheelBetHistory { betColor: possibleBets, betId: number }

export interface IIWheelBet {
  color: possibleBets | goldEnum
  wager: number
  user: Omit< IUser, 'role' | 'progress' >
}

export interface IWinTicket {
  num: number
  color: possibleBets | goldEnum
}

export interface ILoadWheelRes {
  id: string
  hash: string
  time: string
  roll: string

}
