import { FC } from 'react'
import { dateFormatter } from '../../helpers/dateFormatter'

interface TimeCellProps {
  date: string
}

export const TimeCell: FC<TimeCellProps> = ({ date }) => {
  return (
    <div className='flex justify-start ml-2 whitespace-nowrap'>
      <span className='text-gray-primary '>{dateFormatter(date)}</span>
    </div>
  )
}
