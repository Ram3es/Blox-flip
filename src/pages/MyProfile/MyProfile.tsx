
import clsx from 'clsx'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import IconProfile from '../../components/icons/IconProfile'
import Profile from './Profile'
// import Profile from './Profile'

const navTabs = [
  { name: 'My profile', path: '/profile' },
  { name: 'Transactions', path: 'transactions' },
  { name: 'History', path: 'history' }]

const MyProfile = () => {
  const { pathname } = useLocation()
  return (
      <div className='h-screen'>
        <div className='flex flex-wrap justify-between'>
          <div className="flex items-center text-base font-bold mr-2 mb-4 md:mb-0">
              <div className="shrink-0 w-4 mr-2.5 text-gray-primary">
                 <IconProfile />
              </div>
              Profile
          </div>
          <div className=''>
           {navTabs.map(tab => (
              <NavLink
                key={tab.path}
                to={tab.path}
                end
                className={ ({ isActive }) => clsx('inline-block capitalize text-13 py-2 leading-3 px-4 text-center rounded  mx-1 border hover:text-white',
                  {
                    'bg-blue-highlight/25 border-blue-light  text-white  cursor-default': isActive,
                    'text-gray-primary border-transparent  bg-blue-highlight': !isActive
                  }
                )}
              >{tab.name}</NavLink>))}
          </div>
        </div>
        {pathname === '/profile' ? <Profile /> : <Outlet/> }
      </div>
  )
}

export default MyProfile
