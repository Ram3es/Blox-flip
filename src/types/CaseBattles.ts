export enum IRootBattleModeEnum {
  crazy = 'crazy',
  regular = 'regular',
  group = 'group'
}

export enum IRootBattleStateEnum {
  open = 'open',
  playing = 'playing',
  done = 'done'
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

export type IRootMaximumPlayers = 2 | 3 | 4

export interface IRootBattle {
  team: boolean
  gamemode: keyof typeof IRootBattleModeEnum
  id: number
  state: keyof typeof IRootBattleStateEnum
  cost: number
  caselist: IRootBattleCaseItem[]
  result: IRootBattleResult[]
  players: IRootBattlePlayer[]
  max: IRootMaximumPlayers
  hash: string
}

export enum IDisplayedBattleModeEnum {
  '1v1' = '1v1',
  '1v1v1' = '1v1v1',
  '1v1v1v1' = '1v1v1v1',
  '2v2' = '2v2',
  'group' = 'group'
}
