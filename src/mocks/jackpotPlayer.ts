export interface IJackpotPlayer {
  id: string
  userName: string
  avatar: string
  level: number
  deposit: number

}

export const jackpotPlayer: IJackpotPlayer[] = [
  {
    id: new Date().getTime().toString(),
    userName: 'Mark SkyWalker',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
    level: 17,
    deposit: 23000
  },
  {
    id: new Date().getTime().toString().concat('-3'),
    userName: 'Haupt Standarted',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
    level: 55,
    deposit: 13000
  },
  {
    id: new Date().getTime().toString().concat('-4'),
    userName: 'Haupt Standarted',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
    level: 55,
    deposit: 65000
  },
  {
    id: new Date().getTime().toString().concat('-6'),
    userName: 'Haupt Standarted',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
    level: 55,
    deposit: 5000
  },
  {
    id: new Date().getTime().toString().concat('-7'),
    userName: 'Haupt Standarted',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
    level: 55,
    deposit: 7200
  },
  {
    id: new Date().getTime().toString().concat('-8'),
    userName: 'Haupt Standarted',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
    level: 55,
    deposit: 5200
  },
  {
    id: new Date().getTime().toString().concat('-9'),
    userName: 'Haupt Standarted',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
    level: 55,
    deposit: 12200
  }

]
