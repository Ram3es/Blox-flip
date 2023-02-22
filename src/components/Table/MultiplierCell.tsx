import { FC } from 'react'

interface MultiplierCellProps {
  rate: number
}

export const MultiplierCell: FC<MultiplierCellProps> = ({ rate }) => {
  return <span className='text-white'>{rate}</span>
}
