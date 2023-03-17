import { useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Button } from '../../components/Base/Button'
import ToolBar from '../../components/common/ToolBar'
import { DiamondIcon } from '../../components/DiamondIcon/DiamondIcon'
import NavHeader from '../../components/Navigate/NavHeader'
import { useToolbarState } from '../../helpers/hooks/useTollbarState'
import { IItemCard } from '../../types/itemCard'
import Methods from './methods/Methods'

export const Deposit = () => {
  const [selectedCards, setSelectedCard] = useState<IItemCard[]>([])
  const { pathname } = useLocation()
  const currentPath = pathname.split('/')[2]
  const {
    value,
    searchBy,
    onChange,
    priceRange,
    sortOptions,
    setPriceRange,
    setSortOptions
  } = useToolbarState()

  const contextOutlet = useMemo(() => ({
    searchBy,
    sortBy: sortOptions?.sortBy,
    direction: sortOptions?.direction,
    priceRange,
    selectedCards,
    setSelectedCard
  }), [searchBy, sortOptions, selectedCards, priceRange])

  return (
    <div className="max-w-[1470px] w-full mx-auto">
      <div className='flex flex-col xs:flex-row'>
      <NavHeader title='Deposit' pathName={currentPath} >
      {currentPath === 'roblox-limiteds' && (
        <ToolBar
          value={value}
          onChange={onChange}
          setSortOptions={setSortOptions}
          currentOption={sortOptions?.title}
          setPriceRange={setPriceRange} />
      ) }
      </NavHeader>
      {currentPath === 'roblox-limiteds' && <div className='flex items-end  lg:ml-5 lg:items-start pb-8'>
           <Button
              onClick={() => console.log(selectedCards)}
              className='pointer-events-auto flex justify-center items-center leading-9 text-white text-base font-bold rounded px-2.5 py-1  shadow-green-20 gradient-green hover:bg-gradient-to-r hover:to-green-500 hover:from-green-500 w-64 shrink-0'
              >
                <DiamondIcon className='w-[21px] h-[17px] mr-2' />
                <span>Deposit</span></Button>
              </div>}
      </div>
      { pathname === '/deposit' ? <Methods /> : <Outlet context={contextOutlet}/>}
    </div>
  )
}
