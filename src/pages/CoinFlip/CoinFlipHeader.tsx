import { useCallback, useContext } from 'react'
import { Context } from '../../store/Store'
import { useCoinFlip } from '../../store/CoinFlipStore'

import { Button } from '../../components/base/Button'
import CoinsWithDiamond from '../../components/common/CoinsWithDiamond'
import CoinFlipLogoIcon from '../../components/icons/CoinFlipLogoIcon'
import DiamondIcon from '../../components/icons/DiamondIcon'

const CoinFlipHeader = () => {
  const { setIsOpenLobbyModal, setIsOpenLoginModal } = useCoinFlip()

  const { state } = useContext(Context)

  const handleCreateGame = useCallback(() => {
    if (state.user) {
      setIsOpenLobbyModal(true)
    } else {
      setIsOpenLoginModal(true)
    }
  }, [state.user])

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
            <CoinsWithDiamond
              containerSize='Large'
              containerColor='GreenGradient'
              typographyQuantity={14214.51}
            />
          )}
        </div>
        <div className='flex items-center'>
          <Button variant='GreenGradient' onClick={handleCreateGame}>
            <div className='flex items-center justify-between md:py-3.5 py-2 px-2'>
              <DiamondIcon className='w-[16px] h-[12px]' />
              <span className='pl-2 text-sm leading-4 truncate'>Create new</span>
            </div>
          </Button>
        </div>
      </div>
    </>
  )
}

export default CoinFlipHeader
