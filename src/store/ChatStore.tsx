import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { IChatUser } from '../types/User'

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
  const [selectedUser, setUserSelected] = useState<IChatUser>()
  const [selectedMessage, setSelectedMessage] = useState<string>('')

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
        setSelectedMessage

      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
