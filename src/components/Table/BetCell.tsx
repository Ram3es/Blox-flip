import { FC } from 'react'
import { QuantityCoins, QuantityCoinsProps } from '../common/QuantityCoins/QuantityCoins'

interface BetCellProps extends QuantityCoinsProps {}

export const BetCell: FC<BetCellProps> = ({ quantity, isActive }) => {
  return (
    <div className='flex justify-start ml-9'>
      <QuantityCoins {...{ quantity, isActive }} />
    </div>
  )
}
