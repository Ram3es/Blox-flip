import { IIWheelBet, possibleBets } from '../types/Wheel'

// export interface IWheelBet {
//   avatar: string
//   bet: number
//   username: string
// }

export type WheelBetRecord = Record<possibleBets, IIWheelBet[]>

export const wheelBetsMock: WheelBetRecord = {
  [possibleBets.GRAY]: [
    {
      user: {
        id: 21,
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
        name: 'Patron',
        level: 13
      },
      wager: 1000,
      color: possibleBets.GRAY
    }
  ],
  [possibleBets.YELLOW]: [
    {
      user: {
        id: 11,
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
        name: 'Patron',
        level: 17
      },
      wager: 1000,
      color: possibleBets.YELLOW
    }
  ],
  [possibleBets.BLUE]: [
    {
      user: {
        id: 116,
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
        name: 'Patron',
        level: 18
      },
      wager: 5000,
      color: possibleBets.BLUE
    },
    {
      user: {
        id: 141,
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
        name: 'Patron',
        level: 37
      },
      wager: 1000,
      color: possibleBets.BLUE
    }
  ],
  [possibleBets.RED]: [
    {
      user: {
        id: 116,
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
        name: 'Patron',
        level: 18
      },
      wager: 4000,
      color: possibleBets.RED
    },
    {
      user: {
        id: 14,
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
        name: 'Patron',
        level: 37
      },
      wager: 3000,
      color: possibleBets.RED
    }
  ]
}
