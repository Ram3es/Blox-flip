import React, { FC } from 'react'
import greenCheck from '../../../assets/img/circle-check-mark.svg'
import dartsGold from '../../../assets/img/darts-small.svg'
import ribbedGray from '../../../assets/img/ribbed-gray.png'

import { QuantityCoinsWithChildren } from '../QuantityCoins/QuantityWithChildren'
import clsx from 'clsx'

interface IChaleendgCardProps {
  isClaimed?: boolean
  price: number
  image: string
}

const ChallengesCard: FC<IChaleendgCardProps> = ({ price, isClaimed, image }) => {
  const colorCard = clsx('w-full h-[250px] challenges--mask border mt-10 relative rounded-lg', {
    'challenge-card-border-gold': !isClaimed
  })
  const cardGradient = clsx('absolute inset-0 w-full h-full z-10 rounded-[10px]', {
    'gradient-challenge--darkgreen': isClaimed,
    'gradient-challenge--gold': !isClaimed
  })
  return (
      <div className=' px-1 xxxs:px-2 w-1/2 xxxs:w-1/2 xxs:w-1/3 xs:w-1/4 md:w-1/5 flex shrink-0'>
        <div className={`${colorCard} `}>
            <div className={cardGradient} >
              <div className='flex flex-col gap-2 items-center justify-between absolute pt-7 pb-2  w-full h-full z-20'>
                <img src={image} alt='game' width='150' height='150' className=' mx-auto absolute' />
                <div className='flex flex-col items-center mt-auto '>
                  <span className='text-[20px] text-gradient-gold font-bold'>{isClaimed ? 'Rewarded' : 'Rewards' }</span>
                  <QuantityCoinsWithChildren
                    quantityClasses='flex items-center text-base font-semibold  mt-2'
                    quantity={price}
                  />
                </div>
              </div>
              <img src={ribbedGray} alt='Tq' className=' w-full h-full backdrop-invert-[0.5] opacity-[0.05]' />
            </div>
          <img src={!isClaimed ? dartsGold : greenCheck } alt='card-logo' className='absolute z-10 -top-[17px] left-[calc(50%-14px)]' />
         </div>
        </div>
  )
}

export default ChallengesCard
