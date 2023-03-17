import { Link, NavLink } from 'react-router-dom'
import { Menu } from '@headlessui/react'

import { DiamondIcon } from '../DiamondIcon/DiamondIcon'

import Logo from '../../assets/img/logo.png'
import HomeIcon from '../../assets/img/home_ico.svg'
import GamesIcon from '../../assets/img/games_ico.svg'
import ArrowWhiteIcon from '../../assets/img/arrow_white.svg'
import { RouteItem } from '../../types/routes'
import { useTranslation } from 'react-i18next'
import { Button } from '../Base/Button'
import { PlusIcon } from '../PlusIcon/PlusIcon'

const GamesButton = ({ title }: { title: string }) => {
  return (
    <div className='flex'>
      <img
        src={GamesIcon}
        alt=''
        width='17'
        height='11'
        loading='lazy'
        decoding='async'
        className='mr-2'
      />
      <span className='py-2 mr-2 font-bold hidden md:block'>{title}</span>
      <img src={ArrowWhiteIcon} alt='' width='7' height='4' loading='lazy' decoding='async' />
    </div>
  )
}

const UserWalletButton = () => {
  return (
    <div className='border border-green-primary bg-green-primary/15 group-hover:bg-green-primary/30 flex items-center p-1.5'>
      <span className='w-6 h-6 text-center leading-6 hidden xxs:block bg-green-primary/20 rounded relative mr-3 text-green-primary'>
        <DiamondIcon className='-inset-full absolute m-auto' width='14.2' height='14' />
      </span>
      <span className='font-bold text-sm whitespace-nowrap mr-7 hidden xs:block'>
        1,500<span className='text-white/50'>.00</span>
      </span>
      <span>
        <Button variant='Standard' color='GreenPrimary'>
          <span className='w-6 h-6 flex items-center justify-center'>
            <PlusIcon />
          </span>
        </Button>
      </span>
    </div>
  )
}

const routesGames: RouteItem[] = [
  { path: '/unboxing', name: 'cases' },
  { path: '/cups', name: 'cups' },
  { path: '/mines', name: 'mines' },
  { path: '/plinko', name: 'plinko' }
]

export const Header = () => {
  const { t } = useTranslation()
  return (
    <div className='mb-8 md:mb-12 pl-4 xs:pl-8 flex flex-wrap justify-between bg-blue-accent rounded-lg relative z-50'>
      <div className='flex items-center py-1 xs:py-2 md:py-4'>
        <Link to='/' className='mr-4 xs:mr-8 overflow-hidden w-[47px] xs:w-auto'>
          <img
            src={Logo}
            alt=''
            width='126'
            height='30'
            loading='lazy'
            decoding='async'
            className='min-w-[126px]'
          />
        </Link>
        <NavLink
          to='/'
          className='leading-10 mr-2.5 w-8 h-8 hidden xxs:flex xs:h-10 xs:w-10 shrink-0 rounded bg-blue-highlight hover:bg-blue-accent'
        >
          <img
            src={HomeIcon}
            alt=''
            width='17'
            height='14'
            loading='lazy'
            decoding='async'
            className='mx-auto'
          />
        </NavLink>
        <Menu
          as='div'
          className='px-3 flex flex-row items-center h-8 xs:h-10 text-13 rounded bg-lightblue-secondary hover:bg-lightblue-wave relative'
        >
          <Menu.Button>
            <GamesButton title={t('header.games')} />
          </Menu.Button>
          <Menu.Items
            as='div'
            className='absolute mx-auto max-w-xs -left-full -right-full top-full pt-2.5'
          >
            <div className='relative p-2 border border-blue-highlight rounded rounded-tr-none bg-blue-secondary'>
              {routesGames.map((route) => (
                <Menu.Item
                  as={NavLink}
                  to={route.path}
                  key={route.name}
                  className='block text-white text-13 py-1.5 leading-2 px-2.5 rounded bg-lightblue-secondary hover:bg-lightblue-wave mb-1.5 border border-blue-accent'
                >
                  {t(`common.games.${route.name}`)}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Menu>
      </div>
      <div className='flex flex-wrap items-center ml-auto'>
        <div className='flex items-center rounded text-11 font-extrabold leading-6 bg-green-aсcent/30 bg-opacity-25 pr-1.5 pl-2 ml-1 xs:ml-2 border border-green-primary border-opacity-30'>
          <span className='w-1.5 h-1.5 bg-green-primary rounded-full outline outline-3 outline-green-primary/25 mr-1.5'></span>
          1545
        </div>
        <Button
          variant='Gradient'
          color='GreenPrimary'
          className='diamond--highlight mr-2 xs:mr-6 ml-2 xs:ml-6'
        >
          <Link
            to='/deposit'
            className='text-xs flex-row flex items-center w-8 h-8 xs:h-9 xs:w-auto xs:px-2.5 font-bold gradient-green hover:bg-gradient-to-r hover:to-green-500 hover:from-green-500 rounded shadow-green-20'
          >
            <span className='w-4 shrink-0 mx-auto relative text-white'>
              <DiamondIcon width='16' height='12' />
            </span>
            <span className='hidden md:block ml-2.5'>{t('header.free')}</span>
          </Link>
        </Button>
        <div className=' p-2 xs:p-4 h-full flex flex-col justify-center rounded-r-lg bg-green-primary/15 relative'>
          <Menu>
            <Menu.Button as='div'>
              <UserWalletButton />
            </Menu.Button>
            <Menu.Items as='div' className='absolute w-full right-0 top-full pt-2.5'>
              <div className='relative min-w-fit p-2 border border-blue-highlight rounded rounded-tr-none bg-blue-secondary'>
                <Menu.Item
                  as={NavLink}
                  to='/deposit'
                  className='relative z-20 text-xs flex-row flex justify-center items-center h-8 px-2.5 leading-8 font-bold gradient-green hover:bg-gradient-to-r hover:to-green-500 hover:from-green-500 rounded shadow-green-20 mb-2'
                >
                  <span className='w-4 shrink-0 mr-2.5 flex text-white'>
                    <DiamondIcon width='15' height='13' />
                  </span>
                  <span>{t('common.deposit')}</span>
                </Menu.Item>
                <Menu.Item
                  as={NavLink}
                  to='/withdraw'
                  className='block text-gray-primary hover:text-white h-8 text-13 leading-8 px-2.5 rounded bg-blue-highlight hover:bg-blue-accent border border-blue-accent text-center'
                >
                  {t('common.withdraw')}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </div>
  )
}
