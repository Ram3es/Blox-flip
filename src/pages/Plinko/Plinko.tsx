import { BetMode, RowVariant } from '../../types/Plinko'
import { ChangeEvent, MouseEventHandler, useCallback, useState } from 'react'
import clsx from 'clsx'

import GamePlinko from './Plinko/GamePlinko'
import { Button } from '../../components/base/Button'
import RangeSlider from '../../components/common/RangeSlider'
import InputWithLabel from '../../components/base/InputWithLabel'
import ToggleBets from '../../components/common/ToggleBets'
import { BetToolkit } from '../../types/Bets'
import { RiskVariant } from '../../types/enums'
import ToggleRisk from '../../components/common/ToggleRisk'
import ToggleRows from '../../components/common/ToggleRows'
import PlinkoGame2 from './Plinko2/PlinkoGame2'

const Plinko = () => {
  const [mode, setMode] = useState<keyof typeof BetMode>(BetMode.Manual)
  const [betAmount, setBetAmount] = useState(200)
  const [selectedBet, setSelectedBet] = useState<BetToolkit | null>(null)
  const [selectedRow, setSelectedRow] = useState<RowVariant>(16)
  const [numberOfBets, setNumberOfBets] = useState(1)
  const [risk, setRisk] = useState<keyof typeof RiskVariant>(RiskVariant.Low)
  const rowOptions: RowVariant[] = [8, 10, 12, 14, 16]

  const handleChangeBetAmount = useCallback(
    (eventOrValue: ChangeEvent<HTMLInputElement> | number) => {
      if (typeof eventOrValue === 'number') {
        setBetAmount(eventOrValue)
      } else {
        setBetAmount(Number(eventOrValue.target.value))
      }
    },
    []
  )

  const handleChangeBetMode: MouseEventHandler<HTMLButtonElement> = (event) => {
    const mode = event.currentTarget.textContent as BetMode

    if (mode === BetMode.Manual) {
      setNumberOfBets(1)
    }

    setMode(mode)
  }

  const betToolkit: BetToolkit[] = [
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
    <div className='flex flex-col md:flex-row justify-center'>
      <div className='bg-blue-accent rounded-lg md:w-1/4 w-full py-6 mr-4'>
        <div className='mx-4'>
          <div className='flex items-center'>
            {Object.keys(BetMode).map((tab) => (
              <Button
                key={tab}
                onClick={handleChangeBetMode}
                className={clsx(
                  'capitalize font-semibold text-17 w-full h-11 border-b-[1px] flex items-center justify-center',
                  {
                    'text-blue-golf border-blue-golf bg-blue-golf': mode === tab,
                    'text-gray-primary border-blue-light-primary': mode !== tab
                  }
                )}
              >
                {tab}
              </Button>
            ))}
          </div>
          <div>
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
                <ToggleBets
                  value={selectedBet}
                  handleChange={setSelectedBet}
                  betToolkitArray={betToolkit}
                />
              </div>
              <div className='border-b-2 border-b-blue-accent-fourth flex flex-col w-full pb-6'>
                <ToggleRows
                  value={selectedRow}
                  handleChange={setSelectedRow}
                  rowOptions={rowOptions}
                />
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
                <Button className='w-full bg-green-primary rounded h-11'>Place Bet</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-blue-primary rounded-lg md:w-3/4 w-full flex items-start justify-center'>
        {/* <GamePlinko rows={selectedRow} /> */}
        <PlinkoGame2 numberOfBets={numberOfBets} risk={risk} rows={selectedRow} />
      </div>
    </div>
  )
}

export default Plinko
