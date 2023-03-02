import { FC } from 'react'
import { IHistory } from '../../types/history'
import { QuantityCoins, QuantityCoinsProps } from '../common/QuantityCoins/QuantityCoins'

interface ProfitCellProps extends QuantityCoinsProps {
  // data: IHistory
}

export const ProfitCell: FC<ProfitCellProps> = ({ quantity, color }) => {
  return (
    <div className='flex'>
      <QuantityCoins quantity={quantity} color={color}/>
    </div>
  )
}

//color={data.isWinner ? 'green' : !data.isWinner ? 'red' : 'none'
