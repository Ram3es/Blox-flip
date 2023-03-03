import clsx from 'clsx'
import { FC } from 'react'
import { StatusCode } from '../../types/enums'

interface StatusCellProps {
  status: keyof typeof StatusCode
}

export const StatusCell: FC<StatusCellProps> = ({ status }) => {
  return (
    <div
      className={clsx('flex', {
        'text-green-primary': status === StatusCode.Confirmed,
        'text-orange-secondary': status === StatusCode.Pending,
        'text-red-accent': status === StatusCode.Failed
      })}
    >
      {status}
    </div>
  )
}
