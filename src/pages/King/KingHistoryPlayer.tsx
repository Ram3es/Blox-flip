import clsx from 'clsx'

import Image from '../../components/base/Image'
import CoinsWithDiamond from '../../components/common/CoinsWithDiamond'

import KingIcon from '../../assets/img/king_icon.png'

import { IKingPlayer } from '../../types/King'

interface KingHistoryPlayerProps {
  player: IKingPlayer
  isKing?: boolean
}

const KingHistoryPlayer = ({ player, isKing }: KingHistoryPlayerProps) => {
  return (
    <div
      className={clsx('flex items-center justify-between gap-2', {
        'flex-row ': isKing,
        'flex-row-reverse': !isKing
      })}
    >
      <div
        className={clsx('p-1.5 w-14 h-14 rounded-lg', {
          'gradient-background--yellow gradient-border--yellow': isKing,
          'gradient-background--blue': !isKing
        })}
      >
        <Image image={player.avatar} className='w-full h-full rounded-lg' />
        {isKing && <img src={KingIcon} className='w-10 h-8 absolute bottom-9 right-7' />}
      </div>
      <CoinsWithDiamond
        iconContainerSize='Small'
        iconClasses='w-3'
        typographyQuantity={player.value}
      />
    </div>
  )
}

export default KingHistoryPlayer
