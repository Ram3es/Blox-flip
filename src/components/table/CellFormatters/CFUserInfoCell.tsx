import Image from '../../base/Image'
import CoinFlipHead from '../../../assets/img/coinflip/coinflip-white-placeholder.png'
import CoinFlipTail from '../../../assets/img/coinflip/coinflip-blue-placeholder.png'

interface CFUserInfoCellProps {
  userAvatar: string
  coin: number
}

const CFUserInfoCell = ({ userAvatar, coin }: CFUserInfoCellProps) => {
  return (
    <div className='relative min-w-[6rem]'>
      <Image
        image={userAvatar}
        className='h-14 w-14 border border-blue-highlight rounded radial--blue'
      />
      <div className='absolute top-[0.46875rem] left-[4rem]'>
        <img src={coin === 0 ? CoinFlipHead : CoinFlipTail} className='w-11 h-auto' alt={coin === 0 ? 'head' : 'tail'} />
      </div>
    </div>
  )
}

export default CFUserInfoCell
