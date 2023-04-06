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
  console.log(items.length)

  return (
    <div
      className={clsx('w-2/4 h-[400px] xs:h-[420px]', {
        'bg-coinflip-game--orange': !opponent,
        'bg-coinflip-game--blue': opponent
      })}
    >
      <div className='bg-blue-primary-secondary space-y-6 h-full'>
        <div className='mt-4 xs:mt-20 flex xs:flex-row flex-col items-start justify-around'>
          <div className='mt-[-16px] xs:mx-0 mx-auto flex items-center border border-green-primary bg-green-third shadow-green-primary-20 rounded px-3 py-1.5 md:px-4 md:py-1.5'>
            <QuantityCoins quantity={131313} />
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

const CoinFlipGame = ({ gameId, onClose }: CoinFlipGameProps) => {
  return (
    <ModalWrapper
      closeModal={() => 'hi'}
      modalClasses='relative px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-5xl w-full m-auto space-y-5 max-h-[555px]'
    >
      <div className='overflow-hidden pt-6 xs:pt-0'>
        <div className='flex flex-col xs:flex-row justify-between items-center space-y-2 xs:space-y-0 xs:space-x-4 pb-4 xs:pr-10'>
          <div className='flex items-center justify-between space-x-2 pr-20 xs:pr-0 xs:space-x-6 text-lg font-bold'>
            <div className='flex border--coinflip-game w-8 h-8 items-center justify-center'>
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
          <div className='flex absolute top-[-20%] xs:left-[40%] xs:top-[-14%] border--coinflip-game w-32 xs:w-40 h-32 xs:h-40 items-center justify-center'>
            <img src={SkinBigIcon} alt='skin' />
          </div>
          <div className='z-100 absolute hidden left-[45.2%] md:left-[46.4%] xs:top-[62%] bg-rectangle--yellow w-10 h-10 xs:flex items-center justify-center'>
            <img className='rotate-[-48deg]' src={VersusBattleIcon} alt='versus' />
          </div>
          <div className='flex items-center'>
            <div className='flex items-center space-x-2'>
              <UserAvatar className='w-11 h-10 border border-blue-highlight rounded radial--blue' />
              <span className='font-bold text-sm hidden md:block'>Brrrrrra</span>
            </div>
            <span className='mx-6'>
              <img src={VersusBattleIcon} alt='versus' />
            </span>
            <div className='flex items-center space-x-2'>
              <UserAvatar className='w-11 h-10 border border-blue-highlight rounded radial--blue' />
              <span className='font-bold text-sm hidden md:block'>Brrrrrra</span>
            </div>
          </div>
        </div>
        <div className='flex'>
          <Player opponent={false} />
          <Player opponent={true} />
        </div>
        <div className='absolute z-[50] bottom-0 left-0 w-full text-center py-2.5 px-6 bg-blue-highlight-secondary'>
          <p className='text-clip overflow-hidden text-blue-ocean-third font-normal text-base'>
            <span className='font-bold'>Server Seed #</span>
            e6c22f866c14ee6c22f866c14ee6c22f866c14ee6c22f866c14ee6c22f866c14ee6c22f866c14e
          </p>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default CoinFlipGame
