import { IItemCard } from './ItemCard'

export interface IKingPlayer {
  id: string
  name: string
  avatar: string
  level: number
  value: number
  players_skins: IItemCard[]
}

export interface IKingChampion {
  id: string
  round: number
  champion: IKingPlayer
  challenger: IKingPlayer
  end: number
  time: number
}

export interface IKingHistory {
  id: string
  round: number
  hash: string
  champion: IKingPlayer
  challenger: IKingPlayer
  winner: IKingPlayer
}

export interface IKingWeapon {
  1: 'sword'
  2: 'knife'
  3: 'flaming_sword'
  4: 'pistol'
  5: 'automatic_weapon'
}

export type IKingWeaponKey = keyof IKingWeapon
export type IKingAnimationType = IKingWeapon[IKingWeaponKey]

export interface IKingFight {
  attacker: 'champion' | 'challenger'
  weapon: IKingWeaponKey
  attack: number
}
