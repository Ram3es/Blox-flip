import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { IChatMessage } from '../types/Chat'

export interface ChatSocketCtxState {
  socket: Socket
  historyChat: IChatMessage[]
}

const socket = io('http://localhost:8080', { autoConnect: false }) // test local server 'http://localhost:8080

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const ChatSocketCtx = createContext<ChatSocketCtxState>({} as ChatSocketCtxState)

export const useChatSocketCtx = () => useContext(ChatSocketCtx)

const ChatSocketCtxProvider = ({ children }: { children?: ReactNode }) => {
  const [historyChat, setHistoryChat] = useState<IChatMessage[]>([])

  useEffect(() => {
    socket.on('chat_history', (histoyChat) => {
      setHistoryChat(histoyChat.data)
    })
    socket.on('chat_receive', ({ data }) => {
      setHistoryChat(data)
    })
    socket.on('remove_message', ({ data }) => {
      setHistoryChat(prev => [...prev.filter(msg => msg.hash !== data)])
    })
    socket.on('remove_all_message', ({ data }) => {
      setHistoryChat(prev => [...prev.filter(msg => msg.user.id !== data)])
    })

    socket.on('balance', ({ data }) => {
      // TODO
    })

    socket.connect()

    return () => {
      socket.off('chat_history')
      socket.off('chat_receive')
      socket.off('remove_message')
      socket.off('remove_all_message')
    }
  }, [socket])
  return (
      <ChatSocketCtx.Provider value={{ socket, historyChat }}>
        {children}
      </ChatSocketCtx.Provider>
  )
}
export default ChatSocketCtxProvider
