import { Dispatch, SetStateAction } from 'react'

import clsx from 'clsx'

import { Button } from '../../components/base/Button'
import { ListIcon } from '../../components/icons/ListIcon'
import ButtonsToggle from '../../components/base/ButtonToggle'
import CoinsWithDiamond from '../../components/common/CoinsWithDiamond'

import { getCostByFieldName } from '../../helpers/numbers'

import type { TabInterface } from './KingSkins'

import { IItemCard } from '../../types/ItemCard'

interface HeaderProps {
  skins: IItemCard[]
  gameRound?: number
  isKing?: boolean
  options?: TabInterface[]
  selectedOption?: TabInterface
  setSelectedOption?: Dispatch<SetStateAction<TabInterface>>
}

const KingSkinsHeader = ({
  skins,
  gameRound,
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
        {isKing ? 'Champion items' : 'Challenger items'}
      </div>
      <CoinsWithDiamond
        typographyQuantity={skins.length > 0 ? getCostByFieldName(skins, 'price') : null}
      />
      <Button disabled variant='YellowOutlined'>
        <span className='text-orange-primary-light text-13 font-medium px-3 py-1.5 md:px-3 md:py-1.5 flex items-center justify-center'>
          {skins.length > 0 && (
            <>
              {skins.length} <span>&nbsp;Items</span>
            </>
          )}
          {skins.length <= 0 && '...'}
        </span>
      </Button>
      {isKing && options && selectedOption && setSelectedOption && (
        <ButtonsToggle
          options={options}
          currentSelect={selectedOption}
          peakFunction={!gameRound || gameRound <= 1 ? () => 0 : setSelectedOption}
        />
      )}
    </div>
  )
}

export default KingSkinsHeader
