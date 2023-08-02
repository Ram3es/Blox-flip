import { RootBattleModeEnum } from '../types/CaseBattles'

export const DEFAULT_PLAYERS_VARIANTS = [
  { variant: '1v1' },
  { variant: '1v1v1' },
  { variant: '1v1v1v1' },
  { variant: '2v2' }
]

export const SHARED_PLAYERS_VARIANTS = [
  { variant: '1v1' },
  { variant: '1v1v1' },
  { variant: '1v1v1v1' }
]

export const PLAYERS_VARIANTS_TABS = {
  label: 'Players :',
  name: 'gameMode'
}

export const GAME_MODE_TABS = {
  label: 'Game modes :',
  name: 'gameType',
  tabs: (Object.keys(RootBattleModeEnum) as Array<keyof typeof RootBattleModeEnum>).map((key) => ({
    variant: key
  }))
}

export const PRIVACY_TABS = {
  label: 'Privacy :',
  name: 'policy',
  tabs: [{ variant: 'public' }, { variant: 'private' }]
}
