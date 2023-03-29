import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react'
import { RiskVariant } from '../types/enums'
import { BetMode, RowVariant } from '../types/Plinko'

interface PlinkoProviderProps {
  children: ReactNode
}

interface IPlinkoContext {
  isStarted: boolean
  mode: keyof typeof BetMode
  betAmount: number
  numberOfBets: number
  risk: keyof typeof RiskVariant
  selectedRow: RowVariant
  rowOptions: RowVariant[]
  setIsStarted: Dispatch<SetStateAction<boolean>>
  setMode: Dispatch<SetStateAction<keyof typeof BetMode>>
  setBetAmount: Dispatch<SetStateAction<number>>
  setNumberOfBets: Dispatch<SetStateAction<number>>
  setRisk: Dispatch<SetStateAction<keyof typeof RiskVariant>>
  setSelectedRow: Dispatch<SetStateAction<RowVariant>>
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const PlinkoContext = createContext<IPlinkoContext>({} as IPlinkoContext)

export const usePlinko = () => {
  return useContext(PlinkoContext)
}

export const PlinkoProvider = ({ children }: PlinkoProviderProps) => {
  const [isStarted, setIsStarted] = useState(false)
  const [mode, setMode] = useState<keyof typeof BetMode>(BetMode.Manual)
  const [betAmount, setBetAmount] = useState(200)
  const [numberOfBets, setNumberOfBets] = useState(1)
  const [risk, setRisk] = useState<keyof typeof RiskVariant>(RiskVariant.Low)
  const [selectedRow, setSelectedRow] = useState<RowVariant>(16)
  const rowOptions: RowVariant[] = [8, 10, 12, 14, 16]

  return (
    <PlinkoContext.Provider
      value={{
        isStarted,
        mode,
        betAmount,
        numberOfBets,
        risk,
        selectedRow,
        rowOptions,
        setIsStarted,
        setMode,
        setBetAmount,
        setNumberOfBets,
        setRisk,
        setSelectedRow
      }}
    >
      {children}
    </PlinkoContext.Provider>
  )
}
