export enum possibleBets {
  GREY = 'grey',
  BLUE = 'blue',
  YELLOW = 'yellow',
  RED = 'red'
}

export interface IWheelGameHistory { ticket: number, gameId: number }
export interface IWheelBetHistory { betColor: possibleBets, betId: number }
