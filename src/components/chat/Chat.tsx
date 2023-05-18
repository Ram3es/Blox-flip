import { useCallback, useEffect, useState } from 'react'
import { useChat } from '../../store/ChatStore'

import clsx from 'clsx'

import BanModal from '../containers/Action/BanModal'
import TimeoutModal from '../containers/Action/TimeoutModal'
import TipModal from '../containers/Action/TipModal'

import { ChatHeader } from './ChatHeader'
import { ChatTools } from './ChatTools'
import { ChatMessageList } from './ChatMessagesList'
import { ChatMessageInput } from './ChatMessageInput'
import { ChatFab } from './ChatFab'

import { user } from '../../mocks'
import TriviaModal from '../containers/TriviaModal'
import { IChatUser } from '../../types/User'
import { useChatSocketCtx } from '../../store/SocketStore'
import { IBanUser } from '../../types/Chat'

export const Chat = () => {
  const [showChat, setShowChat] = useState(false)
  const {
    isOpenBanModal,
    setIsOpenBanModal,
    isOpenTimeoutModal,
    setIsOpenTimeoutModal,
    isOpenTipModal,
    setIsOpenTipModal,
    isOpenTriviaModal,
    setIsOpenTriviaModal,
    selectedUser,
    selectedMessage
  } = useChat()

  const { socket } = useChatSocketCtx()

  const handleShowChat = useCallback(() => {
    setShowChat(!showChat)
  }, [showChat])

  const handleBanSubmit = (banUser: IBanUser) => {
    socket.emit('ban', banUser, (res: any) => {
      alert(JSON.stringify(res, null, 2))
    })
  }
  const handleTimeoutSubmit = (banUser: IBanUser) => {
    socket.emit('mute', banUser, (res: any) => {
      alert(JSON.stringify(res, null, 2))
    })
  }

  useEffect(() => {
    selectedMessage && socket.emit('remove_chat', selectedMessage, (res: any) => {
      alert(JSON.stringify(res, null, 2))
    })
  }, [selectedMessage])

  const chatClasses = clsx(
    'bg-blue-primary w-72 p-4 h-screen flex flex-col fixed -right-full top-0 bottom-0 z-100 sm:z-40 ease-out duration-300 chatJs',
    {
      'sm:right-0': !showChat,
      'right-0': showChat
    }
  )

  return (
    <>
      <div className={chatClasses}>
        <ChatHeader />
        <ChatTools />
        <ChatMessageList />
        <ChatMessageInput />
      </div>
      <ChatFab onClick={handleShowChat} active={showChat} />
      {isOpenBanModal && (
        <BanModal
          user={selectedUser as IChatUser}
          onClose={() => setIsOpenBanModal(false)}
          handleFunction={handleBanSubmit}
        />
      )}
      {isOpenTimeoutModal && (
        <TimeoutModal
          user={selectedUser as IChatUser}
          onClose={() => setIsOpenTimeoutModal(false)}
          handleFunction={handleTimeoutSubmit}
        />
      )}
      {isOpenTipModal && (
        <TipModal
          user={user}
          onClose={() => setIsOpenTipModal(false)}
          handleFunction={() => console.log('ban')}
        />
      )}
      {isOpenTriviaModal && (
        <TriviaModal onClose={() => setIsOpenTriviaModal(false)} isOpen={isOpenTriviaModal} />
      )}
    </>
  )
}
