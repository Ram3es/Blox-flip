import { useEffect, useState } from 'react'

import clsx from 'clsx'

import { UserAvatar } from '../../user/UserAvatar'
import { GameStatus } from '../../../types/enums'
import { Button } from '../../base/Button'

import DiamondIcon from '../../icons/DiamondIcon'
import PreviewIcon from '../../icons/PreviewIcon'

import CoinFlipHead from '../../../assets/img/CoinFlipHead.png'
import CoinFlipTail from '../../../assets/img/CoinFlipTail.png'

import { Coin } from '../../../types/CoinFlip'
import { useCoinFlip } from '../../../store/CoinFlipStore'

interface CFStatusCellProps {
  status: keyof typeof GameStatus
  coin?: Coin
  gameId: string
}

interface CoinFlipButtonWithTimerProps {
  avatar?: string
  timer?: number
}

interface CoinFlipJoinButtonProps {
  gameId: string
}

const CFJoinButton = ({ gameId }: CoinFlipJoinButtonProps) => {
  const { setIsOpenJoinGame } = useCoinFlip()

  return (
    <Button variant='Gradient' onClick={() => setIsOpenJoinGame(true)}>
      <div className='flex items-center justify-center h-10 w-[5.5rem]'>
        <span className='w-4 shrink-0 relative text-white'>
          <DiamondIcon width='16' height='12' />
        </span>
        <span className='pl-2'>Join</span>
      </div>
    </Button>
  )
}

const CFButtonWithTimer = ({ avatar = '', timer = 30 }: CoinFlipButtonWithTimerProps) => {
  const [timeToEnd, setTimeToEnd] = useState<number>(timer)

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeToEnd((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(countdown)
          return 0
        }
        return prevTimer - 1
      })
    }, 1000)

    return () => {
      clearInterval(countdown)
    }
  }, [timer])

  return (
    <Button variant='Outlined'>
      <div className='flex items-center justify-center w-[9.5rem] h-10'>
        <div className='w-6 h-6 border border-blue-highlight rounded overflow-hidden radial--blue'>
          <UserAvatar image={avatar} />
        </div>
        <p className='font-bold text-sm text-green-primary pl-2'>
          Joining in <span className='text-white'>{timeToEnd}s</span>
        </p>
      </div>
    </Button>
  )
}

const CFButtonWinner = ({ coin }: { coin: Coin }) => {
  return (
    <Button disabled variant={coin === 0 ? 'YellowOutlinedSecondary' : 'BlueOutlined'}>
      <div className='flex items-center justify-center w-28 h-10'>
        <img className='h-6 w-6' src={coin === 0 ? CoinFlipHead : CoinFlipTail} alt='head' />
        <span
          className={clsx('text-sm font-bold pl-2', {
            'text-orange-primary': coin === 0,
            'text-blue-golf': coin === 1
          })}
        >
          Winner
        </span>
      </div>
    </Button>
  )
}

const CFStatusCell = ({ status, coin, gameId }: CFStatusCellProps) => {
  const { setIsOpenWatchedGame } = useCoinFlip()

  const getCurrentButtonByStatus = () => {
    if (status === 'Created') {
      return <CFJoinButton gameId='uh1o1i24k124' />
    }

    if (status === 'Ended' && (coin === 0 || coin === 1)) {
      return <CFButtonWinner coin={coin} />
    }

    if (status === 'Running') {
      return <CFButtonWithTimer />
    }
    return null
  }

  return (
    <div className='flex items-center justify-end'>
      {getCurrentButtonByStatus()}
      <Button
        onClick={() => setIsOpenWatchedGame(true)}
        className='leading-10 ml-2 w-8 h-8 hidden xxs:flex xs:h-10 xs:w-10 shrink-0 rounded bg-blue-accent-secondary hover:bg-blue-accent text-gray-primary'
      >
        <PreviewIcon iconClasses='mx-auto my-auto' />
      </Button>
    </div>
  )
}

export default CFStatusCell
