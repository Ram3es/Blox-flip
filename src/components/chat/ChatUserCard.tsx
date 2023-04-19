import { FC, useContext } from 'react'
import { useChat } from '../../store/ChatStore'

import { Link } from 'react-router-dom'
import { Menu } from '@headlessui/react'

import clsx from 'clsx'

import { UserAvatar } from '../user/UserAvatar'
import { UserLevel } from '../user/UserLevel'

import { ArrowGrayIcon } from '../icons/ArrowGrayIcon'

import type { IUser } from '../../types/User'
import { Context } from '../../store/Store'

interface userAction {
  name: string
  path?: string
  handleFunction?: () => void
}

enum ChatUserCardVariant {
  Base = 'Base',
  Header = 'Header'
}

interface ChatUserCardProps {
  user: IUser
  variant?: keyof typeof ChatUserCardVariant
}

const ChatUserCard: FC<ChatUserCardProps> = ({ user, variant = 'Base' }) => {
  const { state } = useContext(Context)
  const { setIsOpenBanModal, setIsOpenTimeoutModal, setIsOpenTipModal } = useChat()

  const profileActions: userAction[] = [
    { path: '/profile', name: 'profile' },
    { path: '/affiliates', name: 'affiliates' },
    { path: '/leaderboard', name: 'leaderboard' },
    { path: '/trivia', name: 'trivia' },
    { path: '/megadrop', name: 'megadrop' }
  ]

  const chatUserActions: userAction[] = [
    { path: '/profile', name: 'profile' },
    {
      handleFunction: () => {
        console.log('aga')
        setIsOpenTipModal(true)
      },
      name: 'Tip user'
    }
  ]

  const chatAdminActions: userAction[] = [
    { path: '/profile', name: 'Profile' },
    {
      handleFunction: () => {
        console.log('aga')
        setIsOpenTipModal(true)
      },
      name: 'Tip user'
    },
    {
      handleFunction: () => {
        setIsOpenTimeoutModal(true)
      },
      name: 'Timeout user'
    },
    {
      handleFunction: () => {
        setIsOpenBanModal(true)
      },
      name: 'Ban user'
    }
  ]

  const isAuth = () => state.user

  const renderMenuItem = (action: userAction) => {
    if (action.path) {
      return (
        <Menu.Item
          key={action.name}
          as={Link}
          to={`${action.path}`}
          state={{ userId: user.id }}
          className='capitalize block text-gray-primary text-13 py-1.5 leading-2 px-2.5 rounded bg-blue-highlight hover:bg-blue-accent hover:text-white mb-1.5 border border-blue-accent'
        >
          {action.name}
        </Menu.Item>
      )
    }
    if (action.handleFunction) {
      return (
        <Menu.Item
          key={action.name}
          onClick={action.handleFunction}
          as='div'
          className='capitalize block text-gray-primary text-13 py-1.5 leading-2 px-2.5 rounded bg-blue-highlight hover:bg-blue-accent hover:text-white mb-1.5 border border-blue-accent'
        >
          {action.name}
        </Menu.Item>
      )
    }
  }

  const actions =
    variant === ChatUserCardVariant.Header
      ? profileActions
      : isAuth()
        ? chatAdminActions
        : chatUserActions

  return (
    <Menu>
      <Menu.Button as='div' className='w-full'>
        <div className='flex items-center justify-between mb-2 relative cursor-pointer'>
          <div className='w-10 h-10 border border-blue-highlight rounded overflow-hidden radial--blue'>
            <UserAvatar />
          </div>
          <div
            className={clsx('flex', {
              'mr-7': variant === ChatUserCardVariant.Base
            })}
          >
            <span
              className={clsx('font-bold mr-2', {
                'text-gray-primary': variant === ChatUserCardVariant.Header,
                'text-white': variant === ChatUserCardVariant.Base
              })}
            >
              {user ? user.name : ''}
            </span>
            <UserLevel level={user ? user.level : 0} />
          </div>

          <div className='w-6 h-6 leading-6 bg-blue-accent shrink-0 rounded text-gray-secondary flex items-center justify-center'>
            <ArrowGrayIcon />
          </div>
        </div>
      </Menu.Button>
      <Menu.Items
        className={clsx('absolute left-0 right-0 pt-2.5 z-40', {
          'top-full': variant === ChatUserCardVariant.Header,
          'top-8': variant === ChatUserCardVariant.Base
        })}
        as='div'
      >
        <div className='relative p-2 border border-blue-highlight rounded rounded-tr-none bg-blue-secondary popup--corner-tr'>
          {actions.map((route) => renderMenuItem(route))}
        </div>
      </Menu.Items>
    </Menu>
  )
}

export default ChatUserCard
