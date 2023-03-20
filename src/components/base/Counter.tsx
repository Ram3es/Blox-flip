import React, { FC } from 'react'
import { Button } from './Button'

interface ICountProps {
  count: number
  increment: Function
  decrement: Function
  isDisabled: boolean
}

const Counter: FC<ICountProps> = ({ count, increment, decrement, isDisabled }) => {
  return (
        <div className='flex items-center justify-center'>
            <Button
              onClick={() => decrement()}
              className={`${isDisabled ? ' cursor-default bg-blue-light-primary/60 ' : 'bg-blue-light-primary/30 group hover:bg-blue-accent cursor-pointer'}  w-7 h-7 rounded leading-7 text-center font-semibold text-lg  text-gray-primary `}
              disabled={isDisabled}
              >
               <span className='group-hover:text-white'>-</span>
            </Button>
            <span className='w-10'>{count}</span>
            <Button
              onClick={() => increment()}
              className='bg-blue-light-primary/30 w-7 h-7 rounded leading-7 text-center cursor-pointer font-semibold text-lg text-gray-primary group hover:bg-blue-accent'>
                <span className='group-hover:text-white'>+</span>
            </Button>
        </div>
  )
}

export default Counter
