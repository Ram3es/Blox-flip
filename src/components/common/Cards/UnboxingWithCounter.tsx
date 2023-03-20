import React, { FC } from 'react'
import { IMAGES } from '../../../constants/Images'
import Counter from '../../Base/Counter'
import { QuantityCoinsWithChildren } from '../QuantityCoins/QuantityWithChildren'

interface IUnboxingCounterCardProps {
  id: string
  name: string
  price: number
  count: number
  increment: Function
  decrement: Function
}

const UnboxingWithCounter: FC<IUnboxingCounterCardProps> = ({ name, price, count, increment, decrement }) => {
  return (
    <div className="p-1.5 w-1/2 xxs:w-1/3 xs:w-1/4 md:w-1/6 shrink-0 lg:w-1/6">
        <div className="border--mask border--radial-blue overflow-hidden text-sm bg-gradient-radial-80 from-blue-light-secondary/30 to-blue-accent-secondary/0 rounded h-full text-center relative z-20">
            <div className="flex flex-col items-center justify-between rounded h-full py-4 px-2 relative z-20 border-y border-y-sky-primary/30">
              <div className="bg-blue-accent-secondary/50 border border-blue-highlight rounded px-2 w-10/12 py-1 leading-4 font-semibold text-gray-primary mb-3 grow flex flex-col justify-center">{name}</div>
              <QuantityCoinsWithChildren quantity={price} />
              <div className="w-full pb-60% h-0 relative mb-4 mt-3">
                <img src={IMAGES.greenBox} alt="greenbox" width="93" height="101" loading="lazy" decoding="async" className="absolute object-contain w-full h-full"/>
              </div>
              <Counter count={count} increment={increment} decrement={decrement} isDisabled={count === 1 } />
            </div>
        </div>
    </div>
  )
}

export default UnboxingWithCounter
