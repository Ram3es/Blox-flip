import { forwardRef, useMemo } from 'react'

import clsx from 'clsx'

import AvatarWithUsername from '../../components/common/AvatarWithUsername'
import CoinFlipLogoIcon from '../../components/icons/CoinFlipLogoIcon'

// import SkinBigIcon from '../../assets/img/skin_big.png'
import VersusBattleIcon from '../../assets/img/versus_battle.png'
import QuestionMark from '../../assets/img/question_mark.svg'
import CoinsWithDiamond from '../../components/common/CoinsWithDiamond'

interface CoinFlipGameHeaderProps {
  withBot?: boolean
}

const CoinFlipGameHeader = forwardRef<HTMLDivElement, CoinFlipGameHeaderProps>(
  ({ withBot }, ref) => {
    const coinSide = useMemo(() => Math.floor(Math.random() * 2), [])

    const skinIconClasses = clsx(
      'flex z-40 absolute top-[-20%] xs:left-[40%] xs:top-[-14%] border--coinflip-game w-32 xs:w-[167px] h-32 xs:h-[167px] items-center justify-center',
      {
        grayscale: withBot
      }
    )

    return (
      <div className='px-4 flex flex-col xs:flex-row justify-between items-center space-y-2 xs:space-y-0 xs:space-x-4 pb-4 xs:pr-10'>
        <div className='flex items-center justify-center space-x-2 xs:space-x-6 text-lg font-bold'>
          <div className='flex border--coinflip-game w-8 h-8 items-center justify-center'>
            <CoinFlipLogoIcon />
          </div>
          <div className='flex items-center'>
            <span className='hidden xxs:block'>CF&nbsp;</span>
            <span className='text-orange-primary-light'>#13</span>
          </div>
          <CoinsWithDiamond
            containerColor='GreenGradient'
            containerSize='Large'
            typographyQuantity={14214.51}
          />
        </div>
        <div className={skinIconClasses}>
          <div className=' relative w-full h-full'>
            <div className={`${coinSide ? 'blue' : 'white'} coinflip-animation absolute -top-[100%] -left-[100%] `} />
          </div>

          {/* <img src={SkinBigIcon} alt='skin' /> */}
        </div>
        <div className='z-100 absolute hidden left-[45.2%] md:left-[46.4%] xs:top-[62%] bg-rectangle--yellow w-10 h-10 xs:flex items-center justify-center'>
          <img className='rotate-[-48deg]' src={VersusBattleIcon} alt='versus' />
        </div>
        <div className='sm:w-96 flex justify-center items-center'>
          <AvatarWithUsername username='Brrrrrra' avatar='' />
          <span className='mx-6'>
            <img src={VersusBattleIcon} alt='versus' />
          </span>
          <AvatarWithUsername
            ref={ref}
            username={withBot ? '...' : 'Brrrrrra'}
            avatar={withBot ? QuestionMark : ''}
          />
        </div>
      </div>
    )
  }
)

CoinFlipGameHeader.displayName = 'CoinFlipGameHeader'

export default CoinFlipGameHeader
