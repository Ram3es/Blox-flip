import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { IChatUser } from '../types/User'
import { useSocketCtx } from './SocketStore'
import { IChatMessage } from '../types/Chat'

interface ChatProviderProps {
  children: ReactNode
}

interface IChatContext {
  isOpenBanModal: boolean
  setIsOpenBanModal: Dispatch<SetStateAction<boolean>>
  isOpenTimeoutModal: boolean
  setIsOpenTimeoutModal: Dispatch<SetStateAction<boolean>>
  isOpenTipModal: boolean
  setIsOpenTipModal: Dispatch<SetStateAction<boolean>>
  isOpenTriviaModal: boolean
  setIsOpenTriviaModal: Dispatch<SetStateAction<boolean>>
  selectedUser?: IChatUser
  setUserSelected: Dispatch<SetStateAction<IChatUser | undefined >>
  selectedMessage: string
  setSelectedMessage: Dispatch<SetStateAction<string>>
  historyChat: IChatMessage[]

}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const ChatContext = createContext<IChatContext>({} as IChatContext)

export const useChat = () => {
  return useContext(ChatContext)
}

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [isOpenBanModal, setIsOpenBanModal] = useState(false)
  const [isOpenTimeoutModal, setIsOpenTimeoutModal] = useState(false)
  const [isOpenTipModal, setIsOpenTipModal] = useState(false)
  const [isOpenTriviaModal, setIsOpenTriviaModal] = useState(false)
  const [historyChat, setHistoryChat] = useState<IChatMessage[]>([])
  const [selectedUser, setUserSelected] = useState<IChatUser>()
  const [selectedMessage, setSelectedMessage] = useState<string>('')
  const { socket } = useSocketCtx()

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

    return () => {
      socket.off('chat_history')
      socket.off('chat_receive')
      socket.off('remove_message')
      socket.off('remove_all_message')
    }
  }, [socket])

  return (
    <ChatContext.Provider
      value={{
        isOpenBanModal,
        setIsOpenBanModal,
        isOpenTimeoutModal,
        setIsOpenTimeoutModal,
        isOpenTipModal,
        setIsOpenTipModal,
        isOpenTriviaModal,
        setIsOpenTriviaModal,
        selectedUser,
        setUserSelected,
        selectedMessage,
        setSelectedMessage,
        historyChat

      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
