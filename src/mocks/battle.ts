export const dataTable: IBattlesInfo[] = [
  { round: 5, cases: 3, mode: 1, price: 25000, active: { isRunning: true, finished: false, currentRound: 3 } },
  { round: 3, cases: 2, mode: 3, price: 18000, active: { isRunning: false, finished: true } },
  { round: 6, cases: 4, mode: 2, price: 21000, active: { isRunning: true, finished: false, currentRound: 6 } },
  { round: 6, cases: 7, mode: 2, price: 7000, active: { isRunning: true, finished: false, currentRound: 1 } },
  { round: 6, cases: 7, mode: 2, price: 7000, active: { isRunning: false, finished: false, currentRound: 5 } }
]

export interface IBattlesInfo {
  round: number
  cases: number
  mode: number
  price: number
  active: { isRunning: boolean, finished: boolean, currentRound?: number }
}
