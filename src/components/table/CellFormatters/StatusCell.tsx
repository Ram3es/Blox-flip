import clsx from 'clsx'
import { FC } from 'react'
import { StatusCode } from '../../../types/enums'

interface StatusCellProps {
  status: keyof typeof StatusCode
}

export const StatusCell: FC<StatusCellProps> = ({ status }) => {
  return (
    <div
      className={clsx('flex', {
        'text-green-primary': status === StatusCode.Completed,
        'text-orange-secondary': status === StatusCode.Processing,
        'text-red-accent': status === StatusCode.Failed,
        'text-gray-accent': status === StatusCode.Refunded

      })}
    >
      {status}
    </div>
  )
}
