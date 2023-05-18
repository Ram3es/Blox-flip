import { IUser } from './User'

export enum possibleBets {
  GREY = 'grey',
  BLUE = 'blue',
  YELLOW = 'yellow',
  RED = 'red'
}

export interface IWheelGameHistory { ticket: number, gameId: number }
export interface IWheelBetHistory { betColor: possibleBets, betId: number }

export interface IIWheelBet {
  color: possibleBets
  wager: number
  user: Omit< IUser, 'role' | 'progress' >
}
