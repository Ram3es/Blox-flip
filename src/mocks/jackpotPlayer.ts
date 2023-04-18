export interface IJackpotPlayer {
  id: string
  userName: string
  avatar: string
  level: number

}

export const jackpotPlayer: IJackpotPlayer[] = [
  {
    id: new Date().getTime().toString(),
    userName: 'Mark SkyWalker',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
    level: 17
  },
  {
    id: new Date().getTime().toString().concat('-1'),
    userName: 'Luke SkyWalker',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
    level: 34
  },
  {
    id: new Date().getTime().toString().concat('-2'),
    userName: 'Luke SkyWalker sddddddddddddddddd ddddddddddddddddddddddddd',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
    level: 34
  },
  {
    id: new Date().getTime().toString().concat('-3'),
    userName: 'Gaupt Standarted',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
    level: 55
  },
  {
    id: new Date().getTime().toString().concat('-4'),
    userName: 'Gaupt Standarted',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
    level: 55
  }

]
