import { UserAvatar } from '../../user/UserAvatar'
import CoinFlipHead from '../../../assets/img/CoinFlipHead.png'
import CoinFlipTail from '../../../assets/img/CoinFlipTail.png'

interface CFUserInfoCellProps {
  userAvatar?: string
  coin: number
}

const CFUserInfoCell = ({ userAvatar = '', coin }: CFUserInfoCellProps) => {
  return (
    <div className='relative min-w-[6rem]'>
      <UserAvatar
        image={userAvatar}
        className='h-14 w-14 border border-blue-highlight rounded radial--blue'
      />
      <div className='absolute top-[0.46875rem] left-[3.25rem]'>
        <img src={coin === 0 ? CoinFlipHead : CoinFlipTail} alt={coin === 0 ? 'head' : 'tail'} />
      </div>
    </div>
  )
}

export default CFUserInfoCell
