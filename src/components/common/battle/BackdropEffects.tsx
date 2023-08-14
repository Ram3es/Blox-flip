import { FC, useMemo } from 'react'
import { IMAGES } from '../../../constants/images'
import { IRootBattle, IRootBattleResultHistory, IRootBattleRoundItem } from '../../../types/CaseBattles'

interface IBackdropEffects {
  game: IRootBattle
  playerIndex: number
  currentRound: IRootBattleResultHistory | null
  isVisibleEffects: boolean
}

const BackdropEffects: FC<IBackdropEffects> = ({ game, playerIndex, isVisibleEffects, currentRound }) => {
  const getBackdropByItem = (item: IRootBattleRoundItem) => {
    return (
      <img
        src={
          item.cost >= 150
            ? IMAGES.redStarBackdrop
            : item.cost >= 100
              ? IMAGES.orangeStarBackdrop
              : item.cost < 100
                ? IMAGES.greenBackdrop
                : IMAGES.grayBackdrop
        }
        alt="backdrop"
        width="206"
        height="300"
        loading="lazy"
        decoding="async"
        className="w-full h-full max-w-full z-10 relative"
      />
    )
  }

  const renderBackdrop = useMemo(
    () => currentRound && getBackdropByItem(currentRound.drops[playerIndex]),
    [currentRound]
  )

  return (
    <div className="relative z-10 h-[380px]">
      {game.state === 'open' && (
        <img
          src={game.players[playerIndex] ? IMAGES.greenBackdrop : IMAGES.grayBackdrop}
          alt="backdrop"
          width="206"
          height="300"
          loading="lazy"
          decoding="async"
          className="w-full h-full max-w-full z-10 relative"
        />
      )}
      {game.state === 'playing' &&
        (isVisibleEffects
          ? renderBackdrop
          : <img
            src={IMAGES.grayBackdrop}
            alt="backdrop"
            width="206"
            height="300"
            loading="lazy"
            decoding="async"
            className=" w-full h-full max-w-full z-10 relative"
          />
        )}
    </div>
  )
}

export default BackdropEffects
