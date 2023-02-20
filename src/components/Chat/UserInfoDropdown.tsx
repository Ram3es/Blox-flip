import { FC } from 'react'
import { Menu } from '@headlessui/react'
import { Link } from 'react-router-dom'

import { RouteItem } from '../../types/routes'
import { ArrowGrayIcon } from '../ArrowGrayIcon/ArrowGrayIcon'

const baseRoutes: RouteItem[] = [
  { path: '/profile', name: 'profile' },
  { path: '/affiliates', name: 'affiliates' },
  { path: '/leaderboard', name: 'leaderboard' },
  { path: '/trivia', name: 'trivia' },
  { path: '/megadrop', name: 'megadrop' }
]

export const UserInfoDropdown: FC = () => {
  return (
    <Menu>
      <Menu.Button as='button'>
        <div className='bg-blue-accent w-6 h-6 shrink-0 rounded leading-6 text-center'>
          <ArrowGrayIcon />
        </div>
      </Menu.Button>
      <Menu.Items className='absolute left-0 right-0 top-full pt-2.5 z-40' as='div'>
        <div className='relative p-2 border border-blue-highlight rounded rounded-tr-none bg-blue-secondary popup--corner-tr'>
          {baseRoutes.map((route) => (
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
