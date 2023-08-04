export enum RootBattleModeEnum {
  regular = 'regular',
  crazy = 'crazy',
  shared = 'shared'
}

export enum RootBattleStateEnum {
  open = 'open',
  playing = 'playing',
  done = 'done'
}
export interface IRootBattleCaseItem {
  image: string
  name: string
  price: number
  short: string
  num: number
}

export interface IRootBattlePlayer {
  id: string
  name: string
  avatar: string
  level: number
  place: number
}

export interface IRootBattleRoundItem {
  case: string
  cost: number
  odds: number
  skin_image: string
  skin_name: string
  user: IRootBattlePlayer
}

export interface IRootBattleResult {
  id: string
  round: number
  results: IRootBattleRoundItem[]
}

export interface IRootBattleResultHistory {
  id: string
  drops: IRootBattleRoundItem
}

export type IRootMaximumPlayers = 2 | 3 | 4

export interface IRootBattle {
  team: boolean
  mode: keyof typeof RootBattleModeEnum
  id: string
  state: keyof typeof RootBattleStateEnum
  cost: number
  caselist: IRootBattleCaseItem[]
  result: IRootBattleResultHistory[]
  players: IRootBattlePlayer[]
  max: IRootMaximumPlayers
  hash: string
  winner: IRootBattlePlayer[]
  joining: boolean
}

export enum DisplayedBattleModeEnum {
  '1v1' = '1v1',
  '1v1v1' = '1v1v1',
  '1v1v1v1' = '1v1v1v1',
  '2v2' = '2v2',
  'shared' = 'shared'
}
