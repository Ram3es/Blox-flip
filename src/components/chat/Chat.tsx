import { useCallback, useState } from 'react'
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
    setIsOpenTriviaModal
  } = useChat()

  const handleShowChat = useCallback(() => {
    setShowChat(!showChat)
  }, [showChat])

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
          user={user}
          onClose={() => setIsOpenBanModal(false)}
          handleFunction={() => console.log('ban')}
        />
      )}
      {isOpenTimeoutModal && (
        <TimeoutModal
          user={user}
          onClose={() => setIsOpenTimeoutModal(false)}
          handleFunction={() => console.log('ban')}
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
        <TriviaModal
          onClose={() => setIsOpenTriviaModal(false)}
          isOpen={isOpenTriviaModal} />
      )}
    </>
  )
}
