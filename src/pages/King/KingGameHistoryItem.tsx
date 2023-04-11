import { Disclosure } from '@headlessui/react'

import clsx from 'clsx'

import ItemCard from '../../components/common/Cards/ItemCard'
import ItemsList from '../../components/common/ItemsList'
import { QuantityCoins } from '../../components/common/QuantityCoins/QuantityCoins'
import { UserAvatar } from '../../components/user/UserAvatar'

import { ArrowGrayIcon } from '../../components/icons/ArrowGrayIcon'

import KingIcon from '../../assets/img/king_icon.png'
import SwordsIcon from '../../assets/img/swords_king.svg'
import SmallDashedSpacer from '../../assets/img/dashed_spacer_small.png'

import { IKingGame } from '../../types/King'

interface KingGameHistoryItemProps {
  game: IKingGame
}

const KingGameHistoryItem = ({ game }: KingGameHistoryItemProps) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <div className='p-2 py-6 flex items-center justify-between h-20 border border-dashed border-blue-highlight bg-gradient-to-t from-dark/20 to-blue-highlight/10'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center justify-between'>
                <UserAvatar className='w-14 h-14' />
                <img src={KingIcon} className='w-10 h-8' />
                <QuantityCoins quantity={1500} />
              </div>
              <div className='flex items-center justify-center'>
                <img src={SwordsIcon} className='scale-50' />
              </div>
              <div className='flex items-center justify-between'>
                <QuantityCoins quantity={1500} />
                <div className='bg-gradient-blue--king'>
                  <UserAvatar className='w-14 h-14' />
                </div>
              </div>
            </div>
            <img src={SmallDashedSpacer} alt='dashed spacer' />
            <div>
              <p>Game 3 - Round 2</p>
              <p>Hash: blablalbalbla1124124</p>
            </div>
            <img src={SmallDashedSpacer} alt='dashed spacer' />
            <ItemsList items={game.firstPlayer.items} />
            <Disclosure.Button
              className={clsx('px-3 py-3 text-lightblue-secondary-darken', {
                'rotate-180 transform': open
              })}
            >
              <ArrowGrayIcon />
            </Disclosure.Button>
          </div>
          <Disclosure.Panel>
            <div className='mx-5 bg-blue-darken/70 rounded'>
              <div className='p-2 flex flex-wrap overflow-y-auto h-[200px] scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full'>
                {game.firstPlayer.items.slice(0, 2).map((item) => (
                  <ItemCard
                    key={item.id + new Date().getMilliseconds().toString()}
                    variant='KingList'
                    {...item}
                  />
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default KingGameHistoryItem
