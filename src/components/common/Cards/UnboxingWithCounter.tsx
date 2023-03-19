import React, { FC } from 'react'

interface IUnboxingCounterCardProps {
  id: string
  name: string
  price: number
  onSelect: Function
}

const UnboxingWithCounter: FC<IUnboxingCounterCardProps> = ({ name }) => {
  return (
        <div className="border--mask border--radial-blue overflow-hidden text-sm bg-gradient-radial-80 from-blue-light-secondary/30 to-blue-accent-secondary/0 rounded h-full text-center relative z-20">
            <div className="flex flex-col items-center justify-between rounded h-full py-4 px-2 relative z-20 border-y border-y-sky-primary/30">
              <div className="bg-blue-accent-secondary/50 border border-blue-highlight rounded px-2 w-10/12 py-1 leading-4 font-semibold text-gray-primary mb-3 grow flex flex-col justify-center">{name}</div>
            </div>
        </div>
  )
}

export default UnboxingWithCounter
