import { forwardRef, useMemo } from 'react'

import clsx from 'clsx'

import CoinFlipGameItems from './CoinFlipGameItems'
import WinPercent from '../../components/common/WinPercent'
import Image from '../../components/base/Image'

import SkinBigIcon from '../../assets/img/skin_big.png'
import YellowCoin from '../../assets/img/head_medium.png'
import PurpleCoin from '../../assets/img/CoinFlipTail.png'

import QuestionMark from '../../assets/img/question_mark.svg'

import CoinsWithDiamond from '../../components/common/CoinsWithDiamond'
import { useCoinFlip } from '../../store/CoinFlipStore'

export interface PlayerProps {
  opponent: boolean
}

const CoinFlipGamePlayer = forwardRef<HTMLDivElement, PlayerProps>(({ opponent }, ref) => {
  const { currentGame } = useCoinFlip()

  const getSideByCreator = useMemo(
    () =>
      (opponent && currentGame?.creator?.coin === 0) ||
      (!opponent && currentGame?.creator?.coin === 1),
    [currentGame]
  )

  const containerClasses = clsx('w-2/4 h-[400px] xs:h-[420px]', {
    'bg-coinflip-game--orange': !opponent,
    'bg-coinflip-game--blue': opponent
  })

  const avatarClasses = clsx(
    'hidden xs:flex mt-[-55px] w-[117px] h-[117px] items-end justify-center border border-blue-highlight rounded-full overflow-hidden',
    {
      'bg-circle-avatar--yellow': !opponent,
      'bg-circle-avatar--blue': opponent
    }
  )

  return (
    <div ref={ref} className={containerClasses}>
      <div className='bg-blue-primary-secondary space-y-6 h-full'>
        <div className='mt-4 xs:mt-20 flex xs:flex-row flex-col items-start justify-around'>
          <div className='mt-[-16px] xs:mx-0 mx-auto flex bg-green-third'>
            <CoinsWithDiamond
              containerColor='GreenGradient'
              typographyQuantity={
                !opponent ? currentGame?.creator.value ?? null : currentGame?.joining?.value ?? null
              }
              typographyFontSize='Size16'
            />
          </div>
          <div className={avatarClasses}>
            <div className='w-21 h-21'>
              <Image
                image={
                  !opponent ? currentGame?.creator.avatar ?? '' : currentGame?.joining?.avatar ?? ''
                }
              />
            </div>
          </div>
          <div className='ml-1 xs:ml-0 xs:mt-[-24px] xs:space-y-3 text-center'>
            <span className='text-base font-bold'>
              {!opponent ? currentGame?.creator.name ?? '' : currentGame?.joining?.name ?? ''}
            </span>
            <WinPercent
              percent={
                !opponent ? currentGame?.creator.chance ?? 50 : currentGame?.joining?.chance ?? 50
              }
            />
          </div>
        </div>
        <div className='relative'>
          <div className='absolute top-[-74px] right-2 xs:right-[80px] xs:top-[-155px] sm:right-[145px]'>
            <img
              src={getSideByCreator ? YellowCoin : PurpleCoin}
              className='w-12 h-12 xs:w-14 xs:h-14'
              alt='coinflip coin'
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
