
import { IItemCard, IUnboxCard } from '../types/ItemCard'
import { IUser } from './../types/User'

type TStatus = 'created' | 'running' | 'ended'
export type TMode = '1v1' | '1v1v1' | '1v1v1v1' | 'group' | '2v2'

export interface IBattleUser extends Omit<IUser, 'progress' > {

  dropsCards: IItemCard[]
  wonDiamonds: number
  team?: 'orange' | 'blue'

}
export interface IBattlesInfo {
  id: string
  status: TStatus
  date: string
  players: [] | IBattleUser[]
  gameSetting: IGameSetting
  cases?: IUnboxCard[]
}
interface IGameSetting {
  rounds: number
  price: number
  mode: IModeGame
  currentRound?: number

}
export interface IModeGame {
  variant: TMode
  requiredPlayers: number
}

export const dataTable: IBattlesInfo[] = [
  {
    id: '777',
    status: 'created',
    players: [{ id: '21', avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg', name: 'Patron', level: 13, dropsCards: [], wonDiamonds: 0 }],
    gameSetting: {
      rounds: 5,
      price: 9900,
      mode: { variant: '1v1', requiredPlayers: 2 }
    },
    date: '2032-03-12T23:46:58.567Z'
  },
  {
    id: '778',
    status: 'running',
    players: [
      { id: '23233', avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg', name: 'Patron', level: 13, dropsCards: [], wonDiamonds: 0 },
      { id: '23233', avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg', name: 'Patron', level: 13, dropsCards: [], wonDiamonds: 0 },
      { id: '23233', avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg', name: 'Patron', level: 13, dropsCards: [], wonDiamonds: 0 }],
    gameSetting: {
      rounds: 12,
      price: 17000,
      mode: { variant: '1v1v1', requiredPlayers: 3 },
      currentRound: 4
    },
    date: '2032-04-12T23:46:58.567Z'
  },
  {
    id: '790',
    status: 'ended',
    players: [
      { id: '23233', avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg', name: 'Patron', level: 13, dropsCards: [], wonDiamonds: 0 },
      { id: '23233', avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg', name: 'Patron', level: 13, dropsCards: [], wonDiamonds: 0 },
      { id: '23233', avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg', name: 'Patron', level: 13, dropsCards: [], wonDiamonds: 0 }],
    gameSetting: {
      rounds: 7,
      price: 17000,
      mode: { variant: '1v1v1', requiredPlayers: 3 }
    },
    date: '2032-04-12T23:46:58.567Z'
  },
  {
    id: '779',
    status: 'ended',
    players: [
      { id: '32323', avatar: 'https://cdn.dribbble.com/users/3175546/screenshots/11634060/media/abe23d862136d3a3cebe2c654b2a5ae6.png?compress=1&resize=400x300', name: 'Patron', level: 13, dropsCards: [], wonDiamonds: 0 },
      { id: '23233', avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg', name: 'Patron', level: 13, dropsCards: [], wonDiamonds: 0 },
      { id: '23233', avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg', name: 'Patron', level: 13, dropsCards: [], wonDiamonds: 0 },
      { id: '23233', avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg', name: 'Patron', level: 13, dropsCards: [], wonDiamonds: 0 }],
    gameSetting: {
      rounds: 5,
      price: 12000,
      mode: { variant: 'group', requiredPlayers: 4 },
      currentRound: 5
    },
    date: '2032-05-12T23:46:58.567Z'
  },
  {
    id: '7327',
    status: 'ended',
    players: [
      { id: '23233', avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg', name: 'Patron', level: 13, dropsCards: [], wonDiamonds: 0 },
      { id: '23233', avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg', name: 'Patron', level: 13, dropsCards: [], wonDiamonds: 0 }],
    gameSetting: {
      rounds: 5,
      price: 9900,
      mode: { variant: '1v1', requiredPlayers: 2 }
    },
    date: '2032-03-14T23:46:58.567Z'
  },
  {
    id: '777',
    status: 'running',
    players: [
      { id: '23233', avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg', name: 'Patron', level: 13, dropsCards: [], wonDiamonds: 0 },
      { id: 'd325', avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg', name: 'Patron', level: 13, dropsCards: [], wonDiamonds: 0 }],
    gameSetting: {
      rounds: 5,
      price: 9900,
      mode: { variant: '1v1', requiredPlayers: 2 },
      currentRound: 4
    },
    date: '2032-03-14T23:46:58.567Z'
  },
  {
    id: '7778',
    status: 'created',
    players: [
      { id: '435', avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg', name: 'Patron', level: 13, dropsCards: [], wonDiamonds: 0 },
      { id: 'd32345', avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg', name: 'Patron', level: 13, dropsCards: [], wonDiamonds: 0 }],
    gameSetting: {
      rounds: 5,
      price: 9900,
      mode: { variant: '1v1v1v1', requiredPlayers: 4 },
      currentRound: 4
    },
    date: '2032-11-14T23:46:58.567Z'
  },
  {
    id: '77786',
    status: 'running',
    players: [
      { id: '435', avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg', name: 'Patron', level: 13, dropsCards: [], wonDiamonds: 0 },
      { id: 'd32345', avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg', name: 'Patron', level: 13, dropsCards: [], wonDiamonds: 0 },
      { id: 'd32345', avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg', name: 'Patron', level: 13, dropsCards: [], wonDiamonds: 0 },
      { id: 'd32345', avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/553.jpg', name: 'Patron', level: 13, dropsCards: [], wonDiamonds: 0 }],
    gameSetting: {
      rounds: 7,
      price: 9900,
      mode: { variant: '2v2', requiredPlayers: 4 },
      currentRound: 4
    },
    date: '2032-11-14T23:46:58.567Z'
  }

]
