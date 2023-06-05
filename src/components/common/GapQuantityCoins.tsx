import { formatNumber } from '../../helpers/numbers'
import CoinsContainer from '../containers/Coins/CoinsContainer'
import IconContainer from '../containers/IconContainer'
import DiamondIcon from '../icons/DiamondIcon'

interface GapQuantityCoinsProps {
  min: number
  max: number
}

const GapQuantityCoins = ({ min, max }: GapQuantityCoinsProps) => {
  return (
    <CoinsContainer containerColor='GreenGradientSecondary' containerSize='Large'>
      <IconContainer>
        <DiamondIcon />
      </IconContainer>
      <p className='text-white text-base font-bold'>
        {formatNumber(min)}
        <span className='text-white/60'>.00</span> <span className='text-white/60'>-</span>{' '}
        {formatNumber(max)}
        <span className='text-white/60'>.00</span>
      </p>
    </CoinsContainer>
  )
}

export default GapQuantityCoins
