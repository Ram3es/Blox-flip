import { FC } from 'react'
import { useCopyToClipboard } from '../../../helpers/hooks/useCopyToClipboard'

import NavHeader from '../../navigate/NavHeader'

import { CopyIconSecond } from '../../icons/CopyIconSecond'
import UnboxingIconTitle from '../../icons/UnboxingIconTitle'
import VerticalDivider from '../../icons/VerticalDivider'
import { Button } from '../../base/Button'
import CoinsWithDiamond from '../CoinsWithDiamond'

interface IGameHeaderProps {
  gameStatus: string
  currentRound?: number
  amountRounds: number
  totalPrice: number
  currentBoxPrice: number
}

const GameHeader: FC<IGameHeaderProps> = ({
  gameStatus,
  currentRound,
  amountRounds,
  totalPrice,
  currentBoxPrice
}) => {
  const { handleCopyText: handleCopyLocation } = useCopyToClipboard(window.location.href)

  return (
    <NavHeader
      renderIcon={() => <UnboxingIconTitle iconClasses='text-blue-golf' />}
      wrapperClasses='w-full flex flex-wrap'
      title='Diamond Case'
    >
      <div className='flex justify-between flex-wrap items-center mb-8 text-gray-primary mr-auto'>
        <div className='flex items-center'>
          <VerticalDivider className='mx-4' />
          <div className='font-semibold'>
            <span className={gameStatus !== 'running' ? 'text-primary-gray' : 'text-white'}>
              {currentRound ?? 0}
            </span>
            {` / ${amountRounds}`}
          </div>
          <VerticalDivider className='mx-4' />
          <CoinsWithDiamond
            containerColor='GreenDarken'
            containerSize='Small'
            iconContainerSize='Small'
            iconClasses='w-[13px]'
            typographyFontSize='Size16'
            typographyQuantity={currentBoxPrice}
          />
        </div>
      </div>
      <div className='flex flex-wrap items-center ml-4 mb-8  text-gray-primary'>
        <Button
          onClick={handleCopyLocation}
          className='flex items-center cursor-pointer mb-5 xxs:mb-0 text-gray-primary'
        >
          <CopyIconSecond />
          <span className='ml-2'>Copy Link</span>
        </Button>
        <VerticalDivider className='mx-4 mb-5 xxs:mb-0' />
        <div className='flex items-center mb-5 xxs:mb-0'>
          <span className='mr-3'>Total cost</span>
          <CoinsWithDiamond
            containerColor='GreenDarken'
            typographyFontSize='Size16'
            typographyQuantity={totalPrice}
          />
        </div>
      </div>
    </NavHeader>
  )
}

export default GameHeader
