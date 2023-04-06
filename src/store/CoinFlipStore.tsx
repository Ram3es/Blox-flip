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
  isOpenCreateGame: boolean
  setIsOpenCreateGame: Dispatch<SetStateAction<boolean>>
  isOpenJoinGame: boolean
  setIsOpenJoinGame: Dispatch<SetStateAction<boolean>>
  isOpenBattleGame: boolean
  setIsOpenBattleGame: Dispatch<SetStateAction<boolean>>
  isOpenWatchedGame: boolean
  setIsOpenWatchedGame: Dispatch<SetStateAction<boolean>>
  isOpenCallBot: boolean
  setIsOpenCallBot: Dispatch<SetStateAction<boolean>>
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const CoinFlipContext = createContext<ICoinFlipContext>({} as ICoinFlipContext)

export const useCoinFlip = () => {
  return useContext(CoinFlipContext)
}

export const CoinFlipProvider = ({ children }: PlinkoProviderProps) => {
  const [betAmount, setBetAmount] = useState(200)
  const [selectedCoin, setSelectedCoin] = useState<ICoinFlipContext['selectedCoin']>(null)

  const [isOpenCreateGame, setIsOpenCreateGame] = useState(false)
  const [isOpenJoinGame, setIsOpenJoinGame] = useState(false)
  const [isOpenBattleGame, setIsOpenBattleGame] = useState(false)
  const [isOpenWatchedGame, setIsOpenWatchedGame] = useState(false)
  const [isOpenCallBot, setIsOpenCallBot] = useState(false)

  return (
    <CoinFlipContext.Provider
      value={{
        betAmount,
        setBetAmount,
        selectedCoin,
        setSelectedCoin,
        isOpenCreateGame,
        setIsOpenCreateGame,
        isOpenJoinGame,
        setIsOpenJoinGame,
        isOpenBattleGame,
        setIsOpenBattleGame,
        isOpenWatchedGame,
        setIsOpenWatchedGame,
        isOpenCallBot,
        setIsOpenCallBot
      }}
    >
      {children}
    </CoinFlipContext.Provider>
  )
}
