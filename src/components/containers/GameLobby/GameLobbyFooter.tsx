import { FC, PropsWithChildren } from 'react'
import CoinsWithDiamond from '../../common/CoinsWithDiamond'
import GapQuantityCoins from '../../common/GapQuantityCoins'

interface GameLobbyFooterProps {
  selectedItemsLength: number
  selectedItemsCost: number
  inventoryItemsLength: number
  min?: number
  max?: number
}

const GameLobbyFooter: FC<PropsWithChildren<GameLobbyFooterProps>> = ({
  selectedItemsLength,
  selectedItemsCost,
  inventoryItemsLength,
  min,
  max,
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
          <CoinsWithDiamond
            containerColor='GreenGradientSecondary'
            containerSize='Large'
            typographyQuantity={selectedItemsCost}
            typographyFontSize='Size16'
          />
        </div>
      </div>
      {min && max && (
        <GapQuantityCoins min={min} max={max} />
      )}
      <div className='flex items-center justify-between space-x-4'>{children}</div>
    </div>
  )
}

export default GameLobbyFooter
