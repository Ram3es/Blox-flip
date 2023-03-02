export interface FilterVariant {
  name: string
  onClick: () => void
}

export enum TableVariant {
  Feed = 'Feed',
  History = 'History',
  Stats = 'Stats'
}
