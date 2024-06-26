import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import ItemCard from '../../components/common/Cards/ItemCard'
import RemoveArrowBold from '../../components/icons/RemoveArrowBold'
import CoinsWithDiamond from '../../components/common/CoinsWithDiamond'
import { searchData } from '../../helpers/searchData'
import { sortData } from '../../helpers/sortData'
import type { TRobloxCard } from '../../types/ItemCard'
import { TSocket } from '../../store/SocketStore'
import { getDepositInventory } from '../../services/payment/deposit'
import { fetchAsset } from '../../services/roblox/getItemImage'
import { getColorCardbyPrice } from '../../helpers/getColorCard'

const RobloxLimiteds = () => {
  const [allCards, setAllCards] = useState<TRobloxCard[]>([])

  const { sortBy, direction, searchBy, priceRange, selectedCards, setSelectedCard } =
    useOutletContext<{
      sortBy?: string
      searchBy: string
      direction?: 'ASC' | 'DESC'
      priceRange: { from: number, to: number }
      selectedCards: TRobloxCard[]
      setSelectedCard: Dispatch<SetStateAction<TRobloxCard[]>>
      socket: TSocket
    }>()
  // const { pathname } = useLocation()

  // useEffect(() => {
  //   if (selectedCards.length === 0) {
  //     if (pathname.split('/').includes('deposit')) {
  //       socket.emit('load_items', { type: 'market' }, (err: boolean, skins: TRobloxCard[]) => {
  //         if (!err) {
  //           setAllCards(skins)
  //         }
  //       })
  //     }
  //   }

  //   if (pathname.split('/').includes('withdraw')) {
  //     socket.emit('market_reload', ({ data }: { data: TRobloxCard[] }) => {
  //       setAllCards(data)
  //     })
  //   }
  // }, [selectedCards])

  const ranged = useMemo(
    () => allCards?.filter((card) => card.price >= priceRange.from && card.price <= priceRange.to),
    [priceRange, allCards]
  )

  const filtered = useMemo(() => searchData(ranged, 'name', searchBy), [searchBy, allCards, ranged])

  const sorted = useMemo(() => {
    if (sortBy && direction) {
      return sortData(filtered, sortBy as keyof TRobloxCard, direction)
    } else {
      return filtered
    }
  }, [direction, filtered, sortBy])

  const totalPriceSelected = selectedCards.reduce((acc, item) => acc + item.price, 0)

  const addToSelectedCard = (card: TRobloxCard) => {
    setSelectedCard((state) => [...state, card])
    setAllCards(removeCard(allCards, card.id))
  }

  const addToAllCard = (card: TRobloxCard) => {
    setAllCards((state) => [...state, card])
    setSelectedCard(removeCard(selectedCards, card.id))
  }

  const removeCard = (data: TRobloxCard[], cardId: number) => {
    return data.filter((item) => item.id !== cardId)
  }

  const getInventory = useCallback(async () => {
    const { data: { inventory } } = await getDepositInventory()
    const itemIdsQuery = inventory.map(item => item.assetId).join(',')
    const assets = await fetchAsset(itemIdsQuery)

    setAllCards(inventory.map(item => ({
      id: item.assetId,
      name: item.assetName,
      price: item.value,
      color: getColorCardbyPrice(item.value),
      pic: assets.find((pic: { targetId: number }) => pic.targetId === item.assetId)?.imageUrl ?? ''
    })))
  }, [])

  useEffect(() => {
    void getInventory()
  }, [])

  return (
    <div className="flex">
      <div className="max-w-1470 w-full flex flex-wrap xs:flex-nowrap mx-auto grow -mb-3 xs:-mb-6 ">
        <div className="order-2 xs:order-1 grow rounded border xs:border-b-0 border-sky-primary/30 w-full xs:w-auto mb-5 xs:mb-0">
          <div className="bg-gradient-radial from-blue-light-secondary/20 to-blue-accent-secondary/0 rounded h-full overflow-hidden p-3 pb-1 xs:pb-3 min-h-[60vh]">
            <div className="flex flex-wrap -mx-1 text-sm ">
              {sorted.map((card) => (
                <ItemCard
                  key={card.id}
                  id={card.id}
                  name={card.name}
                  price={card.price}
                  image={card.pic}
                  color={card.color}
                  onSelect={() => addToSelectedCard(card)}
                  itemClasses="px-1 w-1/2 xxs:w-1/2 xs:w-1/3 md:w-1/4 ls:w-1/5 lg:w-1/7 shrink-0 3xl:w-1/8 mb-2"
                />
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
                    <RemoveArrowBold iconClasses="group-hover mr-2" />
                    <span className="text-white">{selectedCards.length} ITEMS</span>
                  </span>
                  <CoinsWithDiamond typographyQuantity={totalPriceSelected} />
                </div>
              </div>
              <div className="flex flex-wrap -mx-1 text-sm group/item is-added">
                {selectedCards.map((card) => (
                  <ItemCard
                    key={card.id}
                    id={card.id}
                    name={card.name}
                    price={card.price}
                    image={card.pic}
                    color={card.color}
                    onSelect={() => addToAllCard(card)}
                    itemClasses="px-1 shrink-0 w-full xxs:w-1/2 xs:w-full mb-2"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RobloxLimiteds
