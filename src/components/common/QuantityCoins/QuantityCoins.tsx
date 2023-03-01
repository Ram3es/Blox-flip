import { FC, ReactNode } from 'react'
import { DiamondIcon } from '../../DiamondIcon/DiamondIcon'

export interface QuantityCoinsProps {
  quantity: number
  isActive?: boolean
  children?: ReactNode
  quantityClasses?: string
}

export const QuantityCoins: FC<QuantityCoinsProps> = ({ quantity, isActive = false, children, quantityClasses }) => {
  const remainder = quantity % 1

  return (
    <div className={quantityClasses ?? 'flex items-center text-13 font-bold'}>
      {children ??
       <span className='w-5 h-5 shrink-0 text-center leading-6 bg-green-primary/20 rounded relative mr-2 text-green-primary'>
        <DiamondIcon className='-inset-full absolute m-auto' />
       </span>}

      <span
        className={`whitespace-nowrap ${
          isActive ? 'text-green-primary' : 'text-white'
        }`}
      >
        {remainder === 0
          ? (<>{quantity}<span className='opacity-50'>.00</span></>)
          : (<>{quantity.toFixed()}.{remainder.toFixed(2).slice(2)}</>)}
      </span>
    </div>
  )
}
