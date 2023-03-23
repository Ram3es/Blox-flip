import { FC, useContext, useState } from 'react'
import clsx from 'clsx'
import { Context } from '../../store/Store'
import { RouteItem } from '../../types/Routes'

import { Button } from '../base/Button'
import SignInModal from '../containers/SignInModal.'
import ChatUserCard from './ChatUserCard'

export const ChatHeader: FC = () => {
  const [isOpenSignInModal, setIsOpenModal] = useState(false)
  const [state] = useContext(Context)

  const routes: RouteItem[] = [
    { path: '/profile', name: 'profile' },
    { path: '/affiliates', name: 'affiliates' },
    { path: '/leaderboard', name: 'leaderboard' },
    { path: '/trivia', name: 'trivia' },
    { path: '/megadrop', name: 'megadrop' }
  ]

  return (
    <>
      <div
        className={clsx(
          'cursor-pointer border border-blue-highlight rounded-lg radial--blue mb-8 relative z-30',
          {
            'px-3 pt-2': state.user,
            'px-2 py-3 flex items-center justify-center': !state.user
          }
        )}
      >
        {state.user
          ? (<ChatUserCard routes={routes} variant='Header' user={state.user} />)
          : (<Button color='GreenPrimary' variant='Gradient' onClick={() => setIsOpenModal(true)}><span className='px-24 py-2'>Login</span></Button>)
        }
      </div>
      <SignInModal isOpen={isOpenSignInModal} onClose={() => setIsOpenModal(false)} />
    </>
  )
}
