import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { Context } from './Store'

export type TSocket = Socket
export interface ChatSocketCtxState {
  socket: TSocket
  userBalance: number
}
const URL = import.meta.env.VITE_API_URL
const socket = io(URL, { autoConnect: false, query: { user_room: 1 } })

const token = localStorage.getItem('token')
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const ChatSocketCtx = createContext<ChatSocketCtxState>({} as ChatSocketCtxState)

export const useSocketCtx = () => useContext(ChatSocketCtx)

const SocketCtxProvider = ({ children }: { children?: ReactNode }) => {
  const { state: { hash }, dispatch } = useContext(Context)
  const [userBalance, setUserBalance] = useState(0)

  useEffect(() => {
    socket.on('balance', ({ data }) => {
      // TODO
      if (data) {
        setUserBalance(data)
      }
    })

    socket.connect()

    return () => {
      socket.off('balance')
    }
  }, [socket])

  useEffect(() => {
    if (token ?? hash) {
      socket.emit('authenticate_user', { token: token ?? hash }, (res: any) => {
        console.log(res)
        // dispatch({ type: 'LOGIN', payload: res.data })
      })
    }
  }, [hash])
  return (
      <ChatSocketCtx.Provider value={{ socket, userBalance }}>
        {children}
      </ChatSocketCtx.Provider>
  )
}
export default SocketCtxProvider