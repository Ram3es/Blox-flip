import { Dispatch, SetStateAction } from 'react'

import clsx from 'clsx'

import { Button } from '../../components/base/Button'
import { ListIcon } from '../../components/icons/ListIcon'
import ButtonsToggle from '../../components/base/ButtonToggle'
import CoinsWithDiamond from '../../components/common/CoinsWithDiamond'

import { getCostByFieldName } from '../../helpers/numbers'

import type { TabInterface } from './KingSkins'

import type { IKingPlayer } from '../../types/King'

interface HeaderProps {
  player?: IKingPlayer
  isKing?: boolean
  options?: TabInterface[]
  selectedOption?: TabInterface
  setSelectedOption?: Dispatch<SetStateAction<TabInterface>>
}

const KingSkinsHeader = ({
  player,
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
      <CoinsWithDiamond
        typographyQuantity={player ? getCostByFieldName(player.players_skins, 'price') : null}
      />
      <Button disabled variant='YellowOutlined'>
        <span className='text-orange-primary-light text-13 font-medium px-3 py-1.5 md:px-3 md:py-1.5 flex items-center justify-center'>
          {player && (
            <>
              {player.players_skins.length} <span>&nbsp;Items</span>
            </>
          )}
          {!player && '...'}
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
