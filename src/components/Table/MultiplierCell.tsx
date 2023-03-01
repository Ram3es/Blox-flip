import { FC } from 'react'

interface MultiplierCellProps {
  multiplier: number
  isWinner?: boolean
}

export const MultiplierCell: FC<MultiplierCellProps> = ({ multiplier, isWinner = true }) => {
  return (
    <div className='flex justify-start mx-16'>
      <span className={isWinner ? 'text-white' : 'text-gray-primary'}>{multiplier}x</span>
    </div>
  )
}
