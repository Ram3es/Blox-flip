import { DisplayedBattleModeEnum, RootBattleModeEnum } from '../types/CaseBattles'

export const DISPLAYED_BATTLE_CONFIG: Array<{
  label: string
  name: string
  tabs: Array<{ variant: string }>
}> = [
  {
    label: 'Players :',
    name: 'gameMode',
    tabs: (Object.keys(DisplayedBattleModeEnum) as Array<keyof typeof DisplayedBattleModeEnum>)
      .map((key) => ({ variant: key }))
      .filter((item) => item.variant !== 'group')
  },
  {
    label: 'Game modes :',
    name: 'gameType',
    tabs: (Object.keys(RootBattleModeEnum) as Array<keyof typeof RootBattleModeEnum>).map((key) =>
      key === RootBattleModeEnum.regular ? { variant: 'standard' } : { variant: key }
    )
  },
  {
    label: 'Privacy :',
    name: 'policy',
    tabs: [{ variant: 'public' }, { variant: 'private' }]
  }
]
