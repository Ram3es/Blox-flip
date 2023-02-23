import { FC } from 'react'
import { dateFormatter } from '../../helpers/dateFormatter'

interface TimeCellProps {
  date: string
}

export const TimeCell: FC<TimeCellProps> = ({ date }) => {
  return <span className='text-gray-primary'>{dateFormatter(date)}</span>
}
