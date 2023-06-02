import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { ICoin, ICoinFlip } from '../types/CoinFlip'

interface PlinkoProviderProps {
  children: ReactNode
}

export interface ICoinFlipContext {
  betAmount: number
  setBetAmount: Dispatch<SetStateAction<number>>
  selectedCoin: ICoin
  setSelectedCoin: Dispatch<SetStateAction<ICoin>>
  currentGame: ICoinFlip | null
  setCurrentGame: Dispatch<SetStateAction<ICoinFlip | null>>
  isOpenLobbyModal: boolean
  setIsOpenLobbyModal: Dispatch<SetStateAction<boolean>>
  isOpenBattleGame: boolean
  setIsOpenBattleGame: Dispatch<SetStateAction<boolean>>
  isOpenLoginModal: boolean
  setIsOpenLoginModal: Dispatch<SetStateAction<boolean>>
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const CoinFlipContext = createContext<ICoinFlipContext>({} as ICoinFlipContext)

export const useCoinFlip = () => {
  return useContext(CoinFlipContext)
}

export const CoinFlipProvider = ({ children }: PlinkoProviderProps) => {
  const [betAmount, setBetAmount] = useState(200)
  const [selectedCoin, setSelectedCoin] = useState<ICoinFlipContext['selectedCoin']>(0)

  const [currentGame, setCurrentGame] = useState<ICoinFlip | null>(null)

  const [isOpenLobbyModal, setIsOpenLobbyModal] = useState(false)
  const [isOpenBattleGame, setIsOpenBattleGame] = useState(false)
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false)

  return (
    <CoinFlipContext.Provider
      value={{
        betAmount,
        setBetAmount,
        selectedCoin,
        setSelectedCoin,
        currentGame,
        setCurrentGame,
        isOpenLobbyModal,
        setIsOpenLobbyModal,
        isOpenBattleGame,
        setIsOpenBattleGame,
        isOpenLoginModal,
        setIsOpenLoginModal
      }}
    >
      {children}
    </CoinFlipContext.Provider>
  )
}
