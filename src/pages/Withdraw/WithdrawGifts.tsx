import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'

import { searchData } from '../../helpers/searchData'
import { sortData } from '../../helpers/sortData'

import { TSocket } from '../../store/SocketStore'
import { giftCards } from '../../mocks/giftCrads'
import CardWithCounter from '../../components/common/Cards/CardWithCounter'
import GiftCardHorizontal from '../../components/common/Cards/GiftCardVertical'
import WithdrawGiftModal from '../../components/containers/WithdrawGiftModal'

export interface GiftCardInterface {
  id: string
  name: string
  price: number
  pic: string
  amount: number
  status: 'pending' | 'active'
  isSelected?: boolean
}

interface GiftModalInterface {
  isOpen: boolean
  data: null | GiftCardInterface
}

const WithdrawGifts = () => {
  const {
    sortBy,
    direction,
    searchBy,
    priceRange,
    selectedCards: cards,
    setSelectedCard: setCards
  } = useOutletContext<{
    sortBy?: string
    searchBy: string
    direction?: 'ASC' | 'DESC'
    priceRange: { from: number; to: number }
    selectedCards: GiftCardInterface[]
    setSelectedCard: Dispatch<SetStateAction<GiftCardInterface[]>>
    socket: TSocket
  }>()

  const [giftModal, setGiftModal] = useState<GiftModalInterface>({ isOpen: false, data: null })

  useEffect(() => {
    setCards(giftCards)
  }, [])

  const selectedCards = useMemo(() => cards.filter((card) => card.isSelected), [cards])

  const ranged = useMemo(
    () => cards.filter((card) => card.price >= priceRange.from && card.price <= priceRange.to),
    [priceRange, cards]
  )
  const filtered = useMemo(() => searchData(ranged, 'name', searchBy), [searchBy, cards, ranged])
  const sorted = useMemo(() => {
    if (sortBy && direction) {
      return sortData(filtered, sortBy as keyof GiftCardInterface, direction)
    } else {
      return filtered
    }
  }, [direction, filtered, sortBy])

  const handleSelectCard = (card: GiftCardInterface) => {
    if (!card.isSelected) {
      setCards((prevState) =>
        prevState.map((item) =>
          item.id === card.id ? { ...card, isSelected: true, amount: 1 } : item
        )
      )
    }
  }

  const handleChangeCount = useCallback(
    (card: GiftCardInterface, type: 'increment' | 'decrement') => {
      setCards((prevState) =>
        prevState.map((item) => {
          return item.id === card.id
            ? {
                ...card,
                isSelected: !(type === 'decrement' && item.amount === 0),
                amount: type === 'increment' ? item.amount++ : item.amount--
              }
            : item
        })
      )
    },
    [cards]
  )

  const handleCloseGiftModal = () => {
    setGiftModal((prev) => ({ isOpen: false, data: null }))
  }

  const handleOpenGiftModal = (card: GiftCardInterface) => {
    setGiftModal({ isOpen: true, data: card })
  }

  return (
    <div className="flex">
      <div className="max-w-1470 w-full flex flex-wrap xs:flex-nowrap mx-auto grow -mb-3 xs:-mb-6 ">
        <div className="order-2 xs:order-1 grow rounded border xs:border-b-0 border-sky-primary/30 w-full xs:w-auto mb-5 xs:mb-0">
          <div className="bg-gradient-radial from-blue-light-secondary/20 to-blue-accent-secondary/0 rounded h-full overflow-hidden p-3 pb-1 xs:pb-3 min-h-[60vh]">
            <div className="flex flex-wrap -mx-1 text-sm">
              {sorted.map((card) => (
                <CardWithCounter
                  handleClick={() => handleSelectCard(card)}
                  key={card.id}
                  name={card.name}
                  price={card.price}
                  count={card.amount}
                  image={card.pic}
                  increment={() => handleChangeCount(card, 'increment')}
                  decrement={() => handleChangeCount(card, 'decrement')}
                  variant="Gift"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="order-1 xs:order-2 w-full xs:w-64 shrink-0 bg-dark/20 border xs:border-b-0 border-dashed border-sky-primary/40 xs:ml-5 mb-5 xs:mb-0 rounded-t min-h-fit sm:min-h-full">
          <div className="p-4 bg-gradient-radial from-blue-light-secondary/10 to-blue-accent-secondary/1 min-h-full">
            <div className="relative z-20">
              <div className="flex flex-wrap -mx-1 text-sm gap-2">
                {selectedCards.map((card) => (
                  <GiftCardHorizontal
                    key={card.id}
                    handleClaim={() => handleOpenGiftModal(card)}
                    {...card}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {giftModal.isOpen && giftModal.data && (
        <WithdrawGiftModal
          handleClose={handleCloseGiftModal}
          code={'35K29 - 35K29 - 35K29 - 35K29 - 35K29 - 35K29'}
          image={giftModal.data.pic}
        />
      )}
    </div>
  )
}

export default WithdrawGifts
