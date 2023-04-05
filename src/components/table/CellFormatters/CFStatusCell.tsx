import { GameStatus } from '../../../types/enums'
import { Button } from '../../base/Button'
import DiamondIcon from '../../icons/DiamondIcon'
import PreviewIcon from '../../icons/PreviewIcon'
import CoinFlipHead from '../../../assets/img/CoinFlipHead.png'
import CoinFlipTail from '../../../assets/img/CoinFlipTail.png'
import { UserAvatar } from '../../user/UserAvatar'
import { useState } from 'react'
import CoinFlipLobby from '../../../pages/CoinFlip/CoinFlipLobby'

interface CFStatusCellProps {
  status: keyof typeof GameStatus
  coin?: number
}

const ButtonWithTimer = () => {
  return (
    <Button variant='Outlined'>
      <div className='flex items-center px-3.5 py-2.5'>
        <div className='w-6 h-6 border border-blue-highlight rounded overflow-hidden radial--blue'>
          <UserAvatar />
        </div>
        <p className='font-bold text-sm text-green-primary pl-2'>
          Joining in <span className='text-white'>12s</span>
        </p>
      </div>
    </Button>
  )
}

const CFStatusCell = ({ status, coin = 1 }: CFStatusCellProps) => {
  const [isOpenJoinCF, setIsOpenJoinCF] = useState(false)

  const getCurrentButtonByStatus = () => {
    if (status === 'Created') {
      return (
        <Button disabled variant='Gradient'>
          <div className='flex items-center justify-between px-5 py-2.5'>
            <span className='w-4 shrink-0 mx-auto relative text-white'>
              <DiamondIcon width='16' height='12' />
            </span>
            <span className='pl-2'>Join</span>
          </div>
        </Button>
      )
    }

    if (status === 'Ended' && coin === 0) {
      return (
        <Button disabled variant='YellowOutlinedSecondary'>
          <div className='flex items-center justify-center px-5 py-2'>
            <img className='h-6 w-6' src={CoinFlipHead} alt='head' />
            <span className='text-orange-primary-light text-sm font-bold pl-2'>Winner</span>
          </div>
        </Button>
      )
    }

    if (status === 'Ended' && coin === 1) {
      return (
        <Button variant='BlueOutlined' onClick={() => setIsOpenJoinCF(true)}>
          <div className='flex items-center justify-center px-5 py-2'>
            <img className='h-6 w-6' src={CoinFlipTail} alt='head' />
            <span className='text-blue-golf text-sm font-bold pl-2'>Winner</span>
          </div>
        </Button>
      )
    }
  }

  return (
    <>
      <div className='flex items-center justify-end'>
        {getCurrentButtonByStatus()}
        <Button className=' leading-10 ml-2 w-8 h-8 hidden xxs:flex xs:h-10 xs:w-10 shrink-0 rounded bg-blue-accent-secondary hover:bg-blue-accent text-gray-primary'>
          <PreviewIcon iconClasses='mx-auto my-auto' />
        </Button>
      </div>
      {isOpenJoinCF ? <CoinFlipLobby isCreated={true} onClose={() => setIsOpenJoinCF(false)} /> : null}
    </>
  )
}

export default CFStatusCell
