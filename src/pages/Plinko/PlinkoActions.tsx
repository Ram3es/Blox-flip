import { ChangeEvent, MouseEventHandler, useCallback, useEffect, useState } from 'react'
import { usePlinko } from '../../store/PlinkoStore'

import RangeSlider from '../../components/common/RangeSlider'
import InputWithLabel from '../../components/base/InputWithLabel'
import ToggleBets from '../../components/common/BetActions/ToggleBets'
import ToggleRisk from '../../components/common/BetActions/ToggleRisk'
import ToggleRows from '../../components/common/BetActions/ToggleRows'
import BetActionsContainer from '../../components/common/BetActions/BetActionsContainer'
import ToggleMode from '../../components/common/BetActions/ToggleMode'
import { Button } from '../../components/base/Button'

import { BetToolkit } from '../../types/Bets'
import { BetMode } from '../../types/Plinko'
import { debounce } from '../../helpers/hooks/useDebounceCallback'
import { getRandomValidPath } from '../../helpers/plinkoHelpers'
import { PlinkoConfig } from '../../constants/plinko'
import DiamondIcon from '../../components/icons/DiamondIcon'
import { useSocketCtx } from '../../store/SocketStore'
import { getToast } from '../../helpers/toast'

const PlinkoActions = () => {
  const [selectedBet, setSelectedBet] = useState<BetToolkit | null>(null)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const { socket } = useSocketCtx()

  const {
    isStarted,
    inGameBalls,
    setInGameBalls,
    setIsStarted,
    mode,
    betAmount,
    numberOfBets,
    risk,
    selectedRow,
    rowOptions,
    setPaths,
    setMode,
    setBetAmount,
    setNumberOfBets,
    setRisk,
    setSelectedRow
  } = usePlinko()

  const BUTTON_DISABLED_DELAY = selectedRow * PlinkoConfig.DELAY_BALL_DROP

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

  const handleChangeBetMode: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      const mode = event.currentTarget.textContent as BetMode

      if (mode === BetMode.Manual) {
        setNumberOfBets(1)
        setPaths([])
      }

      setMode(mode)
    },
    [mode]
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

  const buttonDisabled = () => {
    setIsButtonDisabled(true)
    setTimeout(() => setIsButtonDisabled(false), BUTTON_DISABLED_DELAY)
  }

  const handlePlaceBet = useCallback(
    debounce(() => {
      if (numberOfBets >= 1) {
        mode === 'Automatic' && buttonDisabled()

        socket.emit(
          'plinko',
          { rows: selectedRow, risk, wager: betAmount },
          (
            err: boolean,
            { multiplier, amount, win }: { multiplier: number; amount: number; win: number }
          ) => {
            if (err) {
              getToast("Plinko doesn't fall")
            }

            if (!err) {
              setInGameBalls((prev: number) =>
                numberOfBets > 1 ? (prev += numberOfBets) : prev + 1
              )
              setPaths([])
              setIsStarted(true)

              const validPath = getRandomValidPath(risk, selectedRow, multiplier)

              setPaths((prev) => [...prev, validPath])
            }
          }
        )
      }
    }, 400),
    [numberOfBets, isStarted, selectedRow]
  )

  useEffect(() => {
    if (inGameBalls < 1 && isStarted) {
      setIsStarted(false)
    }
  }, [isStarted, inGameBalls])

  return (
    <BetActionsContainer path="/provably-fair#plinko">
      <ToggleMode mode={mode} handleChange={handleChangeBetMode} />
      <div className="flex flex-col space-y-7 mt-4">
        <div className="border-b-2 border-b-blue-accent-fourth pb-6">
          <div className="relative">
            <InputWithLabel
              type="number"
              labelClasses="flex flex-col w-full mb-8 items-start"
              titleClasses="gradient-blue-secondary text-gray-primary text-sm px-4 py-3 leading-4 rounded-t-xl inline-block"
              inputWrapperClasses="bg-dark/25 rounded-b-xl rounded-tr-xl overflow-hidden w-full"
              inputClasses="grow w-0 mr-2 bg-transparent bg-none border-none outline-none shadow-none pl-8"
              name="password"
              label="Bet amount"
              value={betAmount}
              onChange={handleChangeBetAmount}
            />
            <div className="w-6 h-6 text-center leading-6 shrink-0 bg-green-primary/20 rounded mr-2 text-green-primary absolute top-14 left-4">
              <DiamondIcon className="-inset-full absolute m-auto" />
            </div>
          </div>
          <RangeSlider
            value={betAmount}
            min={100}
            max={1500}
            sliderValueChanged={handleChangeBetAmount}
          />
        </div>
        <div className="border-b-2 border-b-blue-accent-fourth pb-6">
          <ToggleBets value={selectedBet} handleChange={setSelectedBet} betToolkit={betToolkit} />
        </div>
        <div className="border-b-2 border-b-blue-accent-fourth flex flex-col w-full pb-6">
          <ToggleRows
            isBlocked={isStarted}
            value={selectedRow}
            handleChange={setSelectedRow}
            rowOptions={rowOptions}
          />
        </div>
        <div className="border-b-2 border-b-blue-accent-fourth pb-6">
          <ToggleRisk isBlocked={isStarted} value={risk} handleChange={setRisk} />
        </div>
        {mode === 'Automatic' && (
          <div className="border-b-2 border-b-blue-accent-fourth">
            <InputWithLabel
              type="number"
              name="numberOfBets"
              label="Number of Bets"
              placeholder="Enter number of bets"
              value={numberOfBets}
              onChange={(e) => setNumberOfBets(Number(e.target.value))}
            />
          </div>
        )}
        <div className="flex pb-6">
          <Button
            disabled={isButtonDisabled}
            onClick={handlePlaceBet}
            className="w-full bg-green-primary rounded h-11"
          >
            Place Bet
          </Button>
        </div>
      </div>
    </BetActionsContainer>
  )
}

export default PlinkoActions
