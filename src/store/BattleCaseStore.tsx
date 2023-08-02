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
import { IRootCaseItem } from '../types/Cases'
import { Context } from './Store'

interface BattleCaseProviderProps {
  children: ReactNode
}

interface IBattleCaseContext {
  games: IRootBattle[]
  setGames: Dispatch<SetStateAction<IRootBattle[]>>
  allCases: IRootCaseItem[]
  setAllCases: Dispatch<SetStateAction<IRootCaseItem[]>>
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const BattleCaseContext = createContext<IBattleCaseContext>({} as IBattleCaseContext)

export const useBattleCase = () => {
  return useContext(BattleCaseContext)
}

export const BattleCaseProvider = ({ children }: BattleCaseProviderProps) => {
  const [games, setGames] = useState<IRootBattle[]>([])
  const [allCases, setAllCases] = useState<IRootCaseItem[]>([])
  const { state } = useContext(Context)

  const { socket } = useSocketCtx()

  useEffect(() => {
    socket.on('send_battle', (err: string | boolean, data: IRootBattle) => {
      if (typeof err === 'string') {
        getToast(err)
      }
      if (!err) {
        setGames((prev) => ([...prev, data]))
      }
    })

    return () => {
      socket.off('send_battle')
    }
  }, [socket])

  useEffect(() => {
    socket.emit('load_cases', (err: boolean | string, skins: IRootCaseItem[]) => {
      if (typeof err === 'string') {
        getToast(err)
      }
      if (!err) {
        setAllCases(skins)
      }
    })

    socket.emit('load_case_battles', (err: string | boolean, data: IRootBattle[]) => {
      if (typeof err === 'string') {
        getToast(err)
      }
      if (!err) {
        setGames(data)
        console.log(data, 'root battles')
      }
    })
  }, [state.user])

  return (
    <BattleCaseContext.Provider
      value={{
        games,
        setGames,
        allCases,
        setAllCases
      }}
    >
      {children}
    </BattleCaseContext.Provider>
  )
}
