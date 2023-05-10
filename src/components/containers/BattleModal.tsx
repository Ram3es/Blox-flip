import { useEffect, useMemo, useState } from 'react'
import { unboxCard } from '../../mocks/cards'
import { IItemCard, IUnboxCardCounter } from '../../types/ItemCard'
import { Button } from '../base/Button'
import { searchData } from '../../helpers/searchData'
import UnboxingCard from '../common/Cards/UnboxingCard'
import GreenTipSelect from '../common/GreenTipSelect'
import SearchInput from '../common/SearchInput'
import DaggersGreenGradient from '../icons/DaggersGreenGradient'
import { useToolbarState } from '../../helpers/hooks/useToolbarState'
import ModalWrapper from './ModalWrapper'
import CoinsWithDiamond from '../common/CoinsWithDiamond'

const BattleModal = ({
  isOpen,
  onClose,
  onSubmit,
  casesBetted
}: {
  isOpen: boolean
  onClose: Function
  onSubmit: Function
  casesBetted: IUnboxCardCounter[]

}) => {
  const [unboxCards, setAllCards] = useState<IUnboxCardCounter[]>([])
  const [selectedCards, setSelected] = useState<IUnboxCardCounter[]>([])
  const { value, searchBy, priceRange, onChange, setPriceRange } = useToolbarState()

  const totalPriceSelected = useMemo(() => selectedCards.reduce((acc, item) => acc + item.price * item.amount, 0), [casesBetted, selectedCards])
  const ranged = useMemo(
    () => unboxCards.filter((card) => card.price >= priceRange.from && card.price <= priceRange.to),
    [priceRange, unboxCards]
  )
  const filtered = useMemo(
    () => searchData(ranged, 'name', searchBy),
    [searchBy, unboxCards, ranged]
  )

  const onSelect = (card: IItemCard) => {
    setSelected(prev => {
      const selctedCard = prev.find(prevCard => prevCard.id === card.id)
      if (!selctedCard) {
        const addNewCard = unboxCards.find(unCard => unCard.id === card.id) as IUnboxCardCounter
        return [...prev, addNewCard]
      }
      return [...prev.map(prevCard => {
        if (prevCard.id === selctedCard.id) {
          return { ...selctedCard, amount: selctedCard.amount + 1 }
        }
        return prevCard
      })]
    })
  }

  const handleSubmit = () => {
    onSubmit(selectedCards)
    onClose()
  }
  const handleCloseModal = () => {
    onClose()
    setSelected(casesBetted)
  }

  useEffect(() => {
    setAllCards(unboxCard.map(card => ({ ...card, amount: 1 })))
  }, [unboxCard])

  useEffect(() => {
    setSelected(casesBetted)
  }, [casesBetted])

  return isOpen
    ? (<ModalWrapper
      modalClasses='relative py-5 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-5xl w-full m-auto  overflow-hidden'
      closeModal={handleCloseModal}
    >
      <div className=' flex flex-col xs:flex-row justify-between items-center mr-10 mb-5'>
        <div className='w-full flex justify-center xs:justify-start items-center'>
          <DaggersGreenGradient iconClasses='h-[25px] w-[25px]' />
          <h3 className='text-2xl font-bold ml-3 '>Battle Creation</h3>
        </div>
        <div className=' w-full flex justify-center xs:justify-end gap-5 mt-5 xs:mt-0 xs:gap-2'>
          <GreenTipSelect onSelect={setPriceRange} />
          <SearchInput placeholder='Search cases' value={value} onChange={onChange} />
        </div>
      </div>
      <div className=' border-b border-blue-accent-secondary' />
      <div className='w-full min-h-[232px] max-h-[calc(100vh_-_210px)]  mt-5 mb-[34px] flex flex-wrap  overflow-auto scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full  pr-3 -mr-2 '>
        {filtered.map((card) => (
          <UnboxingCard
            key={card.id}
            id={card.id}
            name={card.name}
            price={card.price}
            onSelect={() => onSelect(card)}
          />
        ))}
      </div>
      <div className='absolute z-[50] bottom-0 left-0 w-full  flex items-center justify-between py-2.5 px-6 bg-[#2F375F] '>
        <div className='flex items-center gap-2'>
          <span className='text-gray-primary text-sm'>Total cost</span>
          <CoinsWithDiamond
            containerColor='GreenGradientSecondary'
            containerSize='Large'
            typographyQuantity={totalPriceSelected}
            typographyFontSize='Size16'
          />
        </div>
        <Button
          onClick={handleSubmit}
          className='bg-green-primary hover:bg-green-500  border border-green-primary py-2 px-4 leading-4 rounded '
        >
          Complete
        </Button>
      </div>
    </ModalWrapper>)
    : null
}

export default BattleModal
