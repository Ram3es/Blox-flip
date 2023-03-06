import clsx from 'clsx'
import { FC } from 'react'
import { TransactionVariant } from '../../types/enums'
import { PlusIcon } from '../PlusIcon/PlusIcon'

interface TypeCellProps {
  type: keyof typeof TransactionVariant
}

export const TransactionTypeCell: FC<TypeCellProps> = ({ type }) => {
  return (
    <div
      className={clsx('flex', {
        'text-green-primary': type === TransactionVariant.Deposit,
        'text-gray-primary': type === TransactionVariant.Withdraw
      })}
    >
      {type === TransactionVariant.Deposit && (
        <span className='w-5 h-5 text-center leading-5 bg-green-primary rounded relative shadow-green-15 mr-2.5'>
          <PlusIcon width={7} height={7} className='-inset-full absolute m-auto' />
        </span>
      )}
      {type === TransactionVariant.Withdraw && (
        <span className='w-5 h-5 text-center leading-5 bg-blue-highlight rounded relative mr-2.5'>
          <div className='w-2 h-px bg-gray-primary -inset-full absolute m-auto'></div>
        </span>
      )}
      <span>{type}</span>
    </div>
  )
}
