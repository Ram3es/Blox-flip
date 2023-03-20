import { FC } from 'react'
import clsx from 'clsx'
import DiamondIcon from '../../icons/DiamondIcon'
import { formatNumber } from '../../../helpers/numbersFormatter'

export interface QuantityCoinsProps {
  quantity: number
  isFailed?: boolean
  color?: 'red' | 'green' | 'none'
  textSize?: string
  iconBgHeight?: string // in rem
  iconBgWidth?: string // in rem
  iconHeight?: string // in px
  iconWidth?: string // in px
}

export const QuantityCoins: FC<QuantityCoinsProps> = ({
  quantity,
  isFailed = false,
  color = 'none',
  textSize = 'text-13',
  iconBgWidth = '5',
  iconBgHeight = '5',
  iconWidth = '14',
  iconHeight = '12'
}) => {
  const iconClasses = clsx(`w-${iconBgWidth} h-${iconBgHeight} shrink-0 text-center leading-6 rounded relative mr-1.5`, {
    'bg-green-primary/20 text-green-primary': !isFailed,
    'bg-gray-secondary-darken/40 text-gray-primary': isFailed,
    'bg-red-accent/20 text-red-accent': color === 'red',
    'text-green-primary': color === 'green'
  })
  const quantityClasses = clsx(`${textSize} font-bold mr-2 whitespace-nowrap`, {
    'text-green-primary': color === 'green',
    'text-red-accent': color === 'red',
    'text-white': color === 'none'
  })

  const remainder = quantity % 1

  return (
    <div className='flex items-center'>
      <span className={iconClasses}>
        <DiamondIcon className='-inset-full absolute m-auto' width={iconWidth} height={iconHeight} />
      </span>
      <span className={quantityClasses}>
        {isFailed
          ? <span className='text-white'>-</span>
          : remainder === 0
            ? (<>{formatNumber(quantity)}<span className='opacity-50'>.00</span></>)
            : (<>{formatNumber(quantity, 2)}</>)
          }
      </span>
    </div>
  )
}
