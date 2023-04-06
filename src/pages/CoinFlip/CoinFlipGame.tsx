import { Dispatch, SetStateAction, useState } from 'react'

import ModalWrapper from '../../components/containers/ModalWrapper'
import CoinFlipGamePlayer from './CoinFlipGamePlayer'
import AvatarWithUsername from '../../components/common/AvatarWithUsername'
import QuantityCoinsContainer from '../../components/common/QuantityCoins/QuantityCoinsContainer'
import { QuantityCoins } from '../../components/common/QuantityCoins/QuantityCoins'

import CoinFlipLogoIcon from '../../components/icons/CoinFlipLogoIcon'

import SkinBigIcon from '../../assets/img/skin_big.png'
import VersusBattleIcon from '../../assets/img/versus_battle.png'

interface CoinFlipGameProps {
  onClose?: Dispatch<SetStateAction<boolean>>
  gameId?: number
}

const CoinFlipGame = ({ gameId, onClose }: CoinFlipGameProps) => {
  const [serverSeed] = useState(
    'e6c22f866c14ee6c22f866c14ee6c22f866c14ee6c22f866c14ee6c22f866c14ee6c22f866c14e'
  )

  return (
    <ModalWrapper
      closeModal={() => 'hi'}
      modalClasses='relative px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-5xl w-full m-auto space-y-5 max-h-[555px]'
    >
      <div className='overflow-hidden pt-6 xs:pt-0'>
        <div className='flex flex-col xs:flex-row justify-between items-center space-y-2 xs:space-y-0 xs:space-x-4 pb-4 xs:pr-10'>
          <div className='flex items-center justify-between space-x-2 pr-20 xs:pr-0 xs:space-x-6 text-lg font-bold'>
            <div className='flex border--coinflip-game w-8 h-8 items-center justify-center'>
              <CoinFlipLogoIcon />
            </div>
            <div className='flex items-center'>
              <span className='hidden xxs:block'>CF&nbsp;</span>
              <span className='text-orange-primary-light'>#13</span>
            </div>
            <QuantityCoinsContainer>
              <QuantityCoins quantity={14214.51} />
            </QuantityCoinsContainer>
          </div>
          <div className='flex absolute top-[-20%] xs:left-[40%] xs:top-[-14%] border--coinflip-game w-32 xs:w-40 h-32 xs:h-40 items-center justify-center'>
            <img src={SkinBigIcon} alt='skin' />
          </div>
          <div className='z-100 absolute hidden left-[45.2%] md:left-[46.4%] xs:top-[62%] bg-rectangle--yellow w-10 h-10 xs:flex items-center justify-center'>
            <img className='rotate-[-48deg]' src={VersusBattleIcon} alt='versus' />
          </div>
          <div className='flex items-center'>
            <AvatarWithUsername username='Brrrrrra' avatar='' />
            <span className='mx-6'>
              <img src={VersusBattleIcon} alt='versus' />
            </span>
            <AvatarWithUsername username='Brrrrrra' avatar='' />
          </div>
        </div>
        <div className='flex'>
          <CoinFlipGamePlayer opponent={false} selectedCoin={0} />
          <CoinFlipGamePlayer opponent={true} selectedCoin={1} />
        </div>
        <div className='absolute z-[50] bottom-0 left-0 w-full text-center py-2.5 px-6 bg-blue-highlight-secondary'>
          <p className='text-clip overflow-hidden text-blue-ocean-third font-normal text-base'>
            <span className='font-bold'>Server Seed #</span>
            {serverSeed}
          </p>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default CoinFlipGame
