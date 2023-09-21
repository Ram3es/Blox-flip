import { useCallback, useEffect, useState } from 'react'
import { useChat } from '../../store/ChatStore'

import clsx from 'clsx'

import BanModal from '../containers/AdminModals/BanModal'
import TimeoutModal from '../containers/AdminModals/TimeoutModal'
import TipModal from '../containers/AdminModals/TipModal'

import { ChatHeader } from './ChatHeader'
import { ChatTools } from './ChatTools'
import { ChatMessageList } from './ChatMessagesList'
import { ChatMessageInput } from './ChatMessageInput'
import { ChatFab } from './ChatFab'

import TriviaModal from '../containers/TriviaModal'
import { IChatUser } from '../../types/User'
import { useSocketCtx } from '../../store/SocketStore'
import { IBanUser } from '../../types/Chat'
import Rain from './Rain'

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

  const { socket } = useSocketCtx()

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
    'bg-blue-primary w-72 h-screen flex flex-col fixed -right-full top-0 bottom-0 z-100 sm:z-40 ease-out duration-300 chatJs',
    {
      'sm:right-0': !showChat,
      'right-0': showChat
    }
  )

  return (
    <>
      <div className={chatClasses}>
        <div className='p-4 grow flex flex-col'>
          <ChatHeader />
          <ChatTools />
          <ChatMessageList />
        </div>
        <Rain />
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
      {isOpenTipModal && selectedUser && (
        <TipModal
          user={selectedUser}
          handleFunction={() => setIsOpenTipModal((prev) => !prev)}
        />
      )}
      {isOpenTriviaModal && (
        <TriviaModal onClose={() => setIsOpenTriviaModal(false)} isOpen={isOpenTriviaModal} />
      )}
    </>
  )
}
