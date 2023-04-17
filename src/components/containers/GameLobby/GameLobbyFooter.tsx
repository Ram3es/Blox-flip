import React, { FC, PropsWithChildren } from 'react'
import QuantityCoinsContainer from '../../common/QuantityCoins/QuantityCoinsContainer'
import { QuantityCoins } from '../../common/QuantityCoins/QuantityCoins'

interface GameLobbyFooterProps {
  selectedItemsLength: number
  selectedItemsCost: number
  inventoryItemsLength: number
}

const GameLobbyFooter: FC<PropsWithChildren<GameLobbyFooterProps>> = ({
  selectedItemsLength,
  selectedItemsCost,
  inventoryItemsLength,
  children
}) => {
  return (
    <div className='absolute z-[50] bottom-0 left-0 w-full flex flex-col space-y-2 xs:space-y-0 xs:flex-row items-center justify-between py-2.5 px-6 bg-blue-highlight-secondary'>
      <div className='flex flex-col xs:flex-row items-center space-x-2'>
        <div className='flex items-center justify-between gap-2'>
          <span className='text-gray-primary text-sm font-semibold hidden xs:block'>
            Total selected
          </span>
          <div className='h-9 bg-blue-ocean-secondary/25 border-2 border-blue-ocean-secondary/50 px-3  md:px-4 rounded font-bold text-sm flex items-center justify-between'>
            {selectedItemsLength}/<span className='text-white/60'>{inventoryItemsLength}</span>
            <span className='text-gray-primary uppercase font-semibold text-xs hidden xs:block'>
              &nbsp;skins
            </span>
          </div>
          <QuantityCoinsContainer size='SMALL'>
            <QuantityCoins textSize='text-base' quantity={selectedItemsCost} />
          </QuantityCoinsContainer>
        </div>
      </div>
      <div className='h-9 flex items-center gradient-green-secondary shadow-green-primary-20 rounded px-3 md:px-4'>
        <QuantityCoins textSize='text-sm' quantity={23535.32} />
      </div>
      <div className='flex items-center justify-between space-x-4'>{children}</div>
    </div>
  )
}

export default GameLobbyFooter
