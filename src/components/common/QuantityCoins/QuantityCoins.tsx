import { FC } from 'react'
import { DiamondIcon } from '../../DiamondIcon/DiamondIcon'

export interface QuantityCoinsProps {
  quantity: number
  isActive?: boolean
}

export const QuantityCoins: FC<QuantityCoinsProps> = ({ quantity, isActive = false }) => {
  const remainder = quantity % 1

  return (
    <div className='flex items-center'>
      <span className='w-5 h-5 shrink-0 text-center leading-6 bg-green-primary/20 rounded relative mr-2 text-green-primary'>
        <DiamondIcon className='-inset-full absolute m-auto' />
      </span>
      <span
        className={`font-bold text-13 mr-2 whitespace-nowrap ${
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
