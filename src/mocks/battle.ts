import { IRootBattlePlayer } from '../types/CaseBattles'
import type { IItemCard, IUnboxCard } from '../types/ItemCard'

type TStatus = 'created' | 'running' | 'ended'
export type TMode = '1v1' | '1v1v1' | '1v1v1v1' | 'group' | '2v2'

export interface IBattleUser extends Omit<IRootBattlePlayer, 'progress'> {
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
