import { FC, PropsWithChildren } from 'react'

import CoinsContainer from '../../common/Coins/CoinsContainer'
import DiamondIcon from '../../icons/DiamondIcon'
import IconContainer from '../../common/Coins/IconContainer'
import CoinsTypography from '../../common/Coins/CoinsTypography'

interface GameLobbyFooterProps {
  selectedItemsLength: number
  selectedItemsCost: number
  inventoryItemsLength: number
  betGap?: number
}

const GameLobbyFooter: FC<PropsWithChildren<GameLobbyFooterProps>> = ({
  selectedItemsLength,
  selectedItemsCost,
  inventoryItemsLength,
  betGap,
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
          <CoinsContainer color='GreenGradientSecondary' size='Large'>
            <IconContainer color='GreenPrimary' size='Medium'>
              <DiamondIcon />
            </IconContainer>
            <CoinsTypography quantity={selectedItemsCost} fontSize='Size16' />
          </CoinsContainer>
        </div>
      </div>
      {betGap && (
        <CoinsContainer color='GreenGradientSecondary' size='Large'>
          <IconContainer color='GreenPrimary' size='Medium'>
            <DiamondIcon />
          </IconContainer>
          <CoinsTypography quantity={betGap} fontSize='Size14' />
        </CoinsContainer>
      )}
      <div className='flex items-center justify-between space-x-4'>{children}</div>
    </div>
  )
}

export default GameLobbyFooter
