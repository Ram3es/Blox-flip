import React, { useState } from 'react'
import { cards } from '../../mocks/cards'
import { Button } from '../base/Button'
import ItemCard from '../common/Cards/ItemCard'
import { QuantityCoinsWithChildren } from '../common/QuantityCoins/QuantityWithChildren'
import JackpotCoins from '../icons/JackpotCoins'
import ModalWrapper from './ModalWrapper'
import { getSumElements } from '../../helpers/jackpotHelpers'
import { IJackpotCard } from '../../types/Jackpot'
import { IItemCard } from '../../types/ItemCard'
import Reload from '../icons/Reload'

const JackpotModal = ({ isOpen, onClose, onSubmit }: { isOpen: boolean, onClose: Function, onSubmit: Function }) => {
  const [allCards, setAllCard] = useState<IItemCard[]>(cards)
  const [selectedCards, setSelectedCard] = useState<IJackpotCard[]>([])

  const onSelectCard = (id: string) => {
    const cardSelected = allCards.find(card => card.id === id)
    if (cardSelected) {
      setSelectedCard(state => [...state, { ...cardSelected, avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/563.jpg' }])
      setAllCard(state => [...state.filter(card => card.id !== id)])
    }
  }
  const handleSubmit = () => {
    onSubmit(selectedCards)
    onClose()
  }

  const onCloseModal = () => {
    onClose()
    setSelectedCard([])
    setAllCard(cards)
  }

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
          <div className='px-2 py-2 rounded border border-green-primary/50 bg-gradient-radial-80 from-green-primary-light/20 to-dark/0'>
            <QuantityCoinsWithChildren
              quantity={getSumElements(allCards, 'price')}
              quantityClasses='flex items-center text-sm font-semibold '
            />
          </div>
          <div className='shrink-0'>
            <Reload />
          </div>
          </div>
        </div>
        <div className=" border-b border-blue-accent-primary" />
        <div className='w-full h-[416px]  mt-5 mb-[110px] xxs:mb-[60px] xs:mb-[34px] overflow-auto scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full pr-6 '>
          <div className='flex flex-wrap overflow-hidden '>
          {allCards.map(card => (
            <ItemCard
              key={card.id}
              id={card.id}
              name={card.name}
              price={card.price}
              image={card.image}
              color={card.color}
              onSelect={onSelectCard}
              itemClasses='px-1 w-1/2 xxs:w-1/4 xs:w-1/5 shrink-0 mb-2 group/item point-hidden' />
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
                 {20}
                 <span className='text-xs uppercase ml-1'>Skins</span>
              </div>
              <div className="rounded text-green-primary border bg-green-primary/15 border-green-primary/50 whitespace-nowrap px-3 py-1.5 leading-6 ">
                  <QuantityCoinsWithChildren
                    quantityClasses='flex items-center text-base font-bold [&>*:first-child]:w-6 [&>*:first-child]:h-6'
                    quantity={getSumElements(selectedCards, 'price')}/>
                </div>
            </div>
            </div>
          </div>
          <div className='flex items-end gap-3 xs:items-center flex-wrap'>
            <div className='flex flex-col items-start xs:flex-row xs:items-center gap-3'>
              <span className='text-xs uppercase text-gray-primary '>
                  Minimum value
              </span>
              <div className="flex bg-green-primary/50 items-center px-2.5 py-1.5 rounded border border-transparent">
                <QuantityCoinsWithChildren
                  quantityClasses='flex items-center text-sm font-bold [&>*:first-child]:w-6 [&>*:first-child]:h-6'
                  quantity={1500} />
              </div>
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
