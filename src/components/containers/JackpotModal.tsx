import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { cards } from '../../mocks/cards'
import { Button } from '../base/Button'
import ItemCard from '../common/Cards/ItemCard'
import JackpotCoins from '../icons/JackpotCoins'
import ModalWrapper from './ModalWrapper'
import { getCostByFieldName } from '../../helpers/numbers'
import RefreshIcon from '../icons/RefreshIcon'
import CoinsWithDiamond from '../common/CoinsWithDiamond'
import { IJackpotCard } from '../../types/Jackpot'

const JackpotModal = ({ isOpen, onClose, onSubmit, userAvatar }: { userAvatar: string, isOpen: boolean, onClose: Function, onSubmit: Function }) => {
  const [allCards, setAllCard] = useState<IJackpotCard[]>([])
  const selectedCards = allCards.filter((item) => item.isSelected)
  const refreshIconRef = useRef<HTMLDivElement>(null)

  const initialItems = useMemo(() => {
    return cards.map((card) => ({
      ...card,
      isSelected: false,
      avatar: userAvatar
    }))
  }, [])

  const updateArrayBySelectedItem = (
    items: IJackpotCard[],
    id: string,
    isSelected: boolean
  ): IJackpotCard[] => {
    return items.map((item) => (item.id === id ? { ...item, isSelected } : item))
  }

  const isItemSelected = (items: IJackpotCard[], id: string): boolean => {
    return items.some((item) => item.id === id && item.isSelected)
  }

  const handleSelectItem = useCallback(
    (id: string) => {
      const item = allCards.find((item) => item.id === id)

      if (item) {
        const isSelected = isItemSelected(allCards, item.id)

        setAllCard((prev) => updateArrayBySelectedItem(prev, id, !isSelected))
      }
    },
    [allCards, isItemSelected, updateArrayBySelectedItem]
  )

  const onReset = () => {
    if (refreshIconRef?.current) {
      if (refreshIconRef?.current?.classList.contains('animate-reset-card')) {
        return
      }
      refreshIconRef.current.classList.add('animate-reset-card')
      setTimeout(() => refreshIconRef?.current && refreshIconRef.current.classList.remove('animate-reset-card'), 400)
    }

    // setAllCard(cards)
  }

  const handleSubmit = () => {
    onSubmit(selectedCards)
    onClose()
  }

  const onCloseModal = () => {
    onClose()
  }

  useEffect(() => {
    setAllCard(initialItems)
  }, [initialItems])

  return isOpen
    ? (
      <ModalWrapper
        modalClasses='relative py-5 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-5xl w-full m-auto  overflow-hidden'
        closeModal={onCloseModal}>
         <div className=" flex flex-col xs:flex-row justify-between items-center mr-0 xxs:mr-10 mb-5">
          <div className=' shrink-0 flex justify-center xs:justify-start mb-4 xs:mb-0 items-center text-blue-golf'>
            <JackpotCoins />
            <h3 className='text-2xl font-bold ml-3 text-white '>Join jackpot</h3>
          </div>
          <div className='flex flex-col xxs:flex-row justify-start xxs:justify-evenly xs:justify-end items-center text-13 text-[#5A67A3] w-full gap-3 mr-2 '>
            <div className=' px-4 py-2 rounded border border-orange-primary-light/50  bg-gradient-radial-80 from-orange-primary-light/20 to-dark/0'>
              <span className='text-white min-w-10'>{allCards.length}</span>
              <span className='text-orange-primary-light ml-1.5'>Items</span>
          </div>
          <span className='shrink-0 block ' >Inventory value</span>
          <CoinsWithDiamond
            containerColor='GreenGradient'
            containerSize='XL'
            typographyQuantity={getCostByFieldName(allCards, 'price')}
          />
          <div
            ref={refreshIconRef}
            onClick={onReset}
            className='shrink-0 cursor-pointer p-2'
            >
             <RefreshIcon />
          </div>
          </div>
        </div>
        <div className=" border-b border-blue-accent-primary" />
        <div className='w-full h-[416px]  mt-5 mb-[110px] xxs:mb-[60px] xs:mb-[34px] overflow-auto scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full pr-6 '>
          <div className='flex flex-wrap overflow-hidden '>
          {allCards.map(card => (
            <ItemCard
              key={card.id}
              onSelect={handleSelectItem}
              variant='CoinFlip'
              {...card} />
          ))}
          </div>
        </div>
        <div className='absolute z-[50] bottom-0 left-0 w-full  flex items-center justify-between py-2.5 px-6 bg-[#2F375F] '>
          <div className='flex xs:items-end items-center gap-3'>
            <div className='flex flex-col items-start xs:flex-row xs:items-center gap-3 '>
            <span className='text-gray-primary text-sm leading-4'>Total selected</span>
            <div className='flex items-center gap-3 flex-wrap'>
              <div className='bg-[#5a67a340] border border-[#5a67a380] rounded-[3px] px-2.5 py-1.5 text-gray-primary'>
                 <span className='text-base text-white'>{selectedCards.length}/</span>
                 {15}
                 <span className='text-xs uppercase ml-1'>Skins</span>
              </div>
                <CoinsWithDiamond
                  containerColor='GreenGradientSecondary'
                  containerSize='Large'
                  typographyQuantity={getCostByFieldName(selectedCards, 'price')}
                  typographyFontSize='Size16'
                 />
            </div>
            </div>
          </div>
          <div className='flex items-end gap-3 xs:items-center flex-wrap'>
            <div className='flex flex-col items-start xs:flex-row xs:items-center gap-3'>
              <span className='text-xs uppercase text-gray-primary '>
                  Minimum value
              </span>
                <CoinsWithDiamond containerColor='GreenGradientSecondary' typographyQuantity={1500} />
            </div>
          <Button
            onClick={handleSubmit}
            className='bg-green-primary hover:bg-green-500  border border-green-primary py-2.5 px-4 leading-4 rounded '
            >
                Create
            </Button>
            </div>

        </div>
      </ModalWrapper>
      )
    : null
}

export default JackpotModal
