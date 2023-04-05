import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import clsx from 'clsx'

import { QuantityCoins } from '../../components/common/QuantityCoins/QuantityCoins'
import { UserAvatar } from '../../components/user/UserAvatar'
import ModalWrapper from '../../components/containers/ModalWrapper'
import ItemCard from '../../components/common/Cards/ItemCard'
import CoinFlipLogoIcon from '../../components/icons/CoinFlipLogoIcon'
import SkinBigIcon from '../../assets/img/skin_big.png'
import VersusBattleIcon from '../../assets/img/versus_battle.png'

import { IItemCard } from '../../types/ItemCard'
import { cards } from '../../mocks/cards'

interface CoinFlipGameProps {
  onClose?: Dispatch<SetStateAction<boolean>>
  gameId?: number
}

interface PlayerProps {
  opponent: boolean
}

const Player = ({ opponent }: PlayerProps) => {
  const [items, setItems] = useState<IItemCard[]>([])
  useEffect(() => {
    setItems(cards.map((card) => ({ ...card, isSelected: false })))
  }, [])

  return (
    <div
      className={clsx('w-2/4 h-[420px]', {
        'bg-coinflip-game--orange': !opponent,
        'bg-coinflip-game--blue': opponent
      })}
    >
      <div className='bg-blue-primary-secondary space-y-6'>
        <div className='mt-20 flex items-start justify-around'>
          <div className='mt-[-16px] flex items-center border border-green-primary bg-green-third shadow-green-primary-20 rounded px-3 py-1.5 md:px-4 md:py-1.5'>
            <QuantityCoins quantity={131313} />
          </div>
          <div
            className={clsx(
              'mt-[-55px] w-[117px] h-[117px] flex items-end justify-center border border-blue-highlight rounded-full overflow-hidden',
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
          <div className='mt-[-24px] space-y-3 text-center'>
            <span className='text-base font-bold'>Brrrrrr</span>
            <div className='h-9 bg-blue-ocean-secondary/25 border-2 border-blue-ocean-secondary/50 px-3 md:px-4 rounded font-bold text-sm flex items-center justify-between'>
              47.
              <span className='text-gray-primary uppercase font-semibold text-xs pt-0.5'>
                50 &nbsp;%
              </span>
            </div>
          </div>
        </div>
        <div className='w-full h-[600px] px-2 flex flex-wrap scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full'>
          {items.map((item) => (
            <ItemCard variant='CoinFlipSmall' key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}

const CoinFlipGame = ({ gameId, onClose }: CoinFlipGameProps) => {
  const [items, setItems] = useState<IItemCard[]>([])

  return (
    <ModalWrapper
      closeModal={() => 'hi'}
      modalClasses=' relative px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-5xl w-full m-auto space-y-5 max-h-[555px]'
    >
      <div className='overflow-hidden'>
        <div className='flex justify-between items-center space-x-4 pb-4 xs:pr-10'>
          <div className='flex items-center justify-between space-x-6 text-lg font-bold'>
            <div className='border--coinflip-game w-8 h-8 flex items-center justify-center'>
              <CoinFlipLogoIcon />
            </div>
            <div className='flex items-center'>
              <span className='hidden xxs:block'>CF&nbsp;</span>
              <span className='text-orange-primary-light'>#13</span>
            </div>
            <div className='flex items-center border border-green-primary gradient-green-secondary shadow-green-primary-20 rounded px-3 py-1.5 md:px-4 md:py-1.5'>
              <QuantityCoins quantity={131313} />
            </div>
          </div>
          <div className='absolute left-[40%] top-[-14%] border--coinflip-game w-40 h-40 flex items-center justify-center'>
            <img src={SkinBigIcon} alt='skin' />
          </div>
          <div className='z-100 absolute left-[46.4%] top-[62%] bg-rectangle--yellow w-10 h-10 flex items-center justify-center'>
            <img className='rotate-[-48deg]' src={VersusBattleIcon} alt='versus' />
          </div>
          <div className='flex items-center '>
            <div className='flex items-center space-x-2'>
              <UserAvatar className='w-11 h-10 border border-blue-highlight rounded radial--blue' />
              <span className='font-bold text-sm'>Brrrrrra</span>
            </div>
            <span className='mx-6'>
              <img src={VersusBattleIcon} alt='versus' />
            </span>
            <div className='flex items-center space-x-2'>
              <UserAvatar className='w-11 h-10 border border-blue-highlight rounded radial--blue' />
              <span className='font-bold text-sm'>Brrrrrra</span>
            </div>
          </div>
        </div>
        <div className='flex'>
          <Player opponent={false} />
          <Player opponent={true} />
        </div>
        <div className='absolute z-[50] bottom-0 left-0 w-full text-center py-2.5 px-6 bg-blue-highlight-secondary'>
          <p className='text-blue-ocean-third font-normal text-base'>
            <span className='font-bold'>Server Seed #</span>
            e6c22f866c14ee6c22f866c14ee6c22f866c14ee6c22f866c14ee6c22f866c14ee6c22f866c14e
          </p>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default CoinFlipGame
