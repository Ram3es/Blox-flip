import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { Coin } from '../types/CoinFlip'

interface PlinkoProviderProps {
  children: ReactNode
}

export interface ICoinFlipContext {
  betAmount: number
  setBetAmount: Dispatch<SetStateAction<number>>
  selectedCoin: Coin | null
  setSelectedCoin: Dispatch<SetStateAction<Coin | null>>
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const CoinFlipContext = createContext<ICoinFlipContext>({} as ICoinFlipContext)

export const useCoinFlip = () => {
  return useContext(CoinFlipContext)
}

export const CoinFlipProvider = ({ children }: PlinkoProviderProps) => {
  const [betAmount, setBetAmount] = useState(200)
  const [selectedCoin, setSelectedCoin] = useState<ICoinFlipContext['selectedCoin']>(null)

  return (
    <CoinFlipContext.Provider value={{ betAmount, setBetAmount, selectedCoin, setSelectedCoin }}>
      {children}
    </CoinFlipContext.Provider>
  )
}
