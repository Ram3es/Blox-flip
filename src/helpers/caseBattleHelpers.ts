import {
  IDisplayedBattleModeEnum,
  IRootBattle,
  IRootBattleModeEnum,
  IRootMaximumPlayers
} from '../types/CaseBattles'

export const getDisplayedModeByGame = (game: IRootBattle) => {
  if (!game.team) {
    if (game.max === 2) {
      return IDisplayedBattleModeEnum['1v1']
    }
    if (game.max === 3) {
      return IDisplayedBattleModeEnum['1v1v1']
    }
    if (game.max === 4) {
      return IDisplayedBattleModeEnum['1v1v1v1']
    }
  }

  if (game.team && game.max === 4) {
    return IDisplayedBattleModeEnum['2v2']
  }

  if (game.gamemode === IRootBattleModeEnum.group) {
    return IDisplayedBattleModeEnum.group
  }
}

export const getParticipantsByDisplayMode = (
  mode: Exclude<IDisplayedBattleModeEnum, IDisplayedBattleModeEnum.group>
): IRootMaximumPlayers => {
  return mode === IDisplayedBattleModeEnum['1v1']
    ? 2
    : mode === IDisplayedBattleModeEnum['1v1v1']
      ? 3
      : 4
}
