import { FC } from 'react'
import { ITransaction } from '../../types/transaction'
import { QuantityCoins } from '../common/QuantityCoins/QuantityCoins'

interface AmountCellProps {
  data: ITransaction
}

export const AmountCell: FC<AmountCellProps> = ({ data }) => {
  return (
    <div className='flex justify-start'>
      <QuantityCoins quantity={data.amount} isFailed={data.isError} />
    </div>
  )
}
