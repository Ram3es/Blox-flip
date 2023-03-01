import { FC } from 'react'
import { IHistory } from '../../types/history'
import { QuantityCoins } from '../common/QuantityCoins/QuantityCoins'

interface ProfitCellProps {
  data: IHistory
}

export const ProfitCell: FC<ProfitCellProps> = ({ data }) => {
  return (
    <div className='flex justify-items-start'>
      <QuantityCoins quantity={data.profit} color={data.isWinner ? 'green' : !data.isWinner ? 'red' : 'none'} />
    </div>
  )
}
