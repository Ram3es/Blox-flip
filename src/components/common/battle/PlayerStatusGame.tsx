import React from 'react'
import DiamondIcon from '../../icons/DiamondIcon'
import { QuantityCoinsWithChildren } from '../QuantityCoins/QuantityWithChildren'

const PlayerStatusGame = ({ isPlayerGameWinner, wonDiamonds }: { isPlayerGameWinner: boolean, wonDiamonds?: number }) => {
  return (
      <div className="z-20 absolute inset-0 flex flex-col justify-center items-center pt-1 pb-2">
        <span className={`${isPlayerGameWinner ? 'text-green-primary' : 'text-red-500'} text-base font-semibold mb-2`}>{ isPlayerGameWinner ? 'Winner' : 'Lost'}</span>
        <div className={`${isPlayerGameWinner ? 'bg-green-primary/15' : 'bg-red-accent/15'} flex items-center p-1.5 pr-4 rounded `}>
          <QuantityCoinsWithChildren
             quantity={isPlayerGameWinner ? wonDiamonds ?? 0 : 0}
          >
            <span className={`${isPlayerGameWinner ? 'bg-green-primary/20' : 'bg-red-accent/25'} w-5 h-5 shrink-0 text-center leading-6 rounded relative mr-2 text-green-primary`}>
             <DiamondIcon className={`${isPlayerGameWinner ? '' : 'text-red-500'} -inset-full absolute m-auto`} width='15' height='12' />
            </span>
         </QuantityCoinsWithChildren>
         </div>
   </div>
  )
}

export default PlayerStatusGame
