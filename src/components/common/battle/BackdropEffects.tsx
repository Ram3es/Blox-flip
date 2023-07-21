import { FC, useMemo } from 'react'
import { IMAGES } from '../../../constants/images'
import { IRootBattlePlayer } from '../../../types/CaseBattles'

interface IBackdropEffects {
  statusGame: string
  isEndGame: boolean
  player?: IRootBattlePlayer
  winningCard?: string
}

const BackdropEffects: FC<IBackdropEffects> = ({ statusGame, player, winningCard, isEndGame }) => {
  const getBackdropStars = (image: string) => {
    switch (image) {
      case 'horns':
        return (
          <img
            src={IMAGES.redStarBackdrop}
            alt="gray-backdrop"
            width="206"
            height="300"
            loading="lazy"
            decoding="async"
            className="w-full h-full max-w-full z-10 relative"
          />
        )
      case 'redCrown':
        return (
          <img
            src={IMAGES.redStarBackdrop}
            alt="gray-backdrop"
            width="206"
            height="300"
            loading="lazy"
            decoding="async"
            className="w-full h-full max-w-full z-10 relative"
          />
        )
      case 'helmet':
        return (
          <img
            src={IMAGES.orangeStarBackdrop}
            alt="gray-backdrop"
            width="206"
            height="300"
            loading="lazy"
            decoding="async"
            className="w-full h-full max-w-full z-10 relative"
          />
        )
      default:
        return (
          <img
            src={IMAGES.greenBackdrop}
            alt="green-backdrop"
            width="206"
            height="300"
            loading="lazy"
            decoding="async"
            className="w-full h-full max-w-full z-10 relative"
          />
        )
    }
  }

  const renderBackdrop = useMemo(() => winningCard && getBackdropStars(winningCard), [winningCard])

  return (
    <div className="relative z-10 h-[380px]">
      {statusGame === 'created' && (
        <img
          src={player ? IMAGES.greenBackdrop : IMAGES.grayBackdrop}
          alt="green-backdrop"
          width="206"
          height="300"
          loading="lazy"
          decoding="async"
          className="w-full h-full max-w-full z-10 relative"
        />
      )}
      {statusGame !== 'created' &&
        !isEndGame &&
        (renderBackdrop ?? (
          <img
            src={IMAGES.grayBackdrop}
            alt="green-backdrop"
            width="206"
            height="300"
            loading="lazy"
            decoding="async"
            className=" w-full h-full max-w-full z-10 relative"
          />
        ))}
    </div>
  )
}

export default BackdropEffects
