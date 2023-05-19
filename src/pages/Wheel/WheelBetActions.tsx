import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react'
import InputWithLabel from '../../components/base/InputWithLabel'
import BetActionsContainer from '../../components/common/BetActions/BetActionsContainer'
import ToggleBets from '../../components/common/BetActions/ToggleBets'
import RangeSlider from '../../components/common/RangeSlider'
import { BetToolkit } from '../../types/Bets'
import DiamondIcon from '../../components/icons/DiamondIcon'

const WheelBetActions = ({ betAmount, setBetAmount }: { betAmount: number, setBetAmount: Dispatch<SetStateAction<number>> }) => {
  const [selectedBet, setSelectedBet] = useState<BetToolkit | null>(null)

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
    <BetActionsContainer path='/provably-fair#wheel' >
      <div className='flex flex-col space-y-4'>
        <div className='border-b-2 border-b-blue-accent-fourth pb-4'>
          <div className='relative'>
            <InputWithLabel
              type='number'
              labelClasses='flex flex-col w-full mb-8 items-start'
              titleClasses='gradient-blue-secondary text-gray-primary text-sm px-4 py-3 leading-4 rounded-t-xl inline-block'
              inputWrapperClasses='bg-dark/25 rounded-b-xl rounded-tr-xl overflow-hidden w-full'
              inputClasses='grow w-0 mr-2 bg-transparent bg-none border-none outline-none shadow-none pl-8'
              name='password'
              label='Bet amount'
              value={betAmount}
              onChange={handleChangeBetAmount}
            />
            <div className='w-6 h-6 text-center leading-6 shrink-0 bg-green-primary/20 rounded mr-2 text-green-primary absolute top-14 left-4'>
              <DiamondIcon className='-inset-full absolute m-auto' />
            </div>
          </div>
          <RangeSlider
            value={betAmount}
            min={100}
            max={1500}
            sliderValueChanged={handleChangeBetAmount}
          />
        </div>
        <div className='border-b-2 border-b-blue-accent-fourth pb-4'>
          <ToggleBets value={selectedBet} handleChange={setSelectedBet} betToolkit={betToolkit} />
        </div>
      </div>
    </BetActionsContainer>
  )
}

export default WheelBetActions
