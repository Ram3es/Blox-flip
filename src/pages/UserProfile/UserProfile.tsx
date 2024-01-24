
import clsx from 'clsx'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import IconProfile from '../../components/icons/IconProfile'
import Profile from './Profile'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../../store/Store'
import RedirectIcon from '../../components/icons/RedirectIcon'
import { useSocketCtx } from '../../store/SocketStore'
import { Button } from '../../components/base/Button'

interface INavTab {
  name: string
  path: string
  icon?: string | JSX.Element
}

const profileTabs: Record<string, { title: string, tabs: INavTab[] } > = {
  userProfile: {
    title: 'UserProfile',
    tabs: [
      { name: 'Roblox Profile', path: 'https://www.roblox.com/', icon: <RedirectIcon /> }
    ]
  },
  ownProfile: {
    title: 'Profile',
    tabs: [
      { name: 'My profile', path: '/profile' },
      { name: 'Transactions', path: 'transactions' },
      { name: 'History', path: 'history' }]

  }
}

const UserProfile = () => {
  const [varinatProfile, setVariantProfile] = useState<string>('ownProfile')
  const { pathname, state } = useLocation()

  const { state: { user } } = useContext(Context)
  const { isShownLinkinRobloxBtn, setIsShownRobloxModal } = useSocketCtx()

  useEffect(() => {
    if (state?.userId === user?.id) {
      setVariantProfile('ownProfile')
    } else {
      setVariantProfile('userProfile')
    }
  }, [state])

  return (
      <>
        <div className='flex flex-wrap justify-between'>
          <div className="flex items-center text-base font-bold mr-2 mb-4 md:mb-0">
              <div className="shrink-0 w-4 mr-2.5 text-gray-primary">
                 <IconProfile />
              </div>
             {profileTabs[varinatProfile].title}
          </div>
          <div className='flex flex-col-reverse sm:flex-row items-center'>
            {isShownLinkinRobloxBtn &&
             varinatProfile === 'ownProfile' &&
             <Button
               className='self-start xxs:self-end sm:self-auto mt-4 sm:mt-0 capitalize text-13 py-2 leading-3 px-4 text-center rounded  mx-1 border hover:text-white text-gray-primary border-transparent bg-blue-highlight'
               onClick={() => setIsShownRobloxModal(true)}
             >
              Link Roblox Account
             </Button>}
             <div className='flex'>
            {profileTabs[varinatProfile].tabs.map(tab => (
              <NavLink
                key={tab.path}
                to={tab.path}
                state={{ userId: user?.id }}
                end
                className={ ({ isActive }) => clsx('inline-block capitalize text-13 py-2 leading-3 px-4 text-center rounded  mx-1 border hover:text-white',
                  {
                    'bg-blue-highlight/25 border-blue-light  text-white  cursor-default': isActive,
                    'text-gray-primary border-transparent  bg-blue-highlight': !isActive
                  }
                )}
              >
                <div className='flex items-center'>
                  {tab?.icon && <span className='mr-2'>{tab?.icon}</span> }
                  <span>{tab.name}</span>
                </div>
              </NavLink>))}
              </div>
          </div>
        </div>
          {pathname === '/profile' ? <Profile isOwnProfile={state?.userId === user?.id} /> : <Outlet/> }
      </>
  )
}

export default UserProfile
