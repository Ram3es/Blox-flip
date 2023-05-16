import { FC, ReactNode, memo, useContext } from 'react'
import { Context } from '../../store/Store'
import { useChat } from '../../store/ChatStore'

import { Link } from 'react-router-dom'
import { Menu } from '@headlessui/react'

import clsx from 'clsx'

import Image from '../base/Image'
import { UserLevel } from '../user/UserLevel'

import ArrowTriangleIcon from '../icons/ArrowTriangleIcon'
import BanIcon from '../icons/BanIcon'
import UserIcon from '../icons/UserIcon'
import TipIcon from '../icons/TipIcon'
import TimeoutIcon from '../icons/TimeoutIcon'

import type { IUser } from '../../types/User'

interface userAction {
  name: string
  icon?: ReactNode
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
  const { setIsOpenBanModal, setIsOpenTimeoutModal, setIsOpenTipModal, setIsOpenTriviaModal } =
    useChat()

  const baseIconSizeClasses = 'w-3 h-3'

  const profileActions: userAction[] = [
    { path: '/profile', name: 'profile' },
    { path: '/affiliates', name: 'affiliates' },
    { path: '/leaderboard', name: 'leaderboard' },
    {
      handleFunction: () => {
        setIsOpenTriviaModal(true)
      },
      name: 'Trivia'
    },
    { path: '/megadrop', name: 'megadrop' },
    { path: '/challenges', name: 'challenges' },
    { path: '/FAQ', name: 'FAQ' },
    { path: '/terms', name: 'Terms of Service' }

  ]

  const chatUserActions: userAction[] = [
    { path: '/profile', name: 'profile', icon: <UserIcon className={baseIconSizeClasses} /> },
    {
      handleFunction: () => {
        setIsOpenTipModal(true)
      },
      name: 'Tip user',
      icon: <TipIcon className={baseIconSizeClasses} />
    }
  ]

  const chatAdminActions: userAction[] = [
    { path: '/profile', name: 'Profile', icon: <UserIcon className={baseIconSizeClasses} /> },
    {
      handleFunction: () => {
        setIsOpenTipModal(true)
      },
      name: 'Tip user',
      icon: <TipIcon className={baseIconSizeClasses} />
    },
    {
      handleFunction: () => {
        setIsOpenTimeoutModal(true)
      },
      name: 'Timeout user',
      icon: <TimeoutIcon className={baseIconSizeClasses} />
    },
    {
      handleFunction: () => {
        setIsOpenBanModal(true)
      },
      name: 'Ban user',
      icon: <BanIcon className={baseIconSizeClasses} />
    }
  ]

  const isAuth = () => state.user

  const renderActions = (action: userAction) => {
    const itemClasses =
      'flex items-center gap-2 capitalize block text-gray-primary text-13 py-1.5 leading-2 px-2.5 rounded bg-blue-highlight hover:bg-blue-accent hover:text-white mb-1.5 border border-blue-accent'

    if (action.path) {
      return (
        <Menu.Item
          key={action.name}
          as={Link}
          to={`${action.path}`}
          state={{ userId: user.id }}
          className={itemClasses}
        >
          {action.icon && action.icon} {action.name}
        </Menu.Item>
      )
    }
    if (action.handleFunction) {
      return (
        <Menu.Item
          key={action.name}
          onClick={action.handleFunction}
          as='div'
          className={itemClasses}
        >
          {action.icon && action.icon} {action.name}
        </Menu.Item>
      )
    }
  }

  const getCurrentActions =
    variant === ChatUserCardVariant.Header
      ? profileActions
      : isAuth()
        ? chatAdminActions
        : chatUserActions

  return (
    <Menu>
      <Menu.Button as='div' className='w-full'>
        {({ open }) => (
          <div className='flex items-center justify-between mb-2 relative cursor-pointer'>
            <div className='w-10 h-10 border border-blue-highlight rounded overflow-hidden radial--blue'>
              <Image />
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
              <ArrowTriangleIcon
                className={clsx('', {
                  'rotate-180': open
                })}
              />
            </div>
          </div>
        )}
      </Menu.Button>
      <Menu.Items
        className={clsx('absolute left-0 right-0 pt-2.5 z-40', {
          'top-full': variant === ChatUserCardVariant.Header,
          'top-8': variant === ChatUserCardVariant.Base
        })}
        as='div'
      >
        <div className='relative p-2 border border-blue-highlight rounded rounded-tr-none bg-blue-secondary popup--corner-tr'>
          {getCurrentActions.map((action) => renderActions(action))}
        </div>
      </Menu.Items>
    </Menu>
  )
}

export default memo(ChatUserCard)
