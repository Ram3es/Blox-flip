import { FC, PropsWithChildren } from 'react'

import { Button } from '../../base/Button'

import RefreshIcon from '../../icons/RefreshIcon'
import CoinsWithDiamond from '../../common/CoinsWithDiamond'

interface GameLobbyHeaderProps {
  skinsQuantity: number
  skinsPrice: number
  handleResetSelectedSkins: () => void
}

const GameLobbyHeader: FC<PropsWithChildren<GameLobbyHeaderProps>> = ({
  skinsQuantity,
  skinsPrice,
  handleResetSelectedSkins,
  children
}) => {
  return (
    <div className='flex justify-between items-center space-x-4 border-b border-lightblue-darken/50 pb-4 xs:pr-10 pt-5 xs:pt-3'>
      <div className='flex items-center justify-center'>{children}</div>
      <div className='flex justify-between items-center md:space-x-4 space-x-2'>
        <Button variant='YellowOutlined'>
          <span className='text-13 font-medium px-4 py-2.5 flex items-center justify-center'>
            {skinsQuantity} <span className='text-orange-primary-light'>&nbsp;Items</span>
          </span>
        </Button>
        <div className='flex items-center gap-2'>
          <span className='font-medium text-13 leading-4 text-blue-ocean-secondary hidden xxs:block'>
            Inventory value
          </span>
          <CoinsWithDiamond
            containerColor='GreenGradient'
            containerSize='XL'
            typographyQuantity={skinsPrice}
          />
        </div>
        <Button onClick={handleResetSelectedSkins}>
          <RefreshIcon />
        </Button>
      </div>
    </div>
  )
}

export default GameLobbyHeader
