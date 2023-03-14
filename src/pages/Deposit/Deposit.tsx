import { useMemo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import ToolBar from '../../components/common/ToolBar'
import NavHeader from '../../components/Navigate/NavHeader'
import { useToolbarState } from '../../helpers/hooks/useTollbarState'
import Methods from './methods/Methods'

export const Deposit = () => {
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
    sortBy: sortOptions,
    priceRange
  }), [searchBy, sortOptions, priceRange])

  return (
    <div className="max-w-1190 w-full mx-auto">
      <NavHeader title='Deposit' path={currentPath} >
      {currentPath === 'roblox-limiteds' && (
        <ToolBar
          value={value}
          onChange={onChange}
          setSortOptions={setSortOptions}
          currentOption={sortOptions?.title}
          setPriceRange={setPriceRange} />
      ) }
      </NavHeader>
      { pathname === '/deposit' ? <Methods /> : <Outlet context={contextOutlet}/>}
    </div>
  )
}
