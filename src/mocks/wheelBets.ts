import { possibleBets } from '../types/Wheel'

export interface IWheelBet {
  avatar: string
  bet: number
  username: string
}

export type WheelBetRwcord = Record<possibleBets, IWheelBet[]>

export const wheelBets: WheelBetRwcord = {
  [possibleBets.GREY]: [
    {
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
      bet: 1000,
      username: 'Carmela_Botsford1'
    }
  ],
  [possibleBets.YELLOW]: [
    {
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
      bet: 4000,
      username: 'Carmela_Botsford4'
    }
  ],
  [possibleBets.BLUE]: [
    {
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
      bet: 2000,
      username: 'Carmela_Botsford2'
    }
  ],
  [possibleBets.RED]: [
    {
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
      bet: 3000,
      username: 'Carmela_Botsford3'
    }
  ]
}
