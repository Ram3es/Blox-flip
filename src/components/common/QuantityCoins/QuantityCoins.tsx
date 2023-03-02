import { FC } from 'react'
import clsx from 'clsx'
import { DiamondIcon } from '../../DiamondIcon/DiamondIcon'

export interface QuantityCoinsProps {
  quantity: number
  isActive?: boolean
  children?: ReactNode
  quantityClasses?: string
}

export const QuantityCoins: FC<QuantityCoinsProps> = ({ quantity, isActive = false }) => {
  const quantityMainClasses = clsx('w-5 h-5 shrink-0 text-center leading-6 rounded relative mr-2 ', {
    'bg-green-primary/20 text-green-primary': quantity > 0,
    'bg-gray-secondary-darken/40 text-gray-primary': quantity === 0
  })
  const isActiveClasses = clsx('font-bold text-13 mr-2 whitespace-nowrap', {
    'text-green-primary': isActive,
    'text-white': !isActive
  })

  const remainder = quantity % 1

  return (
    <div className='flex items-center'>
      <span className={quantityMainClasses}>
        <DiamondIcon className='-inset-full absolute m-auto' />
      </span>
      <span className={isActiveClasses}>{quantity === 0
        ? ('-')
        : remainder === 0
          ? (<>{quantity}<span className='opacity-50'>.00</span></>)
          : (<>{quantity.toFixed()}.{remainder.toFixed(2).slice(2)}</>)}
      </span>
    </div>
  )
}
