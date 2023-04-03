import { FC } from 'react'

interface MultiplierCellProps {
  multiplier: number
  isWinner?: boolean
}

export const MultiplierCell: FC<MultiplierCellProps> = ({ multiplier, isWinner = true }) => {
  return (
    <div className='flex'>
      <span className={isWinner ? 'text-white' : 'text-gray-primary'}>{multiplier}x</span>
    </div>
  )
}
