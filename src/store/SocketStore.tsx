import { ReactNode, createContext, useContext, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

export type TSocket = Socket
export interface ChatSocketCtxState {
  socket: TSocket
}
const URL = import.meta.env.VITE_API_URL
const socket = io(URL, { autoConnect: false })

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const ChatSocketCtx = createContext<ChatSocketCtxState>({} as ChatSocketCtxState)

export const useSocketCtx = () => useContext(ChatSocketCtx)

const SocketCtxProvider = ({ children }: { children?: ReactNode }) => {
  useEffect(() => {
    socket.on('balance', ({ data }) => {
      // TODO
    })

    socket.connect()

    return () => {
      socket.off('balance')
    }
  }, [socket])
  return (
      <ChatSocketCtx.Provider value={{ socket }}>
        {children}
      </ChatSocketCtx.Provider>
  )
}
export default SocketCtxProvider
