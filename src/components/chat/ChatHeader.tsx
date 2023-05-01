import { FC, useContext, useState } from 'react'
import { Context } from '../../store/Store'

import clsx from 'clsx'

import SignInModal from '../containers/SignInModal'
import ChatUserCard from './ChatUserCard'
import { Button } from '../base/Button'

export const ChatHeader: FC = () => {
  const [isOpenSignInModal, setIsOpenModal] = useState(false)
  const { state } = useContext(Context)

  return (
    <>
      <div
        className={clsx('border border-blue-highlight rounded-lg radial--blue mb-8 relative z-30', {
          'px-3 pt-2': state.user,
          'px-2 py-3 flex items-center justify-center': !state.user
        })}
      >
        {state.user && <ChatUserCard variant='Header' user={state.user} />}
        {!state.user && (
          <Button color='GreenPrimary' variant='GreenGradient' onClick={() => setIsOpenModal(true)}>
            <span className='px-24 py-2'>Login</span>
          </Button>
        )}
      </div>
      <SignInModal isOpen={isOpenSignInModal} onClose={() => setIsOpenModal(false)} />
    </>
  )
}
