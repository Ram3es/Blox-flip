import { useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation, useMatch } from 'react-router-dom'
import { Button } from '../../components/base/Button'
import ToolBar from '../../components/common/ToolBar'
import DiamondIcon from '../../components/icons/DiamondIcon'
import NavHeader from '../../components/navigate/NavHeader'
import { useToolbarState } from '../../helpers/hooks/useToolbarState'
import { IItemCard } from '../../types/ItemCard'
import Methods from './methods/Methods'
import { useSocketCtx } from '../../store/SocketStore'
import InputWithInlineLabel from '../../components/common/InputWithInlineLabel'
import { useFormik } from 'formik'
import { getToast } from '../../helpers/toast'
import { TransactionVariant } from '../../types/enums'
import { useAppStore } from '../../store/Store'

export const Deposit = () => {
  const [selectedCards, setSelectedCard] = useState<IItemCard[]>([])
  const [twoFactorAuthCode, setTwoFactorAuthCode] = useState('')
  const { socket, setTwoFactorAuthModal } = useSocketCtx()
  const { pathname } = useLocation()
  const { value, searchBy, onChange, priceRange, sortOptions, setPriceRange, setSortOptions } = useToolbarState()
  const { state: { referal } } = useAppStore()

  const matchDeposit = useMatch('/deposit')
  const matchMethod = useMatch('/deposit/:method')

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
        '2fa_code': twoFactorAuthCode === '' ? null : twoFactorAuthCode,
        items: selectedCards.map((card) => card.id)
      })
      setSelectedCard([])
    }
  }

  const formikGiftCode = useFormik({
    initialValues: {
      code: ''
    },
    onSubmit: (values) => {
      socket.emit('promo', { code: values.code }, (err: string | boolean) => {
        if (typeof err === 'string') {
          getToast(err)
        }

        if (!err) {
          getToast('code successfully')
        }
      })
    }
  })

  useEffect(() => {
    if (referal?.type === 'p') {
      const setInitValue = async () => {
        await formikGiftCode.setValues({ code: referal.code })
      }
      void setInitValue()
    }
  }, [])

  return (
    <div className="max-w-[1470px] w-full mx-auto">
      <div className="flex flex-col xs:flex-row">
        <NavHeader
          title="Deposit"
          pathName={matchMethod?.params.method}
          renderIcon={() => <DiamondIcon className="w-[29px] h-[25px] text-green-secondary ml-2" />}
        >
          {matchMethod?.params.method === 'roblox-limiteds' && (
            <ToolBar
              value={value}
              onChange={onChange}
              setSortOptions={setSortOptions}
              currentOption={sortOptions?.title}
              setPriceRange={setPriceRange}
            />
          )}
          {matchDeposit && (
            <form onSubmit={formikGiftCode.handleSubmit}>
              <div className="flex gap-4 items-center">
                <InputWithInlineLabel
                  value={formikGiftCode.values.code}
                  onChange={formikGiftCode.handleChange('code')}
                  type="text"
                  placeholder="..."
                  label="Gift Code"
                  containerClasses="pl-2 pr-4 w-[380px] rounded-md gradient-background--blue__secondary h-10 flex items-center justify-between cursor-text"
                  labelClasses="pr-2 shrink truncate rounded-md px-3 h-[25px] flex items-center text-11 gradient--background--blue__third text-gray-primary"
                  inputClasses="bg-transparent text-right outline-none placeholder:text-white max-w-[280px] overflow-y-scroll"
                />
                <Button type="submit" color="GreenPrimary">
                  <div className="w-[100px] h-10 flex items-center gap-2 justify-center">
                    <DiamondIcon className="w-[21px] h-[17px]" />
                    <span className="capitalize">send</span>
                  </div>
                </Button>
              </div>
            </form>
          )}
        </NavHeader>

        {matchMethod?.params.method === 'roblox-limiteds' && (
          <div className="flex flex-col gap-y-2 items-end lg:ml-5 lg:items-start">
            <InputWithInlineLabel
              value={twoFactorAuthCode}
              onChange={(event) => setTwoFactorAuthCode(event.target.value)}
              type="text"
              placeholder="..."
              label="2FA Code"
              containerClasses="w-[220px] pl-2 pr-4 rounded-md gradient-background--blue__secondary h-[35px] flex items-center justify-between w-full cursor-text"
              labelClasses="pr-2 shrink truncate rounded-md px-3 h-[20px] flex items-center text-11 gradient--background--blue__third text-gray-primary"
              inputClasses="bg-transparent text-right outline-none placeholder:text-white max-w-[80px] overflow-y-scroll"
              icon={
                <svg
                  className="cursor-pointer flex-shrink-0 mr-2 w-4 h-4 text-gray-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => setTwoFactorAuthModal(true)}
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              }
            />
            <Button onClick={handleDeposit} color="GreenPrimary">
              <div className="w-[220px] h-10 flex items-center gap-2 justify-center">
                <DiamondIcon className="w-[21px] h-[17px]" />
                <span>Deposit</span>
              </div>
            </Button>
          </div>
        )}
      </div>
      {pathname === '/deposit' ? <Methods transactionVariant={TransactionVariant.Deposit} /> : <Outlet context={contextOutlet} />}
    </div>
  )
}
