import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import { io, Socket } from 'socket.io-client'
import { useAppStore } from './Store'
import { decodeBase64 } from '../helpers/decodeToken'
import { IUserLevel } from '../types/User'

export type TSocket = Socket
export interface ChatSocketCtxState {
  socket: TSocket
  userBalance: number
  onlineUsers: number
  userLevel: IUserLevel | null
  twoFactorAuthModal: boolean
  setTwoFactorAuthModal: Dispatch<SetStateAction<boolean>>
  isAuthenticated: boolean
}
const URL = import.meta.env.VITE_API_URL
const socket = io(URL, {
  autoConnect: false,
  query: { user_room: 1 },
  transports: ['websocket', 'pooling'],
  upgrade: true
})

const token = localStorage.getItem('token')
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const ChatSocketCtx = createContext<ChatSocketCtxState>({} as ChatSocketCtxState)

export const useSocketCtx = () => useContext(ChatSocketCtx)

const SocketCtxProvider = ({ children }: { children?: ReactNode }) => {
  const {
    state: { hash },
    dispatch
  } = useAppStore()
  const [isConnected, setConnected] = useState(socket.connected)

  const [userBalance, setUserBalance] = useState(0)
  const [userLevel, setUserLevel] = useState<IUserLevel | null>(null)
  const [onlineUsers, setOnlineUsers] = useState<number>(0)
  const [twoFactorAuthModal, setTwoFactorAuthModal] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const onConnect = () => {
      setConnected(true)
    }

    const onDisconnect = () => {
      setConnected(false)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    socket.on('balance', ({ balance }) => {
      if (balance) {
        setUserBalance(balance)
      }
    })

    socket.on('level', (userLevel: IUserLevel) => {
      setUserLevel(userLevel)
    })

    socket.on('online_list', ({ users }: { users: number }) => {
      setOnlineUsers(users)
    })

    socket.connect()

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('balance')
      socket.off('level')
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (token ?? hash) {
      const decoded: IRobloxSecurityData = JSON.parse(decodeBase64(token ?? (hash as string)))
      dispatch({
        type: 'LOGIN',
        payload: {
          id: decoded.UserID,
          name: decoded.UserName,
          avatar: decoded.ThumbnailUrl
        }
      })
      if (isConnected) {
        socket.emit('authenticate_user', { token: token ?? hash }, (res: any) => {
          setIsAuthenticated(true)
        })
      }
    }
  }, [hash, isConnected])

  return (
    <ChatSocketCtx.Provider
      value={{
        socket,
        userBalance,
        userLevel,
        onlineUsers,
        twoFactorAuthModal,
        setTwoFactorAuthModal,
        isAuthenticated
      }}
    >
      {children}
    </ChatSocketCtx.Provider>
  )
}
export default SocketCtxProvider
