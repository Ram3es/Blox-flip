import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'

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

  return (
    <ChatContext.Provider
      value={{
        isOpenBanModal,
        setIsOpenBanModal,
        isOpenTimeoutModal,
        setIsOpenTimeoutModal,
        isOpenTipModal,
        setIsOpenTipModal
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
