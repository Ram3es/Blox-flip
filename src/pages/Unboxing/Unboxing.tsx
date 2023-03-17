import { useEffect, useMemo, useState } from 'react'
import ButtonsToggle from '../../components/Base/ButtonToggle'
import ItemCard from '../../components/Common/Cards/ItemCard'
import UnboxingCard from '../../components/Common/Cards/UnboxingCard'
import GreenTipSelect from '../../components/Common/GreenTipSelect'
import SearchInput from '../../components/Common/SearchInput'
import SortSelect from '../../components/Common/SortSelect'
import UnboxingIcon from '../../components/Icons/UnboxingIcon'
import { useDebounce } from '../../helpers/hooks/useDebounce'
import { searchData } from '../../helpers/searchData'
import { cards, unboxCard } from '../../mocks/cards'
import { IItemCard } from '../../types/itemCard'

const sortOptions = [
  { title: 'Recomended', value: 'all' },
  { title: 'Best Price', value: 'cheap' }
]

const tabs = ['Hot', 'Featured', 'New', 'Creator']

const filterBy = (data: IItemCard[], filterBy: any) => {
  switch (filterBy) {
    case 'cheap':
      return data.filter((item) => item.price < 1000)
    case 'all':
      return data
    default:
      return data
  }
}
const Unboxing = () => {
  const [currentTab, setCurrentBoxes] = useState(tabs[0])
  const [sortingVariant, setSortVariant] = useState(sortOptions[0])
  const [inputSearchValue, setSearchValue] = useState('')
  const [searchBy, setSearchBy] = useState('')

  const debounce = useDebounce()

  const sorted = useMemo(() => filterBy(unboxCard, sortingVariant.value), [sortingVariant])
  const filtered = useMemo(() => searchData(sorted, 'name', searchBy), [searchBy, sorted])

  useEffect(() => {
    debounce(() => setSearchBy(inputSearchValue))
  }, [inputSearchValue])
  return (
    <div className='flex flex-col min-h-full text-sm '>
      <div className='max-w-1190 w-full m-auto'>
        <div className='flex overflow-hidden mb-8 md:mb-12 text-xs '>
          {cards.map((card) => (
            <ItemCard
              key={card.id}
              id={card.id}
              name={card.name}
              price={card.price}
              image={card.image}
              color={card.color}
              onSelect={() => {}}
              itemClasses='px-1 w-1/2 xxs:w-1/4 xs:w-1/5 md:w-1/7 shrink-0 lg:w-1/9 mb-2 overflow-hidden'
            />
          ))}
        </div>
        <div className='flex flex-wrap justify-between items-center mb-6 border-b border-blue-accent-secondary'>
          <div className='flex items-center mb-3 xs:mb-2 order-1'>
            <div className='w-7 shrink-0 mr-2 text-blue-golf'>
              <UnboxingIcon />
            </div>
            <h3 className='font-extrabold text-2xl mr-2'>Case unboxing</h3>
          </div>
          <div className='flex flex-wrap items-center gap-2 -mx-1 py-2 order-2 lg:order-3'>
            <SortSelect
              options={sortOptions}
              onSelect={setSortVariant}
              currentOptions={sortingVariant.title}
            />
            <GreenTipSelect onSelect={() => {}} />
            <SearchInput value={inputSearchValue} onChange={setSearchValue} />
          </div>
          <div className='flex flex-wrap items-center min-w-full order-3 lg:min-w-0 lg:order-2 text-17 font-semibold'>
            <ButtonsToggle
              options={tabs}
              currentSelect={currentTab}
              peackFunction={setCurrentBoxes}
              activeClasses=' text-green-primary li--active'
              btnClasses='mx-2.5 flex flex-col justify-center  min-h-full py-5 group text-gray-primary hover:text-white '
            />
          </div>
        </div>
        <div className='flex flex-wrap items-center -mx-1 py-2 order-2 lg:order-3'></div>
        <div className='flex flex-wrap -mx-2 mb-8 md:mb-12'>
          {filtered.map((card) => (
            <UnboxingCard key={card.id} {...card} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Unboxing
