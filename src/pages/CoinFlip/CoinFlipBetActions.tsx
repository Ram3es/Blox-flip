import { useState } from 'react'
import ToggleBets from '../../components/common/BetActions/ToggleBets'
import { QuantityCoins } from '../../components/common/QuantityCoins/QuantityCoins'
import { BetToolkit } from '../../types/Bets'
import DiamondIcon from '../../components/icons/DiamondIcon'
import { Button } from '../../components/base/Button'
import CoinFlipHead from '../../assets/img/CoinFlipHead.png'
import CoinFlipTail from '../../assets/img/CoinFlipTail.png'
import { useCoinFlip } from '../../store/CoinFlipStore'
import clsx from 'clsx'
import { Coin } from '../../types/CoinFlip'

const CoinFlipBetActions = () => {
  const { betAmount, setBetAmount, selectedCoin, setSelectedCoin } = useCoinFlip()
  const [selectedBet, setSelectedBet] = useState<BetToolkit | null>(null)

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

  const handleChangeCoin = () => {
    setSelectedCoin((prev) => (prev === 0 ? 1 : 0))
  }

  const coins: Coin[] = [0, 1]

  return (
    <div className='flex items-center space-x-4'>
      <div className='bg-dark/25 rounded flex items-center justify-between space-x-4 p-2'>
        <div className='gradient-blue-secondary text-gray-primary text-13 px-4 py-1.5 leading-4 rounded'>
          Bet amount
        </div>
        <QuantityCoins quantity={betAmount} />
        <ToggleBets
          value={selectedBet}
          handleChange={setSelectedBet}
          betToolkit={betToolkit}
          buttonSize='SMALL'
        />
      </div>
      <div className='flex space-x-4'>
        {coins.map((coin) => (
          <img
            key={coin}
            onClick={handleChangeCoin}
            className={clsx('', {
              'grayscale-[75%]': selectedCoin !== coin,
              '': selectedCoin === coin
            })}
            src={coin === 0 ? CoinFlipHead : CoinFlipTail}
            alt='tail'
          />
        ))}
      </div>
      <Button variant='Gradient'>
        <div className='flex items-center justify-between px-3 py-2.5'>
          <span className='w-4 shrink-0 mx-auto relative text-white'>
            <DiamondIcon width='16' height='12' />
          </span>
          <span className='pl-2'>Create new</span>
        </div>
      </Button>
    </div>
  )
}

export default CoinFlipBetActions
