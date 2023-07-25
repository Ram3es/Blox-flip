import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { ICoinFlip } from '../types/CoinFlip'

interface PlinkoProviderProps {
  children: ReactNode
}

export interface ICoinFlipContext {
  currentGame: ICoinFlip | null
  setCurrentGame: Dispatch<SetStateAction<ICoinFlip | null>>
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
  const [currentGame, setCurrentGame] = useState<ICoinFlip | null>(null)

  const [isOpenBattleGame, setIsOpenBattleGame] = useState(false)
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false)

  return (
    <CoinFlipContext.Provider
      value={{
        currentGame,
        setCurrentGame,
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
