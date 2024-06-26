import { useMemo, useState } from 'react'
import ButtonsToggle from '../../components/base/ButtonToggle'
import GreenTipSelect from '../../components/common/GreenTipSelect'
import SearchInput from '../../components/common/SearchInput'
import SortSelect from '../../components/common/SortSelect'
import { sortingVariants } from '../../constants/sorting'
import { useToolbarState } from '../../helpers/hooks/useToolbarState'
import { searchData } from '../../helpers/searchData'
import { sortData } from '../../helpers/sortData'
import { useNavigate } from 'react-router-dom'
import UnboxingCard from '../../components/common/Cards/UnboxingCard'
import UnboxingIconTitle from '../../components/icons/UnboxingIconTitle'
import { IRootCaseItem } from '../../types/Cases'
import { useCaseOpening } from '../../store/CaseOpeningStore'

const tabs = [
  { variant: 'Hot' },
  { variant: 'Featured' },
  { variant: 'New' },
  { variant: 'Creator' }
]

const Unboxing = () => {
  const { cases } = useCaseOpening()
  const [currentTab, setCurrentBoxes] = useState(tabs[0])
  const navigate = useNavigate()
  const { value, searchBy, onChange, sortOptions, priceRange, setPriceRange, setSortOptions } =
    useToolbarState()

  const ranged = useMemo(
    () => cases.filter((card) => card.price >= priceRange.from && card.price <= priceRange.to),
    [priceRange, cases]
  )

  const filtered = useMemo(() => searchData(ranged, 'name', searchBy), [searchBy, ranged])

  const sorted: IRootCaseItem[] = useMemo(() => {
    if (sortOptions) {
      const { direction, sortBy } = sortOptions
      return sortData(filtered, sortBy as keyof IRootCaseItem, direction)
    } else {
      return filtered
    }
  }, [sortOptions, filtered])

  return (
    <div className="flex flex-col min-h-full text-sm">
      <div className="max-w-1190 w-full m-auto">
        {/* <div className="flex overflow-hidden mb-8 md:mb-12 text-xs">
          {cards.map((card) => (
            <ItemCard
              key={card.id}
              id={card.id}
              name={card.name}
              price={card.price}
              image={card.image}
              color={card.color}
              onSelect={() => {}}
              itemClasses="px-1 w-1/2 xxs:w-1/4 xs:w-1/5 md:w-1/7 shrink-0 lg:w-1/9 mb-2 overflow-hidden"
            />
          ))}
        </div> */}
        <div className="flex flex-wrap justify-between items-center mb-6 border-b border-blue-accent-secondary">
          <div className="flex items-center mb-3 xs:mb-2 order-1">
            <div className="w-7 shrink-0 mr-2 text-blue-golf">
              <UnboxingIconTitle />
            </div>
            <h3 className="font-extrabold text-2xl mr-2">Case unboxing</h3>
          </div>
          <div className="flex flex-wrap items-center gap-2 -mx-1 py-2 order-2 lg:order-3">
            <SortSelect
              options={sortingVariants}
              onSelect={setSortOptions}
              currentOptions={sortOptions?.title}
            />
            <GreenTipSelect onSelect={setPriceRange} />
            <SearchInput value={value} onChange={onChange} />
          </div>
          <div className="flex flex-wrap items-center min-w-full order-3 lg:min-w-0 lg:order-2 text-17 font-semibold">
            <ButtonsToggle
              options={tabs}
              currentSelect={currentTab}
              peakFunction={setCurrentBoxes}
              activeClasses="text-green-primary li--active"
              btnClasses="mx-2.5 flex flex-col justify-center min-h-full py-5 group text-gray-primary hover:text-white"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center -mx-1 py-2 order-2 lg:order-3"></div>
        <div className="flex flex-wrap -mx-2 mb-8 md:mb-12">
          {sorted.map((card) => (
            <UnboxingCard key={card.name} onSelect={() => navigate(card.short)} {...card} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Unboxing
