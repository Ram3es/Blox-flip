import { useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Button } from '../../components/base/Button'
import ToolBar from '../../components/common/ToolBar'
import DiamondIcon from '../../components/icons/DiamondIcon'
import NavHeader from '../../components/navigate/NavHeader'
import { useToolbarState } from '../../helpers/hooks/useToolbarState'
import { IItemCard } from '../../types/ItemCard'
import Methods from './methods/Methods'
import { useSocketCtx } from '../../store/SocketStore'

export const Deposit = () => {
  const [selectedCards, setSelectedCard] = useState<IItemCard[]>([])
  const { socket, twoFactorAuthCode, setTwoFactorAuthModal } = useSocketCtx()
  const { pathname } = useLocation()
  const currentPath = pathname.split('/')[2]
  const { value, searchBy, onChange, priceRange, sortOptions, setPriceRange, setSortOptions } =
    useToolbarState()

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

  const handleDeposit = () => {
    if (selectedCards.length) {
      socket.emit('items_deposit', {
        type: 'market',
        '2fa_code': twoFactorAuthCode,
        items: selectedCards.map((card) => card.id)
      })
      setSelectedCard([])
    }
  }

  return (
    <div className="max-w-[1470px] w-full mx-auto">
      <div className="flex flex-col xs:flex-row">
        <NavHeader
          title="Deposit"
          pathName={currentPath}
          renderIcon={() => <DiamondIcon className="w-[29px] h-[25px] text-green-secondary ml-2" />}
        >
          {currentPath === 'roblox-limiteds' && (
            <ToolBar
              value={value}
              onChange={onChange}
              setSortOptions={setSortOptions}
              currentOption={sortOptions?.title}
              setPriceRange={setPriceRange}
            />
          )}
        </NavHeader>
        {currentPath === 'roblox-limiteds' && (
          <div className="flex flex-col gap-y-2 items-end lg:ml-5 lg:items-start">
            <Button variant="BlueGolfOutlined" onClick={() => setTwoFactorAuthModal(true)}>
              <span className="w-[200px] h-9 py-2 px-5">2FA</span>
            </Button>
            <Button onClick={handleDeposit} color="GreenPrimary">
              <div className="w-[200px] h-10 flex items-center gap-2 justify-center">
                <DiamondIcon className="w-[21px] h-[17px]" />
                <span>Deposit</span>
              </div>
            </Button>
          </div>
        )}
      </div>
      {pathname === '/deposit' ? <Methods /> : <Outlet context={contextOutlet} />}
    </div>
  )
}
