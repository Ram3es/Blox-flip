import { FC } from 'react'
import { QuantityCoins, QuantityCoinsProps } from '../common/QuantityCoins/QuantityCoins'

interface BetCellProps extends QuantityCoinsProps {}

export const BetCell: FC<BetCellProps> = ({ quantity }) => {
  return (
    <div className='flex'>
      <QuantityCoins {...{ quantity }} />
    </div>
  )
}
