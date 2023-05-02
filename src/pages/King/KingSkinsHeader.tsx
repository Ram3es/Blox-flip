import { Dispatch, SetStateAction } from 'react'

import clsx from 'clsx'

import { Button } from '../../components/base/Button'
import { ListIcon } from '../../components/icons/ListIcon'
import ButtonsToggle from '../../components/base/ButtonToggle'

import { getCostByFieldName } from '../../helpers/numbers'

import type { TabInterface } from './KingSkins'

import type { IKingGamePlayer } from '../../types/King'
import CoinsContainer from '../../components/common/Coins/CoinsContainer'
import IconContainer from '../../components/common/Coins/IconContainer'
import DiamondIcon from '../../components/icons/DiamondIcon'
import CoinsTypography from '../../components/common/Coins/CoinsTypography'

interface HeaderProps {
  user?: IKingGamePlayer
  isKing?: boolean
  options?: TabInterface[]
  selectedOption?: TabInterface
  setSelectedOption?: Dispatch<SetStateAction<TabInterface>>
}

const KingSkinsHeader = ({
  user,
  isKing,
  options,
  selectedOption,
  setSelectedOption
}: HeaderProps) => {
  const headingClasses = clsx('flex items-center gap-2 font-bold text-10 xs:text-base', {
    'gradient-king-yellow-text text-yellow-primary-accent': isKing,
    'text-gray-primary': !isKing
  })

  return (
    <div className='flex items-start ls:items-center ls:flex-row flex-col gap-3'>
      <div className={headingClasses}>
        <p className='hidden ls:block'>
          <ListIcon />
        </p>
        {isKing ? 'Kings items' : 'Opponents items'}
      </div>
      <CoinsContainer>
        <IconContainer color='GreenPrimary' size='Small'>
          <DiamondIcon />
        </IconContainer>
        <CoinsTypography
          quantity={user ? getCostByFieldName(user.items, 'price') : null}
          fontSize='Size14'
        />
      </CoinsContainer>
      <Button disabled variant='YellowOutlined'>
        <span className='text-orange-primary-light text-13 font-medium px-3 py-1.5 md:px-3 md:py-1.5 flex items-center justify-center'>
          {user && (
            <>
              {user.items.length} <span>&nbsp;Items</span>
            </>
          )}
          {!user && '...'}
        </span>
      </Button>
      {isKing && options && selectedOption && setSelectedOption && (
        <ButtonsToggle
          options={options}
          currentSelect={selectedOption}
          peakFunction={setSelectedOption}
        />
      )}
    </div>
  )
}

export default KingSkinsHeader
