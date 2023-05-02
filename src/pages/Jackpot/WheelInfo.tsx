import { Button } from '../../components/base/Button'
import ProductsIcon from '../../components/icons/ProductsIcon'
import CoinsContainer from '../../components/common/Coins/CoinsContainer'
import CoinsTypography from '../../components/common/Coins/CoinsTypography'
import DiamondIcon from '../../components/icons/DiamondIcon'
import IconContainer from '../../components/common/Coins/IconContainer'

const WheelInfo = ({ jackPot }: { jackPot: number }) => {
  return (
    <div className='flex flex-col justify-center items-center p-6 gap-6'>
      <div className='flex items-center text-base font-bold text-green-primary'>
        <ProductsIcon />
        <span className='text-white ml-2'>7/50</span>
      </div>
      <CoinsContainer color='GreenGradient' size='_2XL'>
        <IconContainer color='GreenPrimary' size='Medium'>
          <DiamondIcon />
        </IconContainer>
        <CoinsTypography quantity={jackPot} fontSize='Size18' />
      </CoinsContainer>
      <Button
        onClick={() => {}}
        className='bg-green-primary hover:bg-green-500  border border-green-primary py-2.5 px-4 leading-4 rounded z-10'
      >
        Join Game
      </Button>
    </div>
  )
}

export default WheelInfo
