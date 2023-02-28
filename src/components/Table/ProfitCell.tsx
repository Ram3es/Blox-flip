import { FC } from 'react'
import { QuantityCoins, QuantityCoinsProps } from '../common/QuantityCoins/QuantityCoins'

interface ProfitCellProps extends QuantityCoinsProps {}

export const ProfitCell: FC<ProfitCellProps> = ({ quantity, isActive }) => {
  return (
    <div className='flex justify-items-start'>
      <QuantityCoins {...{ quantity, isActive }} />
    </div>
  )
}
