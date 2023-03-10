export const dataTable: IBattlesInfo[] = [
  { date: '2032-06-12T23:46:58.567Z', round: 5, cases: 3, mode: 1, price: 25000, active: { isRunning: true, finished: false, currentRound: 3 } },
  { date: '2032-07-12T23:46:58.567Z', round: 3, cases: 2, mode: 3, price: 18000, active: { isRunning: false, finished: true } },
  { date: '2032-05-12T23:46:58.567Z', round: 6, cases: 4, mode: 2, price: 21000, active: { isRunning: true, finished: false, currentRound: 6 } },
  { date: '2032-04-12T23:46:58.567Z', round: 6, cases: 7, mode: 2, price: 7000, active: { isRunning: true, finished: false, currentRound: 1 } },
  { date: '2032-03-12T23:46:58.567Z', round: 6, cases: 7, mode: 2, price: 7000, active: { isRunning: false, finished: false, currentRound: 5 } }
]

export interface IBattlesInfo {
  date: string
  round: number
  cases: number
  mode: number
  price: number
  active: { isRunning: boolean, finished: boolean, currentRound?: number }
}
