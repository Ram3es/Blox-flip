import type { IItemCard, IUnboxCard } from '../types/ItemCard'
import type { IUser } from './../types/User'

type TStatus = 'created' | 'running' | 'ended'
export type TMode = '1v1' | '1v1v1' | '1v1v1v1' | 'group' | '2v2'

export interface IBattleUser extends Omit<IUser, 'progress'> {
  dropsCards: IItemCard[]
  wonDiamonds: number
  team?: 'orange' | 'blue'
}

interface IGameSetting {
  rounds: number
  price: number
  mode: IModeGame
  currentRound: number
  isDone: boolean
}

export interface IBattlesInfo {
  id: string
  status: TStatus
  date: string
  players: IBattleUser[]
  gameSetting: IGameSetting
  cases?: IUnboxCard[]
}
export interface IModeGame {
  variant: TMode
  requiredPlayers: number
}

export const dataTable: IBattlesInfo[] = [
  {
    id: '777',
    status: 'created',
    players: [
      {
        id: '21',
        avatar:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
        name: 'Patron',
        level: 13,
        dropsCards: [],
        wonDiamonds: 0
      }
    ],
    gameSetting: {
      currentRound: 0,
      rounds: 5,
      price: 9900,
      mode: { variant: '1v1', requiredPlayers: 2 },
      isDone: false
    },
    date: '2032-03-12T23:46:58.567Z',
    cases: [
      { id: '31', color: 'Pink', image: 'horns', name: ' Hot Box', price: 1500 },
      { id: '32', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '33', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '1', color: 'Pink', image: 'horns', name: ' Hot Box', price: 1500 },
      { id: '2', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 }
    ]
  },
  {
    id: '778',
    status: 'running',
    players: [
      {
        id: '232331',
        avatar:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
        name: 'Patron',
        level: 13,
        dropsCards: [
          { id: '3', color: 'Pink', image: 'horns', name: 'Fiery Horns of the Netherworld', price: 2400, sold: true, active: false, isSelected: false },
          { id: '4', color: 'Pink', image: 'redCrown', name: 'Almond Crown of the Netherworld', price: 2300, sold: false, active: true, isSelected: false },
          { id: '5', color: 'Orange', image: 'horns', name: 'Fiery Horns ', price: 800, sold: true, active: false, isSelected: false }
        ],
        wonDiamonds: 5500
      },
      {
        id: '232332',
        avatar:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
        name: 'Patron',
        level: 13,
        dropsCards: [
          { id: '1', color: 'Orange', image: 'horns', name: 'Fiery Horns ', price: 1200, sold: true, active: false, isSelected: false },
          { id: '2', color: 'Blue', image: 'helmet', name: 'Fiery Helmet of the Netherworld', price: 600, sold: false, active: true, isSelected: false },
          { id: '3', color: 'Pink', image: 'horns', name: 'Fiery Horns of the Netherworld', price: 2400, sold: true, active: false, isSelected: false }

        ],
        wonDiamonds: 4200
      },
      {
        id: '232333',
        avatar:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
        name: 'Patron',
        level: 13,
        dropsCards: [
          { id: '1', color: 'Orange', image: 'horns', name: 'Fiery Horns ', price: 1200, sold: true, active: false, isSelected: false },
          { id: '2', color: 'Blue', image: 'helmet', name: 'Fiery Helmet of the Netherworld', price: 600, sold: false, active: true, isSelected: false },
          { id: '3', color: 'Pink', image: 'horns', name: 'Fiery Horns of the Netherworld', price: 2400, sold: true, active: false, isSelected: false }

        ],
        wonDiamonds: 4200
      }
    ],
    gameSetting: {
      rounds: 12,
      price: 17000,
      mode: { variant: '1v1v1', requiredPlayers: 3 },
      currentRound: 4,
      isDone: false
    },
    date: '2032-04-12T23:46:58.567Z',
    cases: [
      { id: '1', color: 'Pink', image: 'horns', name: ' Hot Box', price: 1500 },
      { id: '2', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '3', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '4', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '5', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '6', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '7', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '8', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '9', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '10', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '11', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '12', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 }
    ]
  },
  {
    id: '79011',
    status: 'ended',
    players: [
      {
        id: '232335',
        avatar:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
        name: 'Patron',
        level: 13,
        dropsCards: [
          { id: '1', color: 'Orange', image: 'horns', name: 'Fiery Horns ', price: 1200, sold: true, active: false, isSelected: false },
          { id: '2', color: 'Blue', image: 'helmet', name: 'Fiery Helmet of the Netherworld', price: 600, sold: false, active: true, isSelected: false },
          { id: '3', color: 'Pink', image: 'horns', name: 'Fiery Horns of the Netherworld', price: 2400, sold: true, active: false, isSelected: false },
          { id: '4', color: 'Pink', image: 'redCrown', name: 'Almond Crown of the Netherworld', price: 2300, sold: false, active: true, isSelected: false },
          { id: '5', color: 'Blue', image: 'helmet', name: 'Fiery Helmet of the Netherworld', price: 600, sold: false, active: true, isSelected: false },
          { id: '6', color: 'Pink', image: 'horns', name: 'Fiery Horns of the Netherworld', price: 2400, sold: true, active: false, isSelected: false },
          { id: '7', color: 'Pink', image: 'redCrown', name: 'Almond Crown of the Netherworld', price: 2300, sold: false, active: true, isSelected: false }
        ],
        wonDiamonds: 11800
      },
      {
        id: '232336',
        avatar:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
        name: 'Patron',
        level: 13,
        dropsCards: [
          { id: '1', color: 'Orange', image: 'horns', name: 'Fiery Horns ', price: 1200, sold: true, active: false, isSelected: false },
          { id: '2', color: 'Blue', image: 'helmet', name: 'Fiery Helmet of the Netherworld', price: 600, sold: false, active: true, isSelected: false },
          { id: '3', color: 'Pink', image: 'horns', name: 'Fiery Horns of the Netherworld', price: 2400, sold: true, active: false, isSelected: false },
          { id: '4', color: 'Pink', image: 'redCrown', name: 'Almond Crown of the Netherworld', price: 2300, sold: false, active: true, isSelected: false },
          { id: '5', color: 'Orange', image: 'horns', name: 'Fiery Horns ', price: 1200, sold: true, active: false, isSelected: false },
          { id: '6', color: 'Orange', image: 'horns', name: 'Fiery Horns ', price: 1200, sold: true, active: false, isSelected: false },
          { id: '7', color: 'Orange', image: 'horns', name: 'Fiery Horns ', price: 1200, sold: true, active: false, isSelected: false }
        ],
        wonDiamonds: 10100
      },
      {
        id: '232337',
        avatar:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
        name: 'Patron',
        level: 13,
        dropsCards: [
          { id: '1', color: 'Orange', image: 'horns', name: 'Fiery Horns ', price: 1200, sold: true, active: false, isSelected: false },
          { id: '2', color: 'Blue', image: 'helmet', name: 'Fiery Helmet of the Netherworld', price: 600, sold: false, active: true, isSelected: false },
          { id: '3', color: 'Pink', image: 'horns', name: 'Fiery Horns of the Netherworld', price: 2400, sold: true, active: false, isSelected: false },
          { id: '4', color: 'Pink', image: 'redCrown', name: 'Almond Crown of the Netherworld', price: 2300, sold: false, active: true, isSelected: false },
          { id: '5', color: 'Orange', image: 'horns', name: 'Fiery Horns ', price: 800, sold: true, active: false, isSelected: false },
          { id: '6', color: 'Orange', image: 'horns', name: 'Fiery Horns ', price: 1700, sold: true, active: false, isSelected: false },
          { id: '7', color: 'Orange', image: 'horns', name: 'Fiery Horns ', price: 1200, sold: true, active: false, isSelected: false }
        ],
        wonDiamonds: 10200
      }
    ],
    gameSetting: {
      rounds: 7,
      price: 17000,
      currentRound: 7,
      mode: { variant: '1v1v1', requiredPlayers: 3 },
      isDone: true
    },
    date: '2032-04-12T23:46:58.567Z',
    cases: [
      { id: '1', color: 'Pink', image: 'horns', name: ' Hot Box', price: 1500 },
      { id: '2', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '3', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '4', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '5', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '6', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '7', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 }
    ]
  },
  {
    id: '77923',
    status: 'ended',
    players: [
      {
        id: '323238',
        avatar:
          'https://cdn.dribbble.com/users/3175546/screenshots/11634060/media/abe23d862136d3a3cebe2c654b2a5ae6.png?compress=1&resize=400x300',
        name: 'Patron',
        level: 13,
        dropsCards: [
          { id: '1', color: 'Orange', image: 'horns', name: 'Fiery Horns ', price: 1200, sold: true, active: false, isSelected: false },
          { id: '2', color: 'Blue', image: 'helmet', name: 'Fiery Helmet of the Netherworld', price: 600, sold: false, active: true, isSelected: false },
          { id: '3', color: 'Pink', image: 'horns', name: 'Fiery Horns of the Netherworld', price: 2400, sold: true, active: false, isSelected: false },
          { id: '4', color: 'Pink', image: 'redCrown', name: 'Almond Crown of the Netherworld', price: 2000, sold: false, active: true, isSelected: false },
          { id: '5', color: 'Orange', image: 'horns', name: 'Fiery Horns ', price: 800, sold: true, active: false, isSelected: false }

        ],
        wonDiamonds: 7000
      },
      {
        id: '232339',
        avatar:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
        name: 'Patron',
        level: 13,
        dropsCards: [
          { id: '1', color: 'Orange', image: 'horns', name: 'Fiery Horns ', price: 1200, sold: true, active: false, isSelected: false },
          { id: '2', color: 'Blue', image: 'helmet', name: 'Fiery Helmet of the Netherworld', price: 600, sold: false, active: true, isSelected: false },
          { id: '3', color: 'Pink', image: 'horns', name: 'Fiery Horns of the Netherworld', price: 2000, sold: true, active: false, isSelected: false },
          { id: '4', color: 'Pink', image: 'redCrown', name: 'Almond Crown of the Netherworld', price: 2300, sold: false, active: true, isSelected: false },
          { id: '5', color: 'Orange', image: 'horns', name: 'Fiery Horns ', price: 1800, sold: true, active: false, isSelected: false }

        ],
        wonDiamonds: 7900
      },
      {
        id: '2323300',
        avatar:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
        name: 'Patron',
        level: 13,
        dropsCards: [

          { id: '1', color: 'Orange', image: 'horns', name: 'Fiery Horns ', price: 1200, sold: true, active: false, isSelected: false },
          { id: '2', color: 'Blue', image: 'helmet', name: 'Fiery Helmet of the Netherworld', price: 600, sold: false, active: true, isSelected: false },
          { id: '3', color: 'Pink', image: 'horns', name: 'Fiery Horns of the Netherworld', price: 2000, sold: true, active: false, isSelected: false },
          { id: '4', color: 'Pink', image: 'redCrown', name: 'Almond Crown of the Netherworld', price: 2300, sold: false, active: true, isSelected: false },
          { id: '5', color: 'Orange', image: 'horns', name: 'Fiery Horns ', price: 1800, sold: true, active: false, isSelected: false }
        ],
        wonDiamonds: 7900
      },
      {
        id: '2323301',
        avatar:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
        name: 'Patron',
        level: 13,
        dropsCards: [
          { id: '1', color: 'Orange', image: 'horns', name: 'Fiery Horns ', price: 1200, sold: true, active: false, isSelected: false },
          { id: '2', color: 'Blue', image: 'helmet', name: 'Fiery Helmet of the Netherworld', price: 600, sold: false, active: true, isSelected: false },
          { id: '3', color: 'Pink', image: 'horns', name: 'Fiery Horns of the Netherworld', price: 2000, sold: true, active: false, isSelected: false },
          { id: '4', color: 'Pink', image: 'redCrown', name: 'Almond Crown of the Netherworld', price: 2300, sold: false, active: true, isSelected: false },
          { id: '5', color: 'Orange', image: 'horns', name: 'Fiery Horns ', price: 1500, sold: true, active: false, isSelected: false }

        ],
        wonDiamonds: 7600
      }
    ],
    gameSetting: {
      rounds: 5,
      price: 12000,
      mode: { variant: 'group', requiredPlayers: 4 },
      currentRound: 5,
      isDone: true
    },
    date: '2032-05-12T23:46:58.567Z',
    cases: [
      { id: '1', color: 'Pink', image: 'horns', name: ' Hot Box', price: 1500 },
      { id: '2', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '3', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '4', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '5', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 }
    ]
  },
  {
    id: '732723',
    status: 'ended',
    players: [
      {
        id: '2323302',
        avatar:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
        name: 'Patron',
        level: 13,
        dropsCards: [
          { id: '1', color: 'Orange', image: 'horns', name: 'Fiery Horns ', price: 1200, sold: true, active: false, isSelected: false },
          { id: '2', color: 'Blue', image: 'helmet', name: 'Fiery Helmet of the Netherworld', price: 600, sold: false, active: true, isSelected: false },
          { id: '3', color: 'Pink', image: 'horns', name: 'Fiery Horns of the Netherworld', price: 2000, sold: true, active: false, isSelected: false },
          { id: '4', color: 'Pink', image: 'redCrown', name: 'Almond Crown of the Netherworld', price: 2300, sold: false, active: true, isSelected: false },
          { id: '5', color: 'Orange', image: 'horns', name: 'Fiery Horns ', price: 1500, sold: true, active: false, isSelected: false }

        ],
        wonDiamonds: 7600
      },
      {
        id: '2323303',
        avatar:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
        name: 'Patron',
        level: 13,
        dropsCards: [
          { id: '1', color: 'Orange', image: 'horns', name: 'Fiery Horns ', price: 1200, sold: true, active: false, isSelected: false },
          { id: '2', color: 'Blue', image: 'helmet', name: 'Fiery Helmet of the Netherworld', price: 600, sold: false, active: true, isSelected: false },
          { id: '3', color: 'Pink', image: 'horns', name: 'Fiery Horns of the Netherworld', price: 2000, sold: true, active: false, isSelected: false },
          { id: '4', color: 'Pink', image: 'redCrown', name: 'Almond Crown of the Netherworld', price: 2300, sold: false, active: true, isSelected: false },
          { id: '5', color: 'Orange', image: 'horns', name: 'Fiery Horns ', price: 1900, sold: true, active: false, isSelected: false }

        ],
        wonDiamonds: 8000
      }
    ],
    gameSetting: {
      rounds: 5,
      price: 9900,
      mode: { variant: '1v1', requiredPlayers: 2 },
      currentRound: 5,
      isDone: true
    },
    date: '2032-03-14T23:46:58.567Z',
    cases: [
      { id: '1', color: 'Pink', image: 'horns', name: ' Hot Box', price: 1500 },
      { id: '2', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '3', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '4', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '5', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 }
    ]
  },
  {
    id: '7772',
    status: 'running',
    players: [
      {
        id: '2323304',
        avatar:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
        name: 'Patron',
        level: 13,
        dropsCards: [
          { id: '1', color: 'Orange', image: 'horns', name: 'Fiery Horns ', price: 1200, sold: true, active: false, isSelected: false },
          { id: '2', color: 'Blue', image: 'helmet', name: 'Fiery Helmet of the Netherworld', price: 600, sold: false, active: true, isSelected: false }
        ],
        wonDiamonds: 1800
      },
      {
        id: 'd32505',
        avatar:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
        name: 'Patron',
        level: 13,
        dropsCards: [

          { id: '1', color: 'Orange', image: 'horns', name: 'Fiery Horns ', price: 1200, sold: true, active: false, isSelected: false },
          { id: '2', color: 'Blue', image: 'helmet', name: 'Fiery Helmet of the Netherworld', price: 1000, sold: false, active: true, isSelected: false }
        ],
        wonDiamonds: 2200
      }
    ],
    gameSetting: {
      rounds: 5,
      price: 9900,
      mode: { variant: '1v1', requiredPlayers: 2 },
      currentRound: 3,
      isDone: false
    },
    date: '2032-03-14T23:46:58.567Z',
    cases: [
      { id: '1', color: 'Pink', image: 'horns', name: ' Hot Box', price: 1500 },
      { id: '2', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '3', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '4', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '5', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 }
    ]
  },
  {
    id: '7778',
    status: 'created',
    players: [
      {
        id: '435',
        avatar:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
        name: 'Patron',
        level: 13,
        dropsCards: [],
        wonDiamonds: 0
      },
      {
        id: 'd32345',
        avatar:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/943.jpg',
        name: 'Patron',
        level: 13,
        dropsCards: [],
        wonDiamonds: 0
      }
    ],
    gameSetting: {
      rounds: 5,
      price: 9900,
      mode: { variant: '1v1v1v1', requiredPlayers: 4 },
      currentRound: 0,
      isDone: false
    },
    date: '2032-11-14T23:46:58.567Z',
    cases: [
      { id: '1', color: 'Pink', image: 'horns', name: ' Hot Box', price: 1500 },
      { id: '2', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '3', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '4', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '5', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 }
    ]
  },
  {
    id: '77786',
    status: 'running',
    players: [
      {
        id: '43506',
        avatar:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
        name: 'Patron',
        level: 13,
        dropsCards: [
          { id: '1', color: 'Orange', image: 'horns', name: 'Fiery Horns ', price: 1200, sold: true, active: false, isSelected: false },
          { id: '2', color: 'Blue', image: 'helmet', name: 'Fiery Helmet of the Netherworld', price: 600, sold: false, active: true, isSelected: false },
          { id: '3', color: 'Pink', image: 'horns', name: 'Fiery Horns of the Netherworld', price: 2000, sold: true, active: false, isSelected: false }

        ],
        wonDiamonds: 3800,
        team: 'blue'
      },
      {
        id: 'd3234507',
        avatar:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
        name: 'Patron',
        level: 13,
        dropsCards: [
          { id: '1', color: 'Orange', image: 'horns', name: 'Fiery Horns ', price: 1200, sold: true, active: false, isSelected: false },
          { id: '2', color: 'Blue', image: 'helmet', name: 'Fiery Helmet of the Netherworld', price: 600, sold: false, active: true, isSelected: false },
          { id: '3', color: 'Pink', image: 'horns', name: 'Fiery Horns of the Netherworld', price: 2000, sold: true, active: false, isSelected: false }

        ],
        wonDiamonds: 3800,
        team: 'blue'
      },
      {
        id: 'd3234508',
        avatar:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
        name: 'Patron',
        level: 13,
        dropsCards: [
          { id: '1', color: 'Orange', image: 'horns', name: 'Fiery Horns ', price: 1200, sold: true, active: false, isSelected: false },
          { id: '2', color: 'Blue', image: 'helmet', name: 'Fiery Helmet of the Netherworld', price: 600, sold: false, active: true, isSelected: false },
          { id: '3', color: 'Pink', image: 'horns', name: 'Fiery Horns of the Netherworld', price: 2000, sold: true, active: false, isSelected: false }

        ],
        wonDiamonds: 3800,
        team: 'orange'
      },
      {
        id: 'd3234509',
        avatar:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg',
        name: 'Patron',
        level: 13,
        dropsCards: [
          { id: '1', color: 'Orange', image: 'horns', name: 'Fiery Horns ', price: 1200, sold: true, active: false, isSelected: false },
          { id: '2', color: 'Blue', image: 'helmet', name: 'Fiery Helmet of the Netherworld', price: 600, sold: false, active: true, isSelected: false },
          { id: '3', color: 'Pink', image: 'horns', name: 'Fiery Horns of the Netherworld', price: 2000, sold: true, active: false, isSelected: false }

        ],
        wonDiamonds: 3800,
        team: 'orange'
      }
    ],
    gameSetting: {
      rounds: 7,
      price: 9900,
      mode: { variant: '2v2', requiredPlayers: 4 },
      currentRound: 4,
      isDone: false
    },
    date: '2032-11-14T23:46:58.567Z',
    cases: [
      { id: '1', color: 'Pink', image: 'horns', name: ' Hot Box', price: 1500 },
      { id: '2', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '3', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '4', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '5', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '6', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 },
      { id: '7', color: 'Pink', image: 'horns', name: ' Hot Box', price: 2400 }
    ]
  }
]
