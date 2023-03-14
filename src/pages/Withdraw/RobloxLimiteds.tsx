import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import ItemCard from '../../components/base/ItemCard'
import { QuantityCoinsWithChildren } from '../../components/common/QuantityCoins/QuantityWithChildren'
import DiamondIcon from '../../components/icons/DiamondIcon'
import RemoveArrowBold from '../../components/icons/RemoveArrowBold'
import { searchData } from '../../helpers/searchData'
import { sortData } from '../../helpers/sortData'
import { cards } from '../../mocks/cards'
import { IItemCard } from '../../types/itemCard'

const RobloxLimiteds = () => {
  const [allCards, setAllCards] = useState<IItemCard[]>(cards)
  const {
    sortBy,
    direction,
    searchBy,
    priceRange,
    selectedCards,
    setSelectedCard
  } = useOutletContext<{ sortBy?: string, searchBy: string, direction?: 'ASC' | 'DESC', priceRange: { from: number, to: number }, selectedCards: IItemCard[], setSelectedCard: Dispatch<SetStateAction<IItemCard[]>> }>()

  const ranged = useMemo(() => allCards.filter((card) => card.price >= priceRange.from && card.price <= priceRange.to), [priceRange, allCards])
  const filtered = useMemo(() => searchData(ranged, 'name', searchBy), [searchBy, allCards, ranged])
  const sorted = useMemo(() => {
    if (sortBy && direction) {
      return sortData(filtered, sortBy as keyof IItemCard, direction)
    } else {
      return filtered
    }
  }, [direction, filtered, sortBy])
  const totalPriceSelected = selectedCards.reduce((acc, item) => acc + item.price, 0)

  const addToSelectedCard = (card: IItemCard) => {
    setSelectedCard(state => [...state, card])
    setAllCards(removeCard(allCards, card.id))
  }

  const addToAllCard = (card: IItemCard) => {
    setAllCards(state => [...state, card])
    setSelectedCard(removeCard(selectedCards, card.id))
  }

  const removeCard = (data: IItemCard[], cardId: string) => {
    return data.filter(item => item.id !== cardId)
  }

  useEffect(() => {
    return () => setSelectedCard([])
  }, [])

  return (
    <div className='flex'>
      <div className="max-w-1470 w-full flex flex-wrap xs:flex-nowrap mx-auto grow -mb-3 xs:-mb-6 ">
        <div className="order-2 xs:order-1 grow rounded border xs:border-b-0 border-sky-primary/30 w-full xs:w-auto mb-5 xs:mb-0">
          <div className="bg-gradient-radial from-blue-light-secondary/20 to-blue-accent-secondary/0 rounded h-full overflow-hidden p-3 pb-1 xs:pb-3">
            <div className="flex flex-wrap -mx-1 text-sm ">
              {sorted.map(card => (
                <ItemCard
                  key={card.id}
                  id={card.id}
                  name={card.name}
                  price={card.price}
                  image={card.image}
                  color={card.color}
                  onSelect={() => addToSelectedCard(card)}
                  itemClasses='px-1 w-1/2 xxs:w-1/2 xs:w-1/3 md:w-1/4 ls:w-1/5 lg:w-1/7 shrink-0 3xl:w-1/8 mb-2' />
              ))}
            </div>
          </div>
        </div>
       <div className="order-1 xs:order-2 w-full xs:w-64 shrink-0 bg-dark/20 border xs:border-b-0 border-dashed border-sky-primary/40 xs:ml-5 mb-5 xs:mb-0 rounded-t min-h-fit sm:min-h-full">
        <div className="p-4 bg-gradient-radial from-blue-light-secondary/10 to-blue-accent-secondary/1 min-h-full">
          <div className="relative z-20">
            <div className="flex justify-between border-b border-b-blue-accent mb-4 sm:mr-5">
              <div className="flex items-center justify-between w-full text-xs font-bold mb-4 ">
                <span className="flex items-center min-w-fit shrink-0  text-gray-primary">
                  <RemoveArrowBold iconClasses='group-hover mr-2' />
                  <span className='text-white'>{selectedCards.length} ITEMS</span>
                </span>
                <QuantityCoinsWithChildren
                    quantity={totalPriceSelected}
                    quantityClasses='flex items-center text-sm font-bold  '>
                      <span className="w-6 h-6 text-center leading-6 bg-green-primary/20 rounded relative mr-1.5 text-green-secondary">
                        <DiamondIcon className='-inset-full absolute m-auto' />
                      </span>
                 </QuantityCoinsWithChildren>
              </div>
            </div>
          <div className="flex flex-wrap -mx-1 text-sm group/item is-added">
            {selectedCards.map(card => (
                <ItemCard
                  key={card.id}
                  id={card.id}
                  name={card.name}
                  price={card.price}
                  image={card.image}
                  color={card.color}
                  onSelect={() => addToAllCard(card)}
                  itemClasses='px-1 shrink-0 w-full xxs:w-1/2 xs:w-full mb-2'
                />))}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default RobloxLimiteds
