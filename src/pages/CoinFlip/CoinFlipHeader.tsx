import { Button } from '../../components/base/Button'
import { QuantityCoins } from '../../components/common/QuantityCoins/QuantityCoins'
import CoinFlipLogoIcon from '../../components/icons/CoinFlipLogoIcon'
import CoinFlipBetActions from './CoinFlipBetActions'

const CoinFlipHeader = () => {
  return (
    <div className='flex justify-between bg-blue-accent rounded-lg p-5 flex-wrap'>
      <div className='flex items-center space-x-4'>
        <div className='flex items-center justify-center'>
          <CoinFlipLogoIcon />
          <span className='pl-3 text-lg'>Games</span>
        </div>
        <Button variant='YellowOutlined'>
          <span className='text-orange-primary-light text-13 font-medium px-3 py-1.5 md:px-4 md:py-2 flex items-center justify-center'>
            7 Games
          </span>
        </Button>
        <Button variant='GreenOutlinedSecondary'>
          <span className='text-green-primary text-13 font-medium px-3 py-1.5 md:px-4 md:py-2 flex items-center justify-center'>
            3 Joinable
          </span>
        </Button>
        {/* <div className='flex items-center border border-green-primary gradient-green-secondary shadow-green-primary-20 rounded px-3 py-2'>
          <QuantityCoins quantity={23535.32} />
        </div> */}
      </div>
      <div>
        <CoinFlipBetActions />
      </div>
    </div>
  )
}

export default CoinFlipHeader
