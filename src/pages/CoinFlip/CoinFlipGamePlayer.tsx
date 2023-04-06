import { useEffect, useState } from 'react'

import clsx from 'clsx'

import QuantityCoinsContainer from '../../components/common/QuantityCoins/QuantityCoinsContainer'
import ItemCard from '../../components/common/Cards/ItemCard'
import WinPercent from '../../components/common/WinPercent'
import { QuantityCoins } from '../../components/common/QuantityCoins/QuantityCoins'
import { UserAvatar } from '../../components/user/UserAvatar'

import SkinBigIcon from '../../assets/img/skin_big.png'

import CoinFlipHead from '../../assets/img/head_medium.png'
import CoinFlipTail from '../../assets/img/CoinFlipTail.png'
import QuestionMark from '../../assets/img/question_mark.svg'

import { IItemCard } from '../../types/ItemCard'

import { cards } from '../../mocks/cards'
import { Button } from '../../components/base/Button'

interface PlayerProps {
  opponent: boolean
  selectedCoin: 0 | 1
  isBot?: boolean
}

const CoinFlipGamePlayer = ({ opponent, selectedCoin, isBot }: PlayerProps) => {
  const [items, setItems] = useState<IItemCard[]>([])

  useEffect(() => {
    setItems(cards.map((card) => ({ ...card, isSelected: false })))
  }, [])

  const containerClasses = clsx('w-2/4 h-[400px] xs:h-[420px]', {
    'bg-coinflip-game--orange': !opponent,
    'bg-coinflip-game--blue': opponent
  })

  const avatarClasses = clsx(
    'hidden xs:flex mt-[-55px] w-[117px] h-[117px] items-end justify-center border border-blue-highlight rounded-full overflow-hidden',
    {
      'bg-circle-avatar--yellow': !opponent,
      'bg-circle-avatar--blue': opponent
    }
  )

  return (
    <div className={containerClasses}>
      <div className='bg-blue-primary-secondary space-y-6 h-full'>
        <div className='mt-4 xs:mt-20 flex xs:flex-row flex-col items-start justify-around'>
          <div className='mt-[-16px] xs:mx-0 mx-auto flex bg-green-third'>
            <QuantityCoinsContainer size='SMALL'>
              <QuantityCoins quantity={isBot ? null : 124124} />
            </QuantityCoinsContainer>
          </div>
          <div className={avatarClasses}>
            <div className='w-21 h-21'>
              <UserAvatar image={isBot ? QuestionMark : ''} />
            </div>
          </div>
          <div className='ml-1 xs:ml-0 xs:mt-[-24px] xs:space-y-3 text-center'>
            <span className='text-base font-bold'>{isBot ? '...' : 'Braaaaa'}</span>
            <WinPercent />
          </div>
        </div>
        <div className='relative'>
          <div className='absolute top-[-74px] right-2 xs:right-[80px] xs:top-[-155px] sm:right-[145px]'>
            <img
              src={(opponent && SkinBigIcon) || (selectedCoin === 0 ? CoinFlipHead : CoinFlipTail)}
              className='w-12 h-12 xs:w-14 xs:h-14 '
              alt={selectedCoin === 0 ? CoinFlipHead : CoinFlipTail}
            />
          </div>
        </div>
        <div className='hidden xs:block border-b border-blue-accent ml-2 mr-7' />
        <div className='pb-48 xs:pb-60 w-full pr-3 -mr-2 flex flex-wrap overflow-y-auto min-h-[276px] max-h-full scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full'>
          {!isBot &&
            items.map((item) => <ItemCard variant='CoinFlipSmall' key={item.id} {...item} />)}
          {isBot && (
            <div className='px-2 my-10 mx-auto space-y-2'>
              <Button color='GreenPrimary'>
                <div className='w-32 xs:w-40 h-9 flex items-center justify-center'>Call bot</div>
              </Button>
              <Button color='BlueAccentSix'>
                <div className='w-32 xs:w-40 h-9 flex items-center justify-center text-blue-ocean-secondary'>
                  Cancel
                </div>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CoinFlipGamePlayer
