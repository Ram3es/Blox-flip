export enum BetMode {
  Manual = 'Manual',
  Automatic = 'Automatic'
}

export interface BetToolkit {
  label: string
  function: () => void
}

export type RowVariant = 8 | 10 | 12 | 14 | 16
