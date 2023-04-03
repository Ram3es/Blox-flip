import { Button } from '../../components/base/Button'
import { QuantityCoins } from '../../components/common/QuantityCoins/QuantityCoins'
import CoinFlipLogoIcon from '../../components/icons/CoinFlipLogoIcon'
import DiamondIcon from '../../components/icons/DiamondIcon'
import CoinFlipBetActions from './CoinFlipBetActions'

const CoinFlipHeader = () => {
  return (
    <div className='flex flex-wrap justify-between bg-blue-accent rounded-lg p-5'>
      <div className='flex justify-between space-x-4'>
        <div className='flex items-center'>
          <CoinFlipLogoIcon />
          <span className='pl-3 text-lg'>Games</span>
        </div>
        <Button variant='YellowOutlined'>
          <span className='text-orange-primary-light text-13 font-medium px-5 py-2.5'>7 Games</span>
        </Button>
        <Button variant='GreenOutlinedSecondary'>
          <span className='text-green-primary text-13 font-medium px-5 py-2.5'>3 Joinable</span>
        </Button>
        <div className='flex items-center border border-green-primary gradient-green-secondary shadow-green-primary-20 rounded px-2'>
          <QuantityCoins quantity={23535.32} />
        </div>
      </div>
      <div>
        <CoinFlipBetActions />

      </div>
    </div>
  )
}

export default CoinFlipHeader
