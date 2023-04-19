import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import type { IKingFight, IKingGame } from '../types/King'
import { kingMock, kingMockInitial } from '../mocks/kingMock'

interface KingProviderProps {
  children: ReactNode
}

interface IKingContext {
  game: IKingGame
  setGame: Dispatch<SetStateAction<IKingGame>>
  queue: IKingGame[]
  setQueue: Dispatch<SetStateAction<IKingGame[]>>
  fight: IKingFight[] | null
  setFight: Dispatch<SetStateAction<IKingFight[] | null>>
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const KingContext = createContext<IKingContext>({} as IKingContext)

export const useKing = () => {
  return useContext(KingContext)
}

export const KingProvider = ({ children }: KingProviderProps) => {
  const [game, setGame] = useState<IKingGame>(kingMockInitial)
  const [queue, setQueue] = useState(kingMock)
  const [fight, setFight] = useState<IKingFight[] | null>(null)

  return (
    <KingContext.Provider value={{ game, setGame, queue, setQueue, fight, setFight }}>
      {children}
    </KingContext.Provider>
  )
}
