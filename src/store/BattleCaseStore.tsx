import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'
import { useSocketCtx } from './SocketStore'
import { getToast } from '../helpers/toast'
import { IRootBattle } from '../types/CaseBattles'

interface BattleCaseProviderProps {
  children: ReactNode
}

interface IBattleCaseContext {
  games: IRootBattle[]
  setGames: Dispatch<SetStateAction<IRootBattle[]>>
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const BattleCaseContext = createContext<IBattleCaseContext>({} as IBattleCaseContext)

export const useBattleCase = () => {
  return useContext(BattleCaseContext)
}

export const BattleCaseProvider = ({ children }: BattleCaseProviderProps) => {
  const [games, setGames] = useState<IRootBattle[]>([])
  const { socket } = useSocketCtx()

  useEffect(() => {
    socket.on('send_battle', (err: string | boolean, data: IRootBattle) => {
      if (typeof err === 'string') {
        getToast(err)
      }
      if (!err) {
        setGames((prev) => [...prev, data])
      }
    })

    return () => {
      socket.off('send_battle')
    }
  }, [socket])

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
