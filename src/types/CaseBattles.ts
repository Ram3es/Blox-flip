export enum RootBattleModeEnum {
  regular = 'regular',
  crazy = 'crazy',
  group = 'group'
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
  is_bot: boolean
  is_host: true
  name: string
  avatar: string
  level: number
  // ref_by: null | string
  slot: number
  value: number
}

export interface IRootBattleRoundItem {
  case: string
  item: string
  price: number
  slot: number
}

export interface IRootBattleResult {
  id: string
  round: number
  items: IRootBattleRoundItem[]
}

export type IRootMaximumPlayers = 2 | 3 | 4

export interface IRootBattle {
  team: boolean
  mode: keyof typeof RootBattleModeEnum
  id: string
  state: keyof typeof RootBattleStateEnum
  cost: number
  caselist: IRootBattleCaseItem[]
  result: IRootBattleResult[]
  players: IRootBattlePlayer[]
  max: IRootMaximumPlayers
  hash: string
  winner: IRootBattlePlayer[]
}

export enum DisplayedBattleModeEnum {
  '1v1' = '1v1',
  '1v1v1' = '1v1v1',
  '1v1v1v1' = '1v1v1v1',
  '2v2' = '2v2',
  'group' = 'group'
}
