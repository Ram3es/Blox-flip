import { possibleBets } from '../types/Wheel'

export const RALL_TIME = 3000
export const DELAY = 21000

export const INIT_BETS_STATE = {
  [possibleBets.GRAY]: [],
  [possibleBets.YELLOW]: [],
  [possibleBets.BLUE]: [],
  [possibleBets.RED]: []
}
