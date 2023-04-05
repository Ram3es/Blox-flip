import { useContext, useState } from 'react'
import { Context } from '../../store/Store'

import CoinFlipLogoIcon from '../../components/icons/CoinFlipLogoIcon'
import CoinFlipBetActions from './CoinFlipBetActions'
import SignInModal from '../../components/containers/SignInModal'
import DiamondIcon from '../../components/icons/DiamondIcon'

import { Button } from '../../components/base/Button'
import { QuantityCoins } from '../../components/common/QuantityCoins/QuantityCoins'

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
            <div className='flex items-center border border-green-primary gradient-green-secondary shadow-green-primary-20 rounded px-3 py-1.5 md:px-4 md:py-2.5'>
              <QuantityCoins quantity={23535.32} />
            </div>
          )}
        </div>
        <div className='flex items-center'>
          {state.user && <CoinFlipBetActions />}
          {!state.user && (
            <Button variant='Gradient' onClick={() => setIsOpenModal(true)}>
              <div className='flex items-center justify-between px-20 xs:px-3 py-3'>
                <DiamondIcon width='16' height='12' />
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
