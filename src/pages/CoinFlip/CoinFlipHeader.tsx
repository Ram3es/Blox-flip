import { useContext } from 'react'
import { Context } from '../../store/Store'

import CoinsWithDiamond from '../../components/common/CoinsWithDiamond'
import CoinFlipLogoIcon from '../../components/icons/CoinFlipLogoIcon'
import CoinFlipBetActions from './CoinFlipBetActions'
import { Button } from '../../components/base/Button'

const CoinFlipHeader = () => {
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
            <CoinsWithDiamond
              containerSize='Large'
              containerColor='GreenGradient'
              typographyQuantity={14214.51}
            />
          )}
        </div>
        <div className='flex items-center'>
          <CoinFlipBetActions />
        </div>
      </div>
    </>
  )
}

export default CoinFlipHeader
