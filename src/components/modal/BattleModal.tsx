import React, { useState } from 'react'
import { unboxCard } from '../../mocks/cards'
import { IItemCard } from '../../types/itemCard'
import { Button } from '../base/Button'
// import { searchData } from '../../helpers/searchData'
import ModalWrapper from '../base/ModalWrapper'
import UnboxingCard from '../base/UnboxingCard'
import GreenTipSelect from '../common/GreenTipSelect'
import { QuantityCoinsWithChildren } from '../common/QuantityCoins/QuantityWithChildren'
import SearchInput from '../common/SearchInput'
import DaggersGreenGradient from '../icons/DaggersGreenGradient'

const BattleModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: Function }) => {
  const [unboxCards, setAllCards] = useState<IItemCard[]>(unboxCard)
  const [selectedCards, setSelected] = useState<IItemCard[]>([])
  // const { priceRange, searchBy } = useToolbarState()

  const totalPriceSelected = selectedCards.reduce((acc, item) => acc + item.price, 0)
  // const ranged = useMemo(() => unboxCards.filter((card) => card.price >= priceRange.from && card.price <= priceRange.to), [priceRange, unboxCards])
  // const filtered = useMemo(() => searchData(ranged, 'name', searchBy), [searchBy, unboxCards, ranged])

  const onSelect = (card: IItemCard) => {
    setSelected(state => ([...state, card]))
    setAllCards(state => ([...state.filter(orgCard => orgCard.id !== card.id)]))
  }
  return isOpen
    ? (
    <ModalWrapper
      modalClasses='relative py-5 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-5xl w-full m-auto  overflow-hidden'
      closeModal={onClose}>

        <div className=" flex flex-col xs:flex-row justify-between items-center mr-10 mb-5">
          <div className='w-full flex justify-center xs:justify-start items-center'>
            <DaggersGreenGradient iconClasses='h-[25px] w-[25px]' />
            <h3 className='text-2xl font-bold ml-3 '>Battle Creation</h3>
          </div>
          <div className=' w-full flex justify-center xs:justify-end gap-5 mt-5 xs:mt-0 xs:gap-2'>
            <GreenTipSelect onSelect={() => {}} />
            <SearchInput placeholder='Search cases' value={''} onChange={() => {}} />
          </div>
        </div>
        <div className=" border-b border-blue-accent-secondary" />
        <div className='w-full max-h-[calc(100vh_-_210px)]  mt-5 mb-[34px] flex flex-wrap  overflow-auto scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full  pr-3 -mr-2 '>
            {unboxCards.map((card) => (
                <UnboxingCard
                   key={card.id}
                   id={card.id}
                   name={card.name}
                   price={card.price}
                   onSelect={() => onSelect(card)} />
            ))}
        </div>
        <div className='absolute z-[50] bottom-0 left-0 w-full  flex items-center justify-between py-2.5 px-6 bg-[#2F375F] '>
            <div className='flex items-center gap-2'>
                <span className='text-gray-primary text-sm'>Total cost</span>
                <div className="flex bg-green-primary/15 items-center px-1.5 py-1 rounded">
                <QuantityCoinsWithChildren quantity={totalPriceSelected} />
              </div>
            </div>
            <Button
              onClick={() => {} }
              className='bg-green-primary hover:bg-green-500  border border-green-primary py-2 px-4 leading-4 rounded '
            >
                Complete
            </Button>

        </div>
    </ModalWrapper>
      )
    : null
}

export default BattleModal
