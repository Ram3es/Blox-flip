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
import { IRootCaseItem } from '../types/Cases'
import { getToast } from '../helpers/toast'

interface ChatProviderProps {
  children: ReactNode
}

interface ICaseOpeningContext {
  cases: IRootCaseItem[]
  setCases: Dispatch<SetStateAction<IRootCaseItem[]>>
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const CaseOpeningContext = createContext<ICaseOpeningContext>({} as ICaseOpeningContext)

export const useCaseOpening = () => {
  return useContext(CaseOpeningContext)
}

export const CaseOpeningProvider = ({ children }: ChatProviderProps) => {
  const [cases, setCases] = useState<IRootCaseItem[]>([])

  const { socket } = useSocketCtx()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    socket.emit('load_cases', (err: boolean, case_list: IRootCaseItem[]) => {
      if (typeof err === 'string') {
        getToast(err)
      }
      if (!err) {
        console.log(case_list, 'caselist')
        setCases(case_list)
      }
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
