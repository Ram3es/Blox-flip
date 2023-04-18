import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { IKingFight } from '../types/King'

interface KingProviderProps {
  children: ReactNode
}

interface IKingContext {
  fight: IKingFight[] | null
  setFight: Dispatch<SetStateAction<IKingFight[] | null>>
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const KingContext = createContext<IKingContext>({} as IKingContext)

export const useKing = () => {
  return useContext(KingContext)
}

export const KingProvider = ({ children }: KingProviderProps) => {
  const [fight, setFight] = useState<IKingFight[] | null>(null)

  return <KingContext.Provider value={{ fight, setFight }}>{children}</KingContext.Provider>
}
