import { FC } from 'react'

interface TimeCellProps {
  date: string
}

export const TimeCell: FC<TimeCellProps> = ({ date }) => {
  return <span className='text-gray-primary'>{date}</span>
}
