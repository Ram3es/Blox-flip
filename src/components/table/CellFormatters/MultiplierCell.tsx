import { FC } from 'react'

interface MultiplierCellProps {
  gameID: string
}

export const MultiplierCell: FC<MultiplierCellProps> = ({ gameID }) => {
  return (
    <div className='flex '>
      <span className='text-white'>{gameID}</span>
    </div>
  )
}
