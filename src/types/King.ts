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

export enum KingWeaponEnum {
  SWORD = 'SWORD',
  KNIFE = 'KNIFE',
  FLAMING_SWORD = 'FLAMING_SWORD',
  PISTOL = 'PISTOL',
  AUTOMATIC_WEAPON = 'AUTOMATIC_WEAPON'
}

export interface IKingWeapon {
  1: keyof typeof KingWeaponEnum.SWORD
  2: keyof typeof KingWeaponEnum.KNIFE
  3: keyof typeof KingWeaponEnum.FLAMING_SWORD
  4: keyof typeof KingWeaponEnum.PISTOL
  5: keyof typeof KingWeaponEnum.AUTOMATIC_WEAPON
}

export type IKingWeaponKey = keyof IKingWeapon

export interface IKingFight {
  attacker: 'champion' | 'challenger'
  weapon: IKingWeaponKey
  attack: number
}
