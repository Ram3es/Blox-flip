import {
  DisplayedBattleModeEnum,
  IRootBattle,
  RootBattleModeEnum,
  IRootMaximumPlayers
} from '../types/CaseBattles'

export const getDisplayedModeByGame = (game: IRootBattle): DisplayedBattleModeEnum => {
  if (!game.team && game.mode !== DisplayedBattleModeEnum.shared) {
    if (game.max === 2) {
      return DisplayedBattleModeEnum['1v1']
    }
    if (game.max === 3) {
      return DisplayedBattleModeEnum['1v1v1']
    }
    if (game.max === 4) {
      return DisplayedBattleModeEnum['1v1v1v1']
    }
  }

  if (game.team && game.max === 4) {
    return DisplayedBattleModeEnum['2v2']
  }

  if (game.mode === RootBattleModeEnum.shared) {
    return DisplayedBattleModeEnum.shared
  }

  return DisplayedBattleModeEnum['1v1']
}

export const getParticipantsByDisplayMode = (
  mode: keyof typeof DisplayedBattleModeEnum
): IRootMaximumPlayers => {
  return mode === DisplayedBattleModeEnum['1v1']
    ? 2
    : mode === DisplayedBattleModeEnum['1v1v1']
      ? 3
      : 4
}
