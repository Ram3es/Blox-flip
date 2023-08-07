import { IRootCaseItem } from './Cases'

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
export interface IRootBattleCaseItem extends IRootCaseItem {
  num: number
}

export interface IRootBattlePlayer {
  id: string
  name: string
  avatar: string
  level: number
  place: number
  value?: number
}

export interface IRootGameWinner extends IRootBattlePlayer {
  value: number
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
  drops: IRootBattleRoundItem[]
}

export type IRootMaximumPlayers = 2 | 3 | 4

export interface IRootBattle {
  caselist: IRootBattleCaseItem[]
  cost: number
  hash: string
  id: string
  max: IRootMaximumPlayers
  mode: keyof typeof RootBattleModeEnum
  players: IRootBattlePlayer[]
  result: IRootBattleResultHistory[]
  state: keyof typeof RootBattleStateEnum
  team: boolean
  winners: IRootBattlePlayer[]
  joining?: boolean
}

export interface IRootJoinBattle {
  id: string
  user: IRootBattlePlayer
}

export enum DisplayedBattleModeEnum {
  '1v1' = '1v1',
  '1v1v1' = '1v1v1',
  '1v1v1v1' = '1v1v1v1',
  '2v2' = '2v2',
  'shared' = 'shared'
}
