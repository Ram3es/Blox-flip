import { ReactNode, createContext, useContext, useEffect, useMemo } from 'react'
import { io, Socket } from 'socket.io-client'
import { Context } from './Store'

export type TSocket = Socket
export interface ChatSocketCtxState {
  socket: TSocket
}
const URL = import.meta.env.VITE_API_URL
// const socket = io(URL, { autoConnect: false })

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const ChatSocketCtx = createContext<ChatSocketCtxState>({} as ChatSocketCtxState)

export const useSocketCtx = () => useContext(ChatSocketCtx)

const SocketCtxProvider = ({ children }: { children?: ReactNode }) => {
  const { state: { hash } } = useContext(Context)
  const socket = useMemo(() => io(URL, { query: { token: hash }, autoConnect: false }), [hash])

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
