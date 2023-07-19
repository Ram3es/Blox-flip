export enum RootBattleModeEnum {
  crazy = 'crazy',
  regular = 'regular'
}

export interface IRootBattleCaseItem {
  img: string
  name: string
  price: number
  id: number
}

export interface IRootBattlePlayer {
  id: number
  name: string
  avatar: string
  level: number
  place: number
}

export interface IRootBattleRoundItem {
  case: string
  item: string
  price: number
  slot: number
}

export interface IRootBattleResult {
  id: number
  round: number
  items: IRootBattleRoundItem[]
}

export interface IRootBattle {
  team: boolean
  gamemode: keyof typeof RootBattleModeEnum
  id: number
  state: 'open' | 'running' | 'ended'
  cost: number
  caselist: IRootBattleCaseItem[]
  result: IRootBattleResult[]
  players: IRootBattlePlayer[]
  max: number
  hash: string
}
