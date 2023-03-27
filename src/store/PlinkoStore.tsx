import {
  ChangeEvent,
  createContext,
  MouseEventHandler,
  ReactNode,
  useContext,
  useState
} from 'react'
import { BetToolkit } from '../types/Bets'
import { RiskVariant } from '../types/enums'
import { BetMode, RowVariant } from '../types/Plinko'

interface PlinkoProviderProps {
  children: ReactNode
}

interface PlinkoState {
  isStarted: boolean
  betAmount: number
  numberOfBets: number
  selectedRow: RowVariant
  selectedBet: BetToolkit | null
  rowOptions: RowVariant[]
  mode: keyof typeof BetMode
  risk: keyof typeof RiskVariant
}

interface IPlinkoContext extends PlinkoState {
  setIsStarted: (value: boolean) => void
  setMode: (value: keyof typeof BetMode) => void
  setBetAmount: (value: number) => void
  setSelectedBet: (value: BetToolkit | null) => void
  setSelectedRow: (value: RowVariant) => void
  setRisk: (value: keyof typeof RiskVariant) => void
  handleChangeBetAmount: (eventOrValue: ChangeEvent<HTMLInputElement> | number) => void
  handleChangeBetMode: MouseEventHandler<HTMLButtonElement>
  setNumberOfBets: (value: number) => void
  betToolkit: () => BetToolkit[]
}

const initialState: PlinkoState = {
  isStarted: false,
  betAmount: 500,
  numberOfBets: 1,
  selectedRow: 16,
  selectedBet: null,
  mode: BetMode.Manual,
  risk: RiskVariant.Low,
  rowOptions: [8, 10, 12, 14, 16]
}

const PlinkoContext = createContext<IPlinkoContext>(initialState as IPlinkoContext)

export const usePlinko = () => {
  return useContext(PlinkoContext)
}

export const PlinkoProvider = ({ children }: PlinkoProviderProps) => {
  const [isStarted, setIsStarted] = useState(false)
  const [mode, setMode] = useState<keyof typeof BetMode>(BetMode.Manual)
  const [betAmount, setBetAmount] = useState(200)
  const [selectedBet, setSelectedBet] = useState<BetToolkit | null>(null)
  const [selectedRow, setSelectedRow] = useState<RowVariant>(16)
  const [numberOfBets, setNumberOfBets] = useState(1)
  const [risk, setRisk] = useState<keyof typeof RiskVariant>(RiskVariant.Low)
  const rowOptions: RowVariant[] = [8, 10, 12, 14, 16]

  const handleChangeBetAmount = (eventOrValue: ChangeEvent<HTMLInputElement> | number) => {
    if (typeof eventOrValue === 'number') {
      setBetAmount(eventOrValue)
    } else {
      setBetAmount(Number(eventOrValue.target.value))
    }
  }

  const handleChangeBetMode: MouseEventHandler<HTMLButtonElement> = (event) => {
    const mode = event.currentTarget.textContent as BetMode

    if (mode === BetMode.Manual) {
      setNumberOfBets(1)
    }

    setMode(mode)
  }

  const betToolkit = (): BetToolkit[] => {
    return [
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
  }

  return (
    <PlinkoContext.Provider
      value={{
        handleChangeBetAmount,
        handleChangeBetMode,
        isStarted,
        setIsStarted,
        mode,
        setMode,
        betAmount,
        setBetAmount,
        selectedBet,
        setSelectedBet,
        selectedRow,
        setSelectedRow,
        numberOfBets,
        setNumberOfBets,
        risk,
        setRisk,
        rowOptions,
        betToolkit
      }}
    >
      {children}
    </PlinkoContext.Provider>
  )
}
