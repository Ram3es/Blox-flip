import { Outlet, useLocation, useNavigate } from 'react-router'

import { Button } from '../../components/base/Button'
import { WithdrawList } from './WithdrawList'

import { IWithdrawMethod } from '../../types/Withdraw'

import ArrowTriangleIcon from '../../components/icons/ArrowTriangleIcon'
import DiamondIcon from '../../components/icons/DiamondIcon'
import MoneyIcon from '../../assets/img/deposit2_small.png'
import RobuxIcon from '../../assets/img/deposit2.png'
import RobloxIcon from '../../assets/img/deposit1.png'

const CurrentLink = ({ path }: { path: string }) => {
  return (
    <div className='flex flex-wrap xxs:flex-nowrap items-center xs:text-base mb-4'>
      <span className='mr-3 font-semibold'>You have selected</span>
      <span className='bg-blue-accent-secondary text-gray-primary font-semibold py-1 px-3 rounded flex items-center capitalize'>
        <span className='min-w-fit mr-2'>
          <img src={MoneyIcon} alt='' width='31' height='19' loading='lazy' decoding='async' />
        </span>
        {path}
      </span>
    </div>
  )
}

export const WithdrawLayout = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const withdrawMethodsVariants: IWithdrawMethod[] = [
    { link: 'robux', icon: RobuxIcon },
    { link: 'roblox-limiteds', icon: RobloxIcon }
  ]

  return (
    <div className='max-w-1190 w-full mx-auto'>
      <div className='flex flex-wrap items-center justify-between mb-4'>
        <Button
          onClick={() => navigate(-1)}
          className='rounded p-2 leading-4 text-gray-primary font-semibold flex items-center bg-blue-accent-secondary hover:bg-blue-accent hover:text-white mb-4 mr-6'
        >
          <span className='mr-1.5 rotate-90 text-gray-primary hover:text-white'>
            <ArrowTriangleIcon />
          </span>
          Back
        </Button>
        <div className='flex grow items-center mb-4'>
          <div className='min-w-fit mr-3'>
            <span className='text-green-primary'>
              <DiamondIcon className='w-[28px] h-[24px]' />
            </span>
          </div>
          <span className='text-2xl font-bold'>Withdraw</span>
        </div>
        {pathname === '/withdraw' ? <></> : <CurrentLink path={pathname.split('/').pop() ?? ''} />}
      </div>
      <div className='max-w-1190 w-full m-auto'>
        <div className='border-t border-b border-t-sky-primary/40 border-b-sky-primary/40 rounded mb-9'>
          <div className='border--mask border--radial-blue  bg-gradient-radial from-blue-light-secondary/20 to-blue-accent-secondary/0 rounded text-sm p-5 xs:p-9 overflow-hidden relative'>
            {pathname === '/withdraw'
              ? (<WithdrawList list={withdrawMethodsVariants} />)
              : (<Outlet />)}
          </div>
        </div>
      </div>
    </div>
  )
}
