import { useContext, useState } from 'react'
import { Context } from '../../store/Store'

import CoinFlipLogoIcon from '../../components/icons/CoinFlipLogoIcon'
import CoinFlipBetActions from './CoinFlipBetActions'
import SignInModal from '../../components/containers/SignInModal'
import DiamondIcon from '../../components/icons/DiamondIcon'
import { Button } from '../../components/base/Button'
import CoinsContainer from '../../components/common/Coins/CoinsContainer'
import IconContainer from '../../components/common/Coins/IconContainer'
import CoinsTypography from '../../components/common/Coins/CoinsTypography'

const CoinFlipHeader = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const { state } = useContext(Context)

  return (
    <>
      <div className='flex flex-col xs:flex-row space-y-4 xs:space-y-0 items-center justify-between bg-blue-accent rounded-lg p-5'>
        <div className='flex items-center space-x-4'>
          <div className='flex items-center justify-center'>
            <CoinFlipLogoIcon />
            <span className='pl-3 text-lg hidden md:block'>Games</span>
          </div>
          <Button variant='YellowOutlined'>
            <span className='text-orange-primary-light text-13 font-medium px-3 py-1.5 md:px-4 md:py-2.5 flex items-center justify-center'>
              7 <span className='hidden md:block'>&nbsp;Games</span>
            </span>
          </Button>
          <Button variant='GreenOutlinedSecondary'>
            <span className='text-green-primary text-13 font-medium px-3 py-1.5 md:px-4 md:py-2.5 flex items-center justify-center'>
              3 <span className='hidden md:block'>&nbsp;Joinable</span>
            </span>
          </Button>
          {!state.user && (
            <CoinsContainer color='GreenGradient' size='XL'>
              <IconContainer color='GreenPrimary' size='Medium'>
                <DiamondIcon />
              </IconContainer>
              <CoinsTypography quantity={14214.51} fontSize='Size14' />
            </CoinsContainer>
          )}
        </div>
        <div className='flex items-center'>
          {state.user && <CoinFlipBetActions />}
          {!state.user && (
            <Button variant='GreenGradient' onClick={() => setIsOpenModal(true)}>
              <div className='flex items-center justify-between px-20 xs:px-3 py-3'>
                <DiamondIcon className='w-[16px] h-[12px]' />
                <span className='pl-2 text-sm leading-4 truncate'>Create new</span>
              </div>
            </Button>
          )}
        </div>
      </div>
      <SignInModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />
    </>
  )
}

export default CoinFlipHeader
