import { QuantityCoins } from '../../components/common/QuantityCoins/QuantityCoins'
import { UserAvatar } from '../../components/user/UserAvatar'

import KingIcon from '../../assets/img/king_icon.png'
import { ISecondUser } from '../../types/User'
import clsx from 'clsx'

interface KingGameHistoryPlayerProps {
  user?: ISecondUser
  isKing?: boolean
}

const KingGameHistoryPlayer = ({ user, isKing }: KingGameHistoryPlayerProps) => {
  return (
    <div
      className={clsx('flex items-center justify-between gap-2', {
        'flex-row': isKing,
        'flex-row-reverse': !isKing
      })}
    >
      <div
        className={clsx('rounded', {
          relative: isKing
        })}
      >
        <UserAvatar className='w-14 h-14' />
        {isKing && <img src={KingIcon} className='w-10 h-8 absolute bottom-10 right-6' />}
      </div>
      <QuantityCoins quantity={1500} />
    </div>
  )
}

export default KingGameHistoryPlayer
