import { ChangeEvent, useCallback, useState } from 'react'
import { usePlinko } from '../../store/PlinkoStore'

import RangeSlider from '../../components/common/RangeSlider'
import InputWithLabel from '../../components/base/InputWithLabel'
import ToggleBets from '../../components/common/BetActions/ToggleBets'
import ToggleRisk from '../../components/common/BetActions/ToggleRisk'
import ToggleRows from '../../components/common/BetActions/ToggleRows'
import BetActions from '../../components/common/BetActions/BetActionsContainer'
import ToggleMode from '../../components/common/BetActions/ToggleMode'
import { Button } from '../../components/base/Button'

import { BetToolkit } from '../../types/Bets'

const PlinkoActions = () => {
  const [selectedBet, setSelectedBet] = useState<BetToolkit | null>(null)
  const {
    betAmount,
    setBetAmount,
    handleChangeBetMode,
    numberOfBets,
    mode,
    risk,
    rowOptions,
    selectedRow,
    setRisk,
    setSelectedRow,
    setNumberOfBets,
    setIsStarted
  } = usePlinko()

  const handleChangeBetAmount = useCallback(
    (eventOrValue: ChangeEvent<HTMLInputElement> | number) => {
      if (typeof eventOrValue === 'number') {
        setBetAmount(eventOrValue)
      } else {
        setBetAmount(Number(eventOrValue.target.value))
      }
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
    <BetActions>
      <ToggleMode mode={mode} handleChange={handleChangeBetMode} />
      <div className='flex flex-col space-y-7 mt-4'>
        <div className='border-b-2 border-b-blue-accent-fourth pb-6'>
          <div className='relative'>
            <InputWithLabel
              type='number'
              name='password'
              label='Bet amount'
              value={betAmount}
              onChange={handleChangeBetAmount}
            />
          </div>
          <RangeSlider
            value={betAmount}
            min={100}
            max={1500}
            sliderValueChanged={handleChangeBetAmount}
          />
        </div>
        <div className='border-b-2 border-b-blue-accent-fourth pb-6'>
          <ToggleBets value={selectedBet} handleChange={setSelectedBet} betToolkit={betToolkit} />
        </div>
        <div className='border-b-2 border-b-blue-accent-fourth flex flex-col w-full pb-6'>
          <ToggleRows value={selectedRow} handleChange={setSelectedRow} rowOptions={rowOptions} />
        </div>
        <div className='border-b-2 border-b-blue-accent-fourth pb-6'>
          <ToggleRisk value={risk} handleChange={setRisk} />
        </div>
        {mode === 'Automatic' && (
          <div className='border-b-2 border-b-blue-accent-fourth'>
            <InputWithLabel
              type='number'
              name='numberOfBets'
              label='Number of Bets'
              placeholder='Enter number of bets'
              value={numberOfBets}
              onChange={(e) => setNumberOfBets(Number(e.target.value))}
            />
          </div>
        )}
        <div className='flex'>
          <Button
            onClick={() => setIsStarted(true)}
            className='w-full bg-green-primary rounded h-11'
          >
            Place Bet
          </Button>
        </div>
      </div>
    </BetActions>
  )
}

export default PlinkoActions
