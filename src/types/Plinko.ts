export enum BetMode {
  Manual = 'Manual',
  Automatic = 'Automatic'
}

export type RowVariant = 8 | 10 | 12 | 14 | 16

export interface PlinkoContext {
  isStarted: boolean
  paths: number[][] | null
}
