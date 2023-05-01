import clsx from 'clsx'

import { QuantityCoins } from '../../components/common/QuantityCoins/QuantityCoins'
import Image from '../../components/base/Image'

import KingIcon from '../../assets/img/king_icon.png'

import type { ISecondUser } from '../../types/User'

interface KingHistoryPlayerProps {
  user?: ISecondUser
  isKing?: boolean
}

const KingHistoryPlayer = ({ user, isKing }: KingHistoryPlayerProps) => {
  return (
    <div
      className={clsx('flex items-center justify-between gap-2', {
        'flex-row ': isKing,
        'flex-row-reverse': !isKing
      })}
    >
      <div
        className={clsx('p-1.5 rounded-lg', {
          'gradient-background--yellow gradient-border--yellow': isKing,
          'gradient-background--blue': !isKing
        })}
      >
        <Image className='w-11 h-10' />
        {isKing && <img src={KingIcon} className='w-10 h-8 absolute bottom-9 right-7' />}
      </div>
      <QuantityCoins quantity={1500} />
    </div>
  )
}

export default KingHistoryPlayer
