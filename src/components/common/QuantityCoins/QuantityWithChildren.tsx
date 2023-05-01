import { FC, ReactNode } from 'react'
import { formatNumber } from '../../../helpers/numbers'
import DiamondIcon from '../../icons/DiamondIcon'

export interface QuantityCoinsProps {
  quantity: number
  isActive?: boolean
  children?: ReactNode
  quantityClasses?: string
}

export const QuantityCoinsWithChildren: FC<QuantityCoinsProps> = ({
  quantity,
  isActive = false,
  children,
  quantityClasses
}) => {
  const integerNumFormatted = (number: number): string => {
    return Number.isInteger(number)
      ? formatNumber(quantity, 0)
      : formatNumber(Number(quantity.toString().split('.')[0]))
  }
  return (
    <div className={quantityClasses ?? 'flex items-center text-13 font-bold'}>
      {children ?? (
        <span className='w-5 h-5 shrink-0 text-center leading-6 bg-green-primary/20 rounded relative mr-2 text-green-primary'>
          <DiamondIcon className='-inset-full absolute m-auto' width='15' height='12' />
        </span>
      )}

      <span className={`whitespace-nowrap ${isActive ? 'text-green-primary' : 'text-white'}`}>
        {integerNumFormatted(quantity)}
        <span className='opacity-50'>
          {Number.isInteger(quantity) ? '.00' : quantity.toFixed(2).slice(-3)}
        </span>
      </span>
    </div>
  )
}
