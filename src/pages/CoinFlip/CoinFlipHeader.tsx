import { ChangeEvent, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../store/Store'
import { useCoinFlip } from '../../store/CoinFlipStore'

import { Button } from '../../components/base/Button'
import CoinsWithDiamond from '../../components/common/CoinsWithDiamond'
import CoinFlipLogoIcon from '../../components/icons/CoinFlipLogoIcon'
import DiamondIcon from '../../components/icons/DiamondIcon'
import { Input } from '../../components/base/Input'
import { ICoin, ICoinFlipCreate } from '../../types/CoinFlip'
import ToggleCoin from '../../components/common/BetActions/ToggleCoin'
import { getToast } from '../../helpers/toast'
import { useSocketCtx } from '../../store/SocketStore'
import { formatNumber, localeStringToNumber } from '../../helpers/numbers'

const CoinFlipHeader = () => {
  const { setIsOpenLoginModal, setIsOpenBattleGame } = useCoinFlip()
  const { socket } = useSocketCtx()

  const [wager, setWager] = useState({ amountString: '', amountNumber: 0 })
  const [selectedCoin, setSelectedCoin] = useState<ICoin>(0)

  const { state } = useContext(Context)

  const wagerRef = useRef<HTMLInputElement>(null)

  const handleCreateGame = useCallback(() => {
    if (state.user) {
      if (!wager.amountNumber) {
        getToast('Enter wager')
        if (wagerRef.current) {
          wagerRef.current.setSelectionRange(0, 0)
          wagerRef.current.focus()
        }
        return
      }

      const sendedData: ICoinFlipCreate = {
        coin: selectedCoin,
        wager: wager.amountNumber
      }
      socket.emit('coinflip_create', sendedData, (error: boolean | string) => {
        if (typeof error === 'string') {
          getToast(error)
        }

        if (!error) {
          setIsOpenBattleGame(true)
        }
      })
    } else {
      setIsOpenLoginModal(true)
    }
  }, [state.user, wager, selectedCoin])

  const handleWagerChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      setWager({ amountString: value, amountNumber: Number(localeStringToNumber(value, 'en-US')) })
    },
    [wager]
  )

  const handleKeyPress = (event: KeyboardEvent) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault()
    }
  }

  const inputValue =
    wager.amountNumber === 0 ? wager.amountString : formatNumber(wager.amountNumber)

  useEffect(() => {
    const wager = wagerRef.current

    if (wager) {
      wager.addEventListener('keypress', handleKeyPress)
    }

    return () => {
      if (wager) {
        wager.removeEventListener('keypress', handleKeyPress)
      }
    }
  }, [wagerRef])

  return (
    <div className="flex flex-col xs:flex-row space-y-4 xs:space-y-0 items-center justify-between bg-blue-accent rounded-lg p-5">
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center">
          <CoinFlipLogoIcon />
          <span className="pl-3 text-lg hidden md:block">Games</span>
        </div>
        <Button variant="YellowOutlined">
          <span className="text-orange-primary-light text-13 font-medium px-3 py-1.5 md:px-4 md:py-2.5 flex items-center justify-center">
            7 <span className="hidden md:block">&nbsp;Games</span>
          </span>
        </Button>
        <Button variant="GreenOutlinedSecondary">
          <span className="text-green-primary text-13 font-medium px-3 py-1.5 md:px-4 md:py-2.5 flex items-center justify-center">
            3 <span className="hidden md:block">&nbsp;Joinable</span>
          </span>
        </Button>
        <CoinsWithDiamond
          containerSize="Large"
          containerColor="GreenGradient"
          typographyQuantity={14214.51}
        />
      </div>
      <div className="grid grid-cols-1 ls:flex items-center gap-[15px]">
        <ToggleCoin selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin} />

        <div className="flex items-center gap-5">
          <span className="text-gray-primary font-semibold text-sm">Amount:</span>
          <div className="w-[136px] h-[45px] relative z-10 rounded border bg-green-primary/15 border-green-primary border-dashed flex items-center justify-between px-2">
            <span className="w-5 h-5 text-center leading-6 shrink-0 bg-green-primary/20 rounded relative mr-2 text-green-primary">
              <DiamondIcon className="-inset-full absolute m-auto" width="15" height="12" />
            </span>
            <Input
              type="text"
              placeholder="..."
              variant="OUTLINED"
              value={inputValue}
              onChange={handleWagerChange}
              ref={wagerRef}
            />
          </div>
        </div>
        <Button variant="GreenGradient" onClick={handleCreateGame}>
          <div className="h-[45px] flex items-center justify-between px-2">
            <DiamondIcon className="w-[16px] h-[12px]" />
            <span className="pl-2 text-sm leading-4 truncate">Create new</span>
          </div>
        </Button>
      </div>
    </div>
  )
}

export default CoinFlipHeader
