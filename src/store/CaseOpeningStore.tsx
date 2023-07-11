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
import { ICaseUnboxingItem } from '../types/Cases'

interface ChatProviderProps {
  children: ReactNode
}

interface ICaseOpeningContext {
  cases: ICaseUnboxingItem[]
  setCases: Dispatch<SetStateAction<ICaseUnboxingItem[]>>
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const CaseOpeningContext = createContext<ICaseOpeningContext>({} as ICaseOpeningContext)

export const useCaseOpening = () => {
  return useContext(CaseOpeningContext)
}

export const CaseOpeningProvider = ({ children }: ChatProviderProps) => {
  const [cases, setCases] = useState<ICaseUnboxingItem[]>([])

  const { socket } = useSocketCtx()

  useEffect(() => {
    socket.emit('load_cases', (err: boolean, cases: []) => {
      if (err) {
        return
      }
      setCases(cases)
    })
  }, [socket])

  return (
    <CaseOpeningContext.Provider
      value={{
        cases,
        setCases
      }}
    >
      {children}
    </CaseOpeningContext.Provider>
  )
}
