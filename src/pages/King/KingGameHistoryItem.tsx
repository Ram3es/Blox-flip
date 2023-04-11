import { useState } from 'react'
import { Disclosure } from '@headlessui/react'

import clsx from 'clsx'

import ItemCard from '../../components/common/Cards/ItemCard'
import ItemsList from '../../components/common/ItemsList'
import { Button } from '../../components/base/Button'
import { CopyIcon } from '../../components/icons/CopyIcon'

import { ArrowGrayIcon } from '../../components/icons/ArrowGrayIcon'

import SwordsIcon from '../../assets/img/swords_king.svg'
import SmallDashedSpacer from '../../assets/img/dashed_spacer_small.png'

import { IKingGame } from '../../types/King'
import KingGameHistoryPlayer from './KingGameHistoryPlayer'

interface KingGameHistoryItemProps {
  game: IKingGame
}

const KingGameHistoryItem = ({ game }: KingGameHistoryItemProps) => {
  const [hashCode] = useState('895b7f3ef391e048da04ce3d895b7f3ef391e048da04ce3d')
  const handleReferralLinkCopy = () => {
    navigator.clipboard.writeText(hashCode).catch((error) => {
      console.log(error)
    })
  }

  return (
    <Disclosure>
      {({ open }) => (
        <div>
          <div className='p-2 py-6 flex items-center justify-between h-16 rounded border border-dashed border-blue-highlight bg-gradient-to-t from-dark/20 to-blue-highlight/10'>
            <div className='flex items-center justify-between'>
              <KingGameHistoryPlayer isKing />
              <div className='flex items-center justify-center'>
                <img src={SwordsIcon} className='scale-50' />
              </div>
              <KingGameHistoryPlayer />
            </div>
            <img src={SmallDashedSpacer} alt='dashed spacer' />
            <div>
              <p className='font-medium'>Game 3 - Round 2</p>
              <div className='flex items-center'>
                <span className='max-w-[120px] font-normal text-13 text-gray-accent truncate'>
                  Hash: {hashCode}
                </span>
                <Button onClick={handleReferralLinkCopy} type='button'>
                  <CopyIcon iconClasses='w-2.5 h-3' />
                </Button>
              </div>
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
            <div className='mx-5 bg-blue-darken/70 rounded-br rounded-bl'>
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
        </div>
      )}
    </Disclosure>
  )
}

export default KingGameHistoryItem
