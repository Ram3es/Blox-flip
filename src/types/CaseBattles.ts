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
  gamemode: keyof typeof RootBattleModeEnum
  id: number
  state: keyof typeof RootBattleStateEnum
  cost: number
  caselist: IRootBattleCaseItem[]
  result: IRootBattleResult[]
  players: IRootBattlePlayer[]
  max: IRootMaximumPlayers
  hash: string
}

export enum DisplayedBattleModeEnum {
  '1v1' = '1v1',
  '1v1v1' = '1v1v1',
  '1v1v1v1' = '1v1v1v1',
  '2v2' = '2v2',
  'group' = 'group'
}
