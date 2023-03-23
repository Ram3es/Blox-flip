import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from '@headlessui/react'
import clsx from 'clsx'
import { RouteItem } from '../../types/Routes'
import { IUser } from '../../types/User'
import { ArrowGrayIcon } from '../icons/ArrowGrayIcon'
import { UserAvatar } from '../user/UserAvatar'
import { UserLevel } from '../user/UserLevel'

enum ChatUserCardVariant {
  Base = 'Base',
  Header = 'Header'
}

interface ChatUserCardProps extends Pick<IUser, 'name' | 'avatar' | 'level'> {
  routes: RouteItem[]
  variant?: keyof typeof ChatUserCardVariant
}

const ChatUserCard: FC<ChatUserCardProps> = ({ name, avatar, level, routes, variant = 'Base' }) => {
  return (
    <Menu>
      <Menu.Button as='div' className='w-full'>
        <div className='flex items-center justify-between mb-2 relative'>
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
              {name}
            </span>
            <UserLevel level={level} />
          </div>

          <div className='w-6 h-6 leading-6 bg-blue-accent shrink-0 rounded text-gray-secondary flex items-center justify-center'>
            <ArrowGrayIcon />
          </div>
        </div>
      </Menu.Button>
      <Menu.Items
        className={clsx('absolute left-0 right-0 pt-2.5 z-40', {
          'top-full': variant === ChatUserCardVariant.Header,
          'bottom-4': variant === ChatUserCardVariant.Base
        })}
        as='div'
      >
        <div className='relative p-2 border border-blue-highlight rounded rounded-tr-none bg-blue-secondary popup--corner-tr'>
          {routes.map((route) => (
            <Menu.Item
              key={route.name}
              as={Link}
              to={route.path}
              className='capitalize block text-gray-primary text-13 py-1.5 leading-2 px-2.5 rounded bg-blue-highlight hover:bg-blue-accent hover:text-white mb-1.5 border border-blue-accent'
            >
              {route.name}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  )
}

export default ChatUserCard
