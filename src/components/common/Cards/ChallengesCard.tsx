import { FC } from 'react'
import greenCheck from '../../../assets/img/circle-check-mark.svg'
import dartsGold from '../../../assets/img/darts-small.svg'
import ribbedGray from '../../../assets/img/ribbed-gray.png'

import clsx from 'clsx'
import CoinsTypography from '../Coins/CoinsTypography'
import IconContainer from '../Coins/IconContainer'
import CoinsContainer from '../Coins/CoinsContainer'
import DiamondIcon from '../../icons/DiamondIcon'

interface IChallengeCardProps {
  isClaimed?: boolean
  price: number
  image: string
  openModal?: Function
  wrapClasses?: string
}

const ChallengesCard: FC<IChaleendgCardProps> = ({
  wrapClasses,
  price,
  isClaimed,
  image,
  openModal
}) => {
  const borderColor = clsx(
    'w-full h-[250px] challenges--mask border mt-10 relative rounded-lg cursor-pointer',
    {
      'challenge-card-border-gold': !isClaimed
    }
  )
  const cardGradient = clsx('absolute inset-0 w-full h-full z-10 rounded-[10px]', {
    'gradient-challenge--darkgreen': isClaimed,
    'gradient-challenge--gold': !isClaimed
  })
  return (
    <div
      className={
        wrapClasses ?? ' px-1 xxxs:px-2 w-1/2 xxxs:w-1/2 xxs:w-1/3 xs:w-1/4 md:w-1/5 flex shrink-0'
      }
    >
      <div onClick={() => openModal?.()} className={`${borderColor} `}>
        <div className={cardGradient}>
          <div className='flex flex-col gap-2 items-center justify-between absolute pt-6 pb-4  w-full h-full z-20'>
            <div className='w-full shrink-0 pb-[70%] h-0 relative mb-1.5'>
              <img src={image} alt='game' className='absolute object-contain w-full h-full' />
            </div>
            <div className='flex flex-col items-center '>
              <span className='text-[20px] text-gradient-gold font-bold'>
                {isClaimed ? 'Rewarded' : 'Rewards'}
              </span>
              <CoinsContainer color='Transparent'>
                <IconContainer color='GreenPrimary' size='Small'>
                  <DiamondIcon />
                </IconContainer>
                <CoinsTypography quantity={price} fontSize='Size17' />
              </CoinsContainer>
            </div>
          </div>
          <img
            src={ribbedGray}
            alt='Tq'
            className=' w-full h-full backdrop-invert-[0.5] opacity-[0.05]'
          />
        </div>
        <img
          src={!isClaimed ? dartsGold : greenCheck}
          alt='card-logo'
          className='absolute z-10 -top-[17px] left-[calc(50%-14px)]'
        />
      </div>
    </div>
  )
}

export default ChallengesCard
