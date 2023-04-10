import { Dispatch, SetStateAction } from 'react'

import clsx from 'clsx'

import { Button } from '../../components/base/Button'
import { QuantityCoins } from '../../components/common/QuantityCoins/QuantityCoins'
import { ListIcon } from '../../components/icons/ListIcon'
import ButtonsToggle from '../../components/base/ButtonToggle'

import { TabInterface } from './KingGameInventories'
import { ISecondUser } from '../../types/User'

interface HeaderProps {
  user: ISecondUser
  isKing?: boolean
  options?: TabInterface[]
  selectedOption?: TabInterface
  setSelectedOption?: Dispatch<SetStateAction<TabInterface>>
}

const KingGameInventoriesHeader = ({
  user,
  isKing,
  options,
  selectedOption,
  setSelectedOption
}: HeaderProps) => {
  const headingClasses = clsx('flex items-center gap-2 font-bold text-base', {
    'gradient-king-text': isKing,
    'text-gray-primary': !isKing
  })

  return (
    <div className='flex items-center gap-4'>
      <div className={headingClasses}>
        <ListIcon />
        {isKing ? 'Kings items' : 'Opponents items'}
      </div>
      <QuantityCoins quantity={1500} />
      <Button disabled variant='HighlightDarken'>
        <span className='text-orange-primary-light text-13 font-medium px-3 py-1.5 md:px-4 md:py-2.5 flex items-center justify-center'>
          7 <span className='hidden md:block'>&nbsp;Items</span>
        </span>
      </Button>
      {isKing && options && selectedOption && setSelectedOption && (
        <ButtonsToggle
          options={options}
          currentSelect={selectedOption}
          peackFunction={setSelectedOption}
        />
      )}
    </div>
  )
}

export default KingGameInventoriesHeader
