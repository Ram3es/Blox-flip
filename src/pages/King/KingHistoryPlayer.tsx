import clsx from 'clsx'

import Image from '../../components/base/Image'

import KingIcon from '../../assets/img/king_icon.png'

import type { ISecondUser } from '../../types/User'
import IconContainer from '../../components/common/Coins/IconContainer'
import DiamondIcon from '../../components/icons/DiamondIcon'
import CoinsTypography from '../../components/common/Coins/CoinsTypography'
import CoinsContainer from '../../components/common/Coins/CoinsContainer'

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
      <CoinsContainer>
        <IconContainer color='GreenPrimary' size='Small'>
          <DiamondIcon />
        </IconContainer>
        <CoinsTypography quantity={1500} fontSize='Size14' />
      </CoinsContainer>
    </div>
  )
}

export default KingHistoryPlayer
