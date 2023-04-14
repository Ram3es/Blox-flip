import { Dispatch, SetStateAction } from 'react'

import clsx from 'clsx'

import { Button } from '../../components/base/Button'
import { QuantityCoins } from '../../components/common/QuantityCoins/QuantityCoins'
import { ListIcon } from '../../components/icons/ListIcon'
import ButtonsToggle from '../../components/base/ButtonToggle'

import type { TabInterface } from './KingGameInventories'
import type { ISecondUser } from '../../types/User'

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
  const headingClasses = clsx('flex items-center gap-2 font-bold text-10 xs:text-base', {
    'gradient-king-yellow-text': isKing,
    'text-gray-primary': !isKing
  })

  return (
    <div className='flex items-start ls:items-center ls:flex-row flex-col gap-4'>
      <div className={headingClasses}>
        <p className='hidden ls:block text-yellow-primary-accent'>
          <ListIcon />
        </p>
        {isKing ? 'Kings items' : 'Opponents items'}
      </div>
      <QuantityCoins quantity={1500} />
      <Button disabled variant='YellowOutlined'>
        <span className='text-orange-primary-light text-13 font-medium px-3 py-1.5 md:px-3 md:py-1.5 flex items-center justify-center'>
          {7} <span>&nbsp;Items</span>
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

export default KingGameInventoriesHeader
