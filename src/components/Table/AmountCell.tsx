import { FC } from 'react'
import { QuantityCoins } from '../common/QuantityCoins/QuantityCoins'

interface AmountCellProps {
  amount: number
}

export const AmountCell: FC<AmountCellProps> = ({ amount }) => {
  return (
    <div className='flex justify-start'>
      <QuantityCoins quantity={amount} />
    </div>
  )
}
