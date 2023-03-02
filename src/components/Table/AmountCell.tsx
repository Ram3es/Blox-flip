import { FC } from 'react'
import { QuantityCoins, QuantityCoinsProps } from '../common/QuantityCoins/QuantityCoins'

interface AmountCellProps extends QuantityCoinsProps {
}

export const AmountCell: FC<AmountCellProps> = ({ quantity, isFailed }) => {
  return (
    <div className='flex'>
      <QuantityCoins quantity={quantity} isFailed={isFailed} />
    </div>
  )
}
