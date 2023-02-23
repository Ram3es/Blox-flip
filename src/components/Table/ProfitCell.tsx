import { FC } from 'react'
import { DiamondIcon } from '../DiamondIcon/DiamondIcon'

interface ProfitCellProps {
  profit: number
}

export const ProfitCell: FC<ProfitCellProps> = ({ profit }) => {
  return (
    <div className='flex items-center'>
      <span className='w-5 h-5 shrink-0 text-center leading-6 bg-green-primary/20 rounded relative mr-2 text-green-primary'>
        <DiamondIcon className='-inset-full absolute m-auto' />
      </span>
      <span className='font-bold text-13 mr-2 whitespace-nowrap text-green-primary'>
        {profit}
        <span className='opacity-50'>.00</span>
      </span>
    </div>
  )
}
