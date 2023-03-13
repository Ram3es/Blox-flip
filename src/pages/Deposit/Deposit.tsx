import { useMemo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import ToolBar from '../../components/common/ToolBar'
import NavHeader from '../../components/Navigate/NavHeader'
import { sortingVariants } from '../../constants/Sorting'
import { useToolbarState } from '../../helpers/hooks/useTollbarState'
import Methods from './methods/Methods'

export const Deposit = () => {
  const { pathname } = useLocation()
  const currentPath = pathname.split('/')[2]
  const {
    value,
    searchBy,
    onChange,
    sortOptions,
    setSortOptions
  } = useToolbarState(sortingVariants)

  const contextOutlet = useMemo(() => ({
    searchBy,
    sortBy: sortOptions
  }), [searchBy, sortOptions])

  return (
    <div className="max-w-1190 w-full mx-auto">
      <NavHeader title='Deposit' path={currentPath} >
      {currentPath === 'roblox-limiteds' && (
        <ToolBar value={value} onChange={onChange} setSortOptions={setSortOptions} currentOption={sortOptions.title} />
      ) }
      </NavHeader>
      { pathname === '/deposit' ? <Methods /> : <Outlet context={contextOutlet}/>}
    </div>
  )
}
