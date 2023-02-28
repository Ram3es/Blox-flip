import { FC } from 'react'

interface MultiplierCellProps {
  multiplier: number
}

export const MultiplierCell: FC<MultiplierCellProps> = ({ multiplier }) => {
  return (
    <div className='flex justify-start mx-16'>
      <span className='text-white'>{multiplier}x</span>
    </div>
  )
}
