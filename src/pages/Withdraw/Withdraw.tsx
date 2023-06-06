import { useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Button } from '../../components/base/Button'
import DiamondIcon from '../../components/icons/DiamondIcon'
import GreenTipSelect from '../../components/common/GreenTipSelect'
import WithdrawMethod from './WithdrawMethod'
import { TRobloxCard } from '../../types/ItemCard'
import SortSelect from '../../components/common/SortSelect'
import { sortingVariants } from '../../constants/sorting'
import { useToolbarState } from '../../helpers/hooks/useToolbarState'
import NavHeader from '../../components/navigate/NavHeader'
import SearchInput from '../../components/common/SearchInput'
import { useSocketCtx } from '../../store/SocketStore'

export const Withdraw = () => {
  const [selectedCards, setSelectedCard] = useState<TRobloxCard[]>([])
  const { pathname } = useLocation()
  const { socket } = useSocketCtx()
  const {
    value,
    searchBy,
    onChange,
    sortOptions,
    priceRange,
    setPriceRange,
    setSortOptions
  } = useToolbarState()

  const currentPath = pathname.split('/')[2]

  const contextOutlet = useMemo(
    () => ({
      socket,
      searchBy,
      sortBy: sortOptions?.sortBy,
      direction: sortOptions?.direction,
      priceRange,
      selectedCards,
      setSelectedCard
    }),
    [searchBy, sortOptions, selectedCards, priceRange]
  )

  const submitWithdraw = () => {
    if (selectedCards.length) {
      socket.emit('market_withdraw', { ids: selectedCards.map(card => card.id) }, (res: any) => {
        alert(JSON.stringify(res, null, 2))
        setSelectedCard([])
      })
    }
  }

  return (
    <div className=' w-full'>
      <div className='flex flex-col xs:flex-row max-w-[1470px] mx-auto'>
        <NavHeader
          title='Withdraw'
          pathName={currentPath}
          renderIcon={() => <DiamondIcon className='w-[29px] h-[25px] text-green-secondary ml-2' />}
        >
          {currentPath === 'roblox-limiteds' && (
            <div className='flex flex-wrap gap-x-3 gap-y-8 mb-8'>
              <SortSelect
                options={sortingVariants}
                onSelect={setSortOptions}
                currentOptions={sortOptions?.title}
              />
              <GreenTipSelect onSelect={setPriceRange} />
              <SearchInput value={value} onChange={onChange} />
            </div>
          )}
        </NavHeader>
        {currentPath === 'roblox-limiteds' && (
          <div className='flex items-end lg:ml-5 lg:items-start pb-8'>
            <Button
              onClick={submitWithdraw}
              className='pointer-events-auto flex justify-center items-center leading-9 text-gray-primary text-base font-bold rounded px-2.5 py-1 bg-blue-highlight hover:bg-blue-accent w-64 shrink-0'
            >
              <DiamondIcon className='w-[21px] h-[17px] mr-2' />
              <span>Withdraw</span>
            </Button>
          </div>
        )}
      </div>
      {pathname === '/withdraw' ? <WithdrawMethod /> : <Outlet context={contextOutlet} />}
    </div>
  )
}
