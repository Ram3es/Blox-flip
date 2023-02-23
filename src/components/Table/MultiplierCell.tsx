import { FC } from 'react'

interface MultiplierCellProps {
  multiplier: number
}

export const MultiplierCell: FC<MultiplierCellProps> = ({ multiplier }) => {
  return <span className='text-white'>{multiplier}x</span>
}
