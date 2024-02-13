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
import { IUserLevel } from '../types/User'
import { jwtDecode } from 'jwt-decode'

// import DEFAULT_AVATAR from '../assets/img/avatar_img.png'

export type TSocket = Socket
export interface ChatSocketCtxState {
  socket: TSocket
  userBalance: number
  onlineUsers: number
  userLevel: IUserLevel | null
  twoFactorAuthModal: boolean
  setTwoFactorAuthModal: Dispatch<SetStateAction<boolean>>
  setIsShownRobloxModal: Dispatch<SetStateAction<boolean>>
  setIsShownChangeNameModal: Dispatch<SetStateAction<boolean>>
  isAuthenticated: boolean
  isShownRobloxModal: boolean
  isShownChangeNameModal: boolean
  isShownLinkinRobloxBtn: boolean
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
  const [isShownRobloxModal, setIsShownRobloxModal] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isShownLinkinRobloxBtn, setIsShownLinkinRobloxBtn] = useState(true)
  const [isShownChangeNameModal, setIsShownChangeNameModal] = useState(false)

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

    socket.on('link_roblox', (data: any) => {
      console.log('LISTENER:link_roblox', data)
      setIsShownRobloxModal(true)
    })

    socket.on('unlock_linking', (data: any) => {
      console.log('LISTENER:unlock_linking', data)
      setIsShownLinkinRobloxBtn(true)
    })

    socket.on('name_change', (data: { name: string }) => {
      console.log(data)
      dispatch({ type: 'CHANGE_USER_NAME', payload: data.name })
    })

    socket.connect()

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('balance')
      socket.off('online_list')
      socket.off('link_roblox')
      socket.off('unlock_linking')
      socket.off('name_change')
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (token ?? hash) {
      const decoded: IRobloxSecurityData = jwtDecode(token ?? (hash as string))
      dispatch({
        type: 'LOGIN',
        payload: {
          id: decoded.UserID ?? decoded.id,
          name: decoded.UserName ?? decoded?.name,
          avatar: decoded.ThumbnailUrl ?? decoded?.avatar
        }
      })
      if (isConnected) {
        socket.emit('authenticate_user', { token: token ?? hash }, (res: any) => {
          console.log('AUTH_SOCKET_RES', res)
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
        setIsShownRobloxModal,
        setIsShownChangeNameModal,
        isAuthenticated,
        isShownRobloxModal,
        isShownLinkinRobloxBtn,
        isShownChangeNameModal

      }}
    >
      {children}
    </ChatSocketCtx.Provider>
  )
}
export default SocketCtxProvider
