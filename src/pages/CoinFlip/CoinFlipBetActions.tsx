import { ChangeEvent, useCallback, useContext, useState } from 'react'
import { useCoinFlip } from '../../store/CoinFlipStore'
import { Context } from '../../store/Store'

import ToggleCoin from '../../components/common/BetActions/ToggleCoin'
import ToggleBets from '../../components/common/BetActions/ToggleBets'
import DiamondIcon from '../../components/icons/DiamondIcon'
import { Button } from '../../components/base/Button'

import type { BetToolkit } from '../../types/Bets'
import SignInModal from '../../components/containers/SignInModal'
import CoinFlipLobbyModal from './CoinFlipLobbyModal'

const CoinFlipBetActions = () => {
  const {
    betAmount,
    setBetAmount,
    selectedCoin,
    setSelectedCoin,
    setIsOpenCreateGame,
    isOpenCreateGame
  } = useCoinFlip()
  const [selectedBet, setSelectedBet] = useState<BetToolkit | null>(null)
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false)

  const { state } = useContext(Context)

  const handleCreateGame = useCallback(() => {
    if (state.user) {
      setIsOpenCreateGame(true)
      setIsOpenLoginModal(false)
    } else {
      setIsOpenLoginModal(true)
      setIsOpenCreateGame(true)
    }
  }, [state.user])

  const handleCloseLoginModal = useCallback(() => {
    setIsOpenLoginModal(false)
    setIsOpenCreateGame(true)
  }, [])

  const handleChangeBetAmount = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setBetAmount(Number(event.target.value))
    },
    [betAmount]
  )

  const betToolkit: BetToolkit[] = [
    {
      label: 'Clear',
      function: () => setBetAmount(200)
    },
    {
      label: '1/2',
      function: () => setBetAmount((prev) => Number((prev / 2).toFixed()))
    },
    {
      label: '2x',
      function: () => setBetAmount((prev) => Number((prev * 2).toFixed()))
    },
    {
      label: 'Min',
      function: () => setBetAmount(50)
    },
    {
      label: 'Max',
      function: () => setBetAmount(1500)
    }
  ]

  return (
    <div className='flex flex-col items-center space-y-4 xs:space-y-0 xs:flex-row xs:space-x-3'>
      {state.user && (
        <div className='flex items-center justify-center md:justify-between flex-col md:flex-row md:space-x-2 md:space-y-0 space-y-2 bg-dark/25 rounded py-2 md:h-11 px-2'>
          <div className='flex items-center md:space-x-2 md:min-w-[210px]'>
            <div className='hidden md:block gradient-blue-secondary text-gray-primary text-13 rounded p-1'>
              Bet amount
            </div>
            <div className='flex items-center justify-end'>
              <div className='relative w-6 h-6 text-center leading-6 shrink-0 bg-green-primary/20 rounded text-green-primary'>
                <DiamondIcon className='-inset-full absolute m-auto' />
              </div>
              <input
                type='number'
                value={betAmount}
                onChange={handleChangeBetAmount}
                className='pl-2 bg-transparent outline-none placeholder:text-white max-w-[100px] overflow-y-scroll'
              />
            </div>
          </div>
          <ToggleBets
            value={selectedBet}
            handleChange={setSelectedBet}
            betToolkit={betToolkit}
            buttonSize='Small'
          />
        </div>
      )}
      {state.user && <ToggleCoin selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin} />}
      <Button variant='GreenGradient' onClick={handleCreateGame}>
        <div className='flex items-center justify-between md:py-3.5 py-2 px-2'>
          <DiamondIcon className='w-[16px] h-[12px]' />
          <span className='pl-2 text-sm leading-4 truncate'>Create new</span>
        </div>
      </Button>
      {isOpenLoginModal && !state.user && (
        <SignInModal isOpen={isOpenLoginModal} onClose={handleCloseLoginModal} />
      )}
      {!isOpenLoginModal && isOpenCreateGame && state.user && (
        <CoinFlipLobbyModal
          isCreated={false}
          handleFunction={() => setIsOpenCreateGame(false)}
          onClose={() => setIsOpenCreateGame(false)}
        />
      )}
    </div>
  )
}

export default CoinFlipBetActions
