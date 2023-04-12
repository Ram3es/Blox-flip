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
import useCopyToClipboard from '../../helpers/hooks/useCopyToClipboard'

interface KingGameHistoryItemProps {
  game: IKingGame
}

const KingGameHistoryItem = ({ game }: KingGameHistoryItemProps) => {
  const { text: hashCode, handleCopyText: handleCopyHashCode } = useCopyToClipboard(
    '895b7f3ef391e048da04ce3d895b7f3ef391e048da04ce3d'
  )

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <div className='p-2 py-6 flex flex-col gap-2 ls:flex-row items-center justify-between h-full ls:h-16 rounded-xl border border-dashed border-blue-highlight bg-gradient-to-t from-dark/20 to-blue-highlight/10'>
            <div className='flex items-center justify-between gap-3'>
              <KingGameHistoryPlayer isKing />
              <div className='rotate-[45deg] h-[30px] w-[30px] rounded-lg flex items-center justify-center gradient-border--yellow gradient-background--darkblue mr-1'>
                <img src={SwordsIcon} className='scale-150 rotate-[-45deg]' />
              </div>
              <KingGameHistoryPlayer />
            </div>
            <img src={SmallDashedSpacer} className='ls:block hidden' alt='dashed spacer' />
            <div>
              <p className='font-medium'>Game 3 - Round 2</p>
              <div className='flex items-center'>
                <span className='max-w-[160px] font-normal text-13 text-gray-accent truncate'>
                  Hash: {hashCode}
                </span>
                <Button onClick={handleCopyHashCode} type='button'>
                  <CopyIcon iconClasses='w-2.5 h-3' />
                </Button>
              </div>
            </div>
            <img src={SmallDashedSpacer} className='ls:block hidden' alt='dashed spacer' />
            <Disclosure.Button>
              <ItemsList items={game.firstPlayer.items} />
            </Disclosure.Button>
            <Disclosure.Button
              className={clsx('px-3 py-3 text-lightblue-secondary-darken ls:block hidden', {
                'rotate-180 transform': open
              })}
            >
              <ArrowGrayIcon />
            </Disclosure.Button>
          </div>
          <Disclosure.Panel>
            <div className='mx-5 bg-blue-darken/70 rounded-br rounded-bl'>
              <div className='p-2 flex flex-wrap overflow-y-auto h-[200px] scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full'>
                {game.firstPlayer.items.map((item) => (
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
