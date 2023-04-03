import { UserAvatar } from '../../user/UserAvatar'
import CoinFlipHead from '../../../assets/img/CoinFlipHead.png'
import CoinFlipTail from '../../../assets/img/CoinFlipTail.png'

interface CFUserInfoCellProps {
  userAvatar?: string
  coin: number
}

const CFUserInfoCell = ({ userAvatar = '', coin }: CFUserInfoCellProps) => {
  return (
    <div className='relative'>
      <UserAvatar
        image={userAvatar}
        className='h-14 w-14 border border-blue-highlight rounded overflow-hidden radial--blue'
      />
      <div className='absolute top-[0.46875rem] left-[3.25rem]'>
        {
        coin === 0
          ? (<img className='h-[2.5625rem] w-[2.5625rem]' src={CoinFlipHead} alt='head' />)
          : (<img className='h-[2.5625rem] w-[2.5625rem]' src={CoinFlipTail} alt='tail' />)
        }
      </div>
    </div>
  )
}

export default CFUserInfoCell
