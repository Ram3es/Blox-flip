import { useEffect, useState } from 'react'

import clsx from 'clsx'

import QuantityCoinsContainer from '../../components/common/QuantityCoins/QuantityCoinsContainer'
import ItemCard from '../../components/common/Cards/ItemCard'
import { QuantityCoins } from '../../components/common/QuantityCoins/QuantityCoins'
import { UserAvatar } from '../../components/user/UserAvatar'

import { IItemCard } from '../../types/ItemCard'

import { cards } from '../../mocks/cards'

interface PlayerProps {
  opponent: boolean
}

const CoinFlipGamePlayer = ({ opponent }: PlayerProps) => {
  const [items, setItems] = useState<IItemCard[]>([])
  useEffect(() => {
    setItems(cards.map((card) => ({ ...card, isSelected: false })))
  }, [])

  return (
    <div
      className={clsx('w-2/4 h-[400px] xs:h-[420px]', {
        'bg-coinflip-game--orange': !opponent,
        'bg-coinflip-game--blue': opponent
      })}
    >
      <div className='bg-blue-primary-secondary space-y-6 h-full'>
        <div className='mt-4 xs:mt-20 flex xs:flex-row flex-col items-start justify-around'>
          <div className='mt-[-16px] xs:mx-0 mx-auto flex  bg-green-third'>
            <QuantityCoinsContainer size='SMALL'>
              <QuantityCoins quantity={14214.51} />
            </QuantityCoinsContainer>
          </div>
          <div
            className={clsx(
              'hidden xs:flex mt-[-55px] w-[117px] h-[117px] items-end justify-center border border-blue-highlight rounded-full overflow-hidden',
              {
                'bg-circle-avatar--yellow': !opponent,
                'bg-circle-avatar--blue': opponent
              }
            )}
          >
            <div className='w-21 h-21'>
              <UserAvatar />
            </div>
          </div>
          <div className='xs:mt-[-24px] xs:space-y-3 text-center xs:mx-0 mx-auto'>
            <span className='text-base font-bold'>Brrrrrr</span>
            <div className='h-9 bg-blue-ocean-secondary/25 border-2 border-blue-ocean-secondary/50 px-3 md:px-4 rounded font-bold text-sm flex items-center justify-between'>
              47.
              <span className='text-gray-primary uppercase font-semibold text-xs pt-0.5'>
                50 &nbsp;%
              </span>
            </div>
          </div>
        </div>
        <div className='pb-48 xs:pb-52 w-full pr-3 -mr-2 flex flex-wrap overflow-y-auto min-h-[276px] max-h-full scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full'>
          {items.map((item) => (
            <ItemCard variant='CoinFlipSmall' key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CoinFlipGamePlayer
