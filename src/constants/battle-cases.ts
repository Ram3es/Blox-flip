import { IDisplayedBattleModeEnum, IRootBattleModeEnum } from '../types/CaseBattles'

export const DISPLAYED_BATTLE_CONFIG: Array<{
  label: string
  name: string
  tabs: Array<{ variant: string }>
}> = [
  {
    label: 'Players :',
    name: 'gameMode',
    tabs: (Object.keys(IDisplayedBattleModeEnum) as Array<keyof typeof IDisplayedBattleModeEnum>)
      .map((key) => ({ variant: key }))
      .filter((item) => item.variant !== 'group')
  },
  {
    label: 'Game modes :',
    name: 'gameType',
    tabs: (Object.keys(IRootBattleModeEnum) as Array<keyof typeof IRootBattleModeEnum>).map((key) =>
      key === IRootBattleModeEnum.regular ? { variant: 'standard' } : { variant: key }
    )
  },
  {
    label: 'Privacy :',
    name: 'policy',
    tabs: [{ variant: 'public' }, { variant: 'private' }]
  }
]
