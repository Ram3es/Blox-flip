import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAppStore } from './Store'
import { decodeBase64 } from '../helpers/decodeToken'
import { IUserLevel } from '../types/User'

export type TSocket = Socket
export interface ChatSocketCtxState {
  socket: TSocket
  userBalance: number
  userLevel: IUserLevel | null
}
const URL = import.meta.env.VITE_API_URL
const socket = io(URL, { autoConnect: false, query: { user_room: 1 } })

const token =
  'eyJVc2VySUQiOjQ3MTEzNjg2ODMsIlVzZXJOYW1lIjoiZWZpbnN3aW0iLCJSb2J1eEJhbGFuY2UiOjAsIlRodW1ibmFpbFVybCI6Imh0dHBzOi8vdHIucmJ4Y2RuLmNvbS9mMjExMDU2ODdmOTAyOWU3NGM4MTVkNDY2NTY2ZDJjNy8zNTIvMzUyL0F2YXRhci9QbmciLCJJc0FueUJ1aWxkZXJzQ2x1Yk1lbWJlciI6ZmFsc2UsIklzUHJlbWl1bSI6ZmFsc2UsInNhbHQiOiJiMDUwODQ5ODM5YWU0NzhjZGYxZjgzMTA0MTY4MDM5NzdmYjBmYjk3In0='
// const token = localStorage.getItem('token')
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const ChatSocketCtx = createContext<ChatSocketCtxState>({} as ChatSocketCtxState)

export const useSocketCtx = () => useContext(ChatSocketCtx)

const SocketCtxProvider = ({ children }: { children?: ReactNode }) => {
  const {
    state: { hash },
    dispatch
  } = useAppStore()
  const [userBalance, setUserBalance] = useState(0)
  const [userLevel, setUserLevel] = useState<IUserLevel | null>(null)

  useEffect(() => {
    socket.on('balance', ({ data }) => {
      // TODO
      if (data) {
        setUserBalance(data)
      }
    })

    socket.on('level', (userLevel: IUserLevel) => {
      setUserLevel(userLevel)
      console.log('level', userLevel.level)
    })
    socket.connect()

    return () => {
      socket.off('balance')
      socket.off('level')
    }
  }, [socket])

  useEffect(() => {
    if (token ?? hash) {
      if (token) {
        const decoded: IRobloxSecurityData = JSON.parse(decodeBase64(token))
        dispatch({
          type: 'LOGIN',
          payload: { name: decoded.UserName, avatar: decoded.ThumbnailUrl }
        })
      }

      socket.emit('authenticate_user', { token: token ?? hash }, (res: any) => {})
    }
  }, [hash])

  return <ChatSocketCtx.Provider value={{ socket, userBalance, userLevel }}>{children}</ChatSocketCtx.Provider>
}
export default SocketCtxProvider
