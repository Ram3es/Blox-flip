import { FC, MouseEvent, ReactNode, memo, useState } from 'react'
import { useChat } from '../../store/ChatStore'

import { Link, useNavigate } from 'react-router-dom'
import { Menu } from '@headlessui/react'

import clsx from 'clsx'

import Image from '../base/Image'
import { UserLevel } from '../user/UserLevel'

import ArrowTriangleIcon from '../icons/ArrowTriangleIcon'
import BanIcon from '../icons/BanIcon'
import UserIcon from '../icons/UserIcon'
import TipIcon from '../icons/TipIcon'
import TimeoutIcon from '../icons/TimeoutIcon'

import type { IChatUser } from '../../types/User'
import { useAppStore } from '../../store/Store'
import { useSocketCtx } from '../../store/SocketStore'

interface userAction {
  name: string
  icon?: ReactNode
  path?: string
  handleFunction?: () => void
}

enum ChatUserCardVariant {
  Chat = 'Chat',
  Header = 'Header'
}

interface ChatUserCardProps {
  user: IChatUser
  hashMsg?: string
  variant?: keyof typeof ChatUserCardVariant
  dropDownPosition?: 'fixed' | 'float'
}

const ChatUserCard: FC<ChatUserCardProps> = ({ user, hashMsg, variant = 'Chat', dropDownPosition = 'fixed' }) => {
  const {
    setIsOpenBanModal,
    setIsOpenTimeoutModal,
    setIsOpenTipModal,
    setIsOpenTriviaModal,
    setUserSelected,
    setSelectedMessage
  } = useChat()

  const navigate = useNavigate()

  const { setTwoFactorAuthModal } = useSocketCtx()

  const { dispatch } = useAppStore()

  const [floatPosition, setFloatPosition] = useState<'bottom' | 'top'>('bottom')

  const ChatIconSizeClasses = 'w-3 h-3'

  const profileActions: userAction[] = [
    { path: '/profile', name: 'profile' },
    {
      handleFunction: () => {
        setTwoFactorAuthModal(true)
      },
      name: 'Set 2FA Key'
    },
    { path: '/affiliates', name: 'affiliates' },
    { path: '/leaderboard', name: 'leaderboard' },
    {
      handleFunction: () => {
        setIsOpenTriviaModal(true)
      },
      name: 'Trivia'
    },
    { handleFunction: () => console.log('chat gift'), name: 'Chat Gift' },
    { path: '/challenges', name: 'challenges' },
    { path: '/provably-fair', name: 'Provably Fair' },
    { path: '/FAQ', name: 'FAQ' },
    { path: '/terms', name: 'Terms of Service' },
    {
      handleFunction: () => {
        dispatch({ type: 'LOGOUT' })
        navigate('/', { replace: true })
        window.location.reload()
      },
      name: 'Logout'
    }
  ]

  const chatUserActions: userAction[] = [
    { path: '/profile', name: 'profile', icon: <UserIcon className={ChatIconSizeClasses} /> },
    {
      handleFunction: () => {
        setIsOpenTipModal(true)
      },
      name: 'Tip user',
      icon: <TipIcon className={ChatIconSizeClasses} />
    }
  ]

  const chatAdminActions: userAction[] = [
    { path: '/profile', name: 'Profile', icon: <UserIcon className={ChatIconSizeClasses} /> },
    {
      handleFunction: () => {
        setIsOpenTipModal(true)
        setUserSelected(user)
      },
      name: 'Tip user',
      icon: <TipIcon className={ChatIconSizeClasses} />
    },
    {
      handleFunction: () => {
        setIsOpenTimeoutModal(true)
        setUserSelected(user)
      },
      name: 'Timeout user',
      icon: <TimeoutIcon className={ChatIconSizeClasses} />
    },
    {
      handleFunction: () => {
        setIsOpenBanModal(true)
        setUserSelected(user)
      },
      name: 'Ban user',
      icon: <BanIcon className={ChatIconSizeClasses} />
    },
    {
      handleFunction: () => {
        setSelectedMessage(hashMsg as string)
      },
      name: 'Remove Message',
      icon: <BanIcon className={ChatIconSizeClasses} />
    }
    // {
    //   handleFunction: () => {
    //     setUserSelected(user)
    //   },
    //   name: 'Remove User',
    //   icon: <BanIcon className={ChatIconSizeClasses} />
    // }
  ]

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
        <Menu.Item key={action.name} onClick={action.handleFunction} as="div" className={itemClasses}>
          {action.icon && action.icon} {action.name}
        </Menu.Item>
      )
    }
  }

  const getCurrentActions =
    variant === ChatUserCardVariant.Header ? profileActions : user ? chatAdminActions : chatUserActions

  const handleCalculateDropdownPosition = (e: MouseEvent<HTMLElement>) => {
    if (dropDownPosition === 'fixed') {
      return
    }

    const innerHeight = window.innerHeight
    const clientY = e.clientY

    const diff = innerHeight - clientY

    setFloatPosition(diff < 350 ? 'top' : 'bottom')
  }

  return (
    <Menu>
      <Menu.Button id="button" onClick={handleCalculateDropdownPosition} as="div" className="w-full">
        {({ open }: { open: boolean }) => (
          <div className="flex items-center justify-between gap-1 mb-2 relative cursor-pointer">
            <div className="w-10 h-10 border border-blue-highlight rounded overflow-hidden radial--blue">
              <Image image={user.avatar} />
            </div>
            <div
              className={clsx('flex justify-between', {
                'mr-7': variant === ChatUserCardVariant.Chat
              })}
            >
              <span
                className={clsx('max-w-[100px] truncate font-bold mr-2', {
                  'text-gray-primary': variant === ChatUserCardVariant.Header,
                  'text-white': variant === ChatUserCardVariant.Chat
                })}
              >
                {user?.name || ''}
              </span>
              <UserLevel level={user?.level || 0} />
            </div>
            <div className="w-6 h-6 leading-6 bg-blue-accent shrink-0 rounded text-gray-secondary flex items-center justify-center">
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
          'top-8':
            dropDownPosition === 'fixed' ||
            (dropDownPosition === 'float' && floatPosition === 'bottom' && variant === ChatUserCardVariant.Chat),
          'bottom-28': dropDownPosition === 'float' && floatPosition === 'top' && variant === ChatUserCardVariant.Chat
        })}
        as="div"
      >
        <div
          className={clsx('relative p-2 border border-blue-highlight rounded  bg-blue-secondary', {
            'popup--corner-tr rounded-tr-none':
              dropDownPosition === 'fixed' || (dropDownPosition === 'float' && floatPosition === 'bottom'),
            'popup--corner-br rounded-br-none':
              dropDownPosition === 'float' && floatPosition === 'top' && variant === ChatUserCardVariant.Chat
          })}
        >
          {getCurrentActions.map((action) => renderActions(action))}
        </div>
      </Menu.Items>
    </Menu>
  )
}

export default memo(ChatUserCard)
