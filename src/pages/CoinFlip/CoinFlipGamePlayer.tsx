import { forwardRef, useMemo } from 'react'

import clsx from 'clsx'

import CoinFlipGameItems from './CoinFlipGameItems'
import WinPercent from '../../components/common/WinPercent'
import Image from '../../components/base/Image'

import YellowCoin from '../../assets/img/coinflip/YellowCoin.png'
import PurpleCoin from '../../assets/img/coinflip/PurpleCoin.png'

import CoinsWithDiamond from '../../components/common/CoinsWithDiamond'
import { useCoinFlip } from '../../store/CoinFlipStore'

export interface PlayerProps {
  opponent: boolean
}

const CoinFlipGamePlayer = forwardRef<HTMLDivElement, PlayerProps>(({ opponent }, ref) => {
  const { currentGame } = useCoinFlip()

  const isCreatorSide = useMemo(
    () =>
      (!opponent && currentGame?.creator.coin === 0) ||
      (opponent && currentGame?.creator.coin === 1),
    [currentGame]
  )

  const containerClasses = clsx('w-2/4 h-[400px] xs:h-[420px]', {
    'bg-coinflip-game--orange': isCreatorSide,
    'bg-coinflip-game--blue': !isCreatorSide
  })

  const avatarClasses = clsx(
    'hidden relative sm:flex mt-[-55px] w-[117px] h-[117px] items-end justify-center border border-blue-highlight rounded-full z-1',
    {
      'bg-circle-avatar--yellow': isCreatorSide,
      'bg-circle-avatar--blue': !isCreatorSide
    }
  )

  return (
    <div ref={ref} className={containerClasses}>
      <div className='sm:bg-blue-primary-secondary space-y-6 h-full'>
        <div className='mt-4 xs:mt-20 flex xs:flex-row flex-col items-center gap-4 sm:gap-0 sm:items-start justify-around'>
          <div className='sm:mt-[-16px] xs:mx-0 mx-auto flex bg-green-third'>
            <CoinsWithDiamond
              containerColor='GreenGradient'
              typographyQuantity={
                !opponent ? currentGame?.creator.value ?? null : currentGame?.joining?.value ?? null
              }
              typographyFontSize='Size16'
            />
          </div>
          <div className={avatarClasses}>
            <div className='w-21 h-21 rounded-full overflow-hidden'>
              <Image
                image={
                  !opponent ? currentGame?.creator.avatar ?? '' : currentGame?.joining?.avatar ?? ''
                }
              />
            </div>
            <img
              src={isCreatorSide ? YellowCoin : PurpleCoin}
              className='w-14 h-14 absolute top-0 -right-[28px] z-10'
              alt='coinflip coin'
              style={{
                filter: `drop-shadow(0px 0px 25px ${
                  isCreatorSide ? 'rgba(255, 203, 69, 0.47)' : 'rgba(124, 80, 233, 0.47)'
                } )`
              }}
            />
          </div>
          <img
            src={isCreatorSide ? YellowCoin : PurpleCoin}
            className='sm:hidden w-12 h-12'
            alt='coinflip coin'
            style={{
              filter: `drop-shadow(0px 0px 25px ${
                isCreatorSide ? 'rgba(255, 203, 69, 0.47)' : 'rgba(124, 80, 233, 0.47)'
              } )`
            }}
          />
          <div className='ml-1 xs:ml-0 xs:mt-[-24px] max-w-[120px] truncate xs:space-y-3 text-center'>
            <span className='text-base font-bold '>
              {!opponent ? currentGame?.creator.name ?? '' : currentGame?.joining?.name ?? ''}
            </span>
            <WinPercent
              percent={
                !opponent ? currentGame?.creator.chance ?? 50 : currentGame?.joining?.chance ?? 50
              }
            />
          </div>
        </div>
        <div className='hidden xs:block border-b border-blue-accent ml-4 mr-7' />
        <div className='h-full w-full pr-6'>
          <CoinFlipGameItems
            items={!opponent ? currentGame?.creator.skins ?? [] : currentGame?.joining?.skins ?? []}
          />
        </div>
      </div>
    </div>
  )
})

CoinFlipGamePlayer.displayName = 'CoinFlipGamePlayer'

export default CoinFlipGamePlayer
