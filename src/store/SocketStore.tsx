import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAppStore } from './Store'
import { decodeBase64 } from '../helpers/decodeToken'

const user = {
  id: 'aass2b44b123ghg346',
  name: 'John Johnson',
  avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/563.jpg',
  level: 11,
  progress: {
    current: 50,
    required: 165
  }
}

export type TSocket = Socket
export interface ChatSocketCtxState {
  socket: TSocket
  userBalance: number
}
const URL = import.meta.env.VITE_API_URL
const socket = io(URL, { query: { user_room: 1 } })

const token = localStorage.getItem('token')
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const ChatSocketCtx = createContext<ChatSocketCtxState>({} as ChatSocketCtxState)

export const useSocketCtx = () => useContext(ChatSocketCtx)

const SocketCtxProvider = ({ children }: { children?: ReactNode }) => {
  const { state: { hash }, dispatch } = useAppStore()
  const [userBalance, setUserBalance] = useState(0)
  const [isConnected, setConnected] = useState(socket.connected)

  useEffect(() => {
    socket.on('connect', () => {
      setConnected(true)
    })
    socket.on('disconnect', () => {
      setConnected(false)
    })
    return () => {
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [])

  useEffect(() => {
    if (token ?? hash) {
      if (token) {
        const decoded: IRobloxSecurityData = JSON.parse(decodeBase64((token)))
        dispatch({ type: 'LOGIN', payload: { ...user, name: decoded.UserName, avatar: decoded.ThumbnailUrl } })
      }
      if (isConnected) {
        socket.emit('authenticate_user', { token: token ?? hash }, (res: any) => {
        })
      }
    }
  }, [hash, isConnected])

  return (
      <ChatSocketCtx.Provider value={{ socket, userBalance }}>
        {children}
      </ChatSocketCtx.Provider>
  )
}
export default SocketCtxProvider
