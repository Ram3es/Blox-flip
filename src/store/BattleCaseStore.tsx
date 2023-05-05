import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { dataTable, IBattlesInfo } from '../mocks/battle'

interface BattleCaseProviderProps {
  children: ReactNode
}

interface IBattleCaseContext {
  games: IBattlesInfo[]
  setGames: Dispatch<SetStateAction<IBattlesInfo[]>>
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const BattleCaseContext = createContext<IBattleCaseContext>({} as IBattleCaseContext)

export const useBattleCase = () => {
  return useContext(BattleCaseContext)
}

export const BattleCaseProvider = ({ children }: BattleCaseProviderProps) => {
  const [games, setGames] = useState<IBattlesInfo[]>(dataTable)

  return (
    <BattleCaseContext.Provider
      value={{
        games,
        setGames
      }}
    >
      {children}
    </BattleCaseContext.Provider>
  )
}
