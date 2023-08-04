import { RootBattleModeEnum } from '../types/CaseBattles'

export const CASE_BATTLE_SPINNER_TIME_SECONDS = 4.5
export const CASE_BATTLE_SPINNER_TIME_MILLISECONDS = CASE_BATTLE_SPINNER_TIME_SECONDS * 1000

export const CASE_BATTLE_ROUND_WINNER_TIME_SECONDS = 2
export const CASE_BATTLE_ROUND_WINNER_TIME_MILLISECONDS = CASE_BATTLE_ROUND_WINNER_TIME_SECONDS * 1000

export const CASE_BATTLE_ROUND_TIME_SECONDS = CASE_BATTLE_SPINNER_TIME_SECONDS + CASE_BATTLE_ROUND_WINNER_TIME_SECONDS
export const CASE_BATTLE_ROUND_TIME_MILLISECONDS = CASE_BATTLE_ROUND_TIME_SECONDS * 1000

export const DEFAULT_PLAYERS_VARIANTS = [
  { variant: '1v1' },
  { variant: '1v1v1' },
  { variant: '1v1v1v1' },
  { variant: '2v2' }
]

export const SHARED_PLAYERS_VARIANTS = [{ variant: '1v1' }, { variant: '1v1v1' }, { variant: '1v1v1v1' }]

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
