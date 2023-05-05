import { Link, NavLink } from 'react-router-dom'
import { Menu } from '@headlessui/react'

import DiamondIcon from '../icons/DiamondIcon'

import Logo from '../../assets/img/logo.png'
import HomeIcon from '../../assets/img/home_ico.svg'
import GamesIcon from '../../assets/img/games_ico.svg'
import { RouteItem } from '../../types/Routes'
import { useTranslation } from 'react-i18next'
import { Button } from '../base/Button'
import { PlusIcon } from '../icons/PlusIcon'
import ArrowTriangleIcon from '../icons/ArrowTriangleIcon'
import CoinsWithDiamond from '../common/CoinsWithDiamond'

const routesGames: RouteItem[] = [
  { path: '/unboxing', name: 'cases' },
  { path: '/battles-lobby', name: 'caseBattles' },
  { path: '/coinflip', name: 'coinflip' },
  { path: '/jackpot', name: 'jackpot' },
  { path: '/plinko', name: 'plinko' },
  { path: '/wheel', name: 'wheel' },
  { path: '/king', name: 'king' },
  { path: '/challenges', name: 'challenges' }
]

export const Header = () => {
  const { t } = useTranslation()
  return (
    <div className='mb-8 md:mb-12 pl-4 xs:pl-8 flex flex-wrap justify-between bg-blue-accent rounded-lg relative'>
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
          <Menu.Button as={Button}>
            {({ open }) => (
              <>
                <img
                  src={GamesIcon}
                  alt=''
                  width='17'
                  height='11'
                  loading='lazy'
                  decoding='async'
                  className='mr-2'
                />
                <span className='py-2 mr-2 font-bold hidden md:block'>{t('header.games')}</span>
                <span
                  className={`w-2 h-1 flex items-center justify-center ${open ? 'rotate-180' : ''}`}
                >
                  <ArrowTriangleIcon />
                </span>
              </>
            )}
          </Menu.Button>
          <Menu.Items
            as='div'
            className='absolute mx-auto max-w-xs -left-full -right-full top-full pt-2.5 z-50'
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
        <div className='flex items-center rounded text-11 font-extrabold leading-6 bg-green-accent/30 bg-opacity-25 pr-1.5 pl-2 ml-1 xs:ml-2 border border-green-primary border-opacity-30'>
          <span className='w-1.5 h-1.5 bg-green-primary rounded-full outline outline-3 outline-green-primary/25 mr-1.5'></span>
          1545
        </div>
        <Button
          variant='GreenGradient'
          color='GreenPrimary'
          className='diamond--highlight mr-2 xs:mr-6 ml-2 xs:ml-6'
        >
          <Link
            to='/deposit'
            className='text-xs flex-row flex items-center w-8 h-8 xs:h-9 xs:w-auto xs:px-2.5 font-bold gradient-green hover:bg-gradient-to-r hover:to-green-500 hover:from-green-500 rounded shadow-green-20'
          >
            <span className='w-4 shrink-0 mx-auto relative text-white'>
              <DiamondIcon className='w-[16px] h-[12px]' />
            </span>
            <span className='hidden md:block ml-2.5'>{t('header.free')}</span>
          </Link>
        </Button>
        <div className='p-2 xs:p-4 h-full flex flex-col justify-center rounded-r-lg bg-green-primary/15 relative'>
          <Menu>
            <Menu.Button as={Button} variant='GreenOutlined'>
              <div className='px-1.5 xs:pr-1.5 py-1.5 flex items-center justify-center xs:justify-between'>
                <div className='hidden xs:block'>
                  <CoinsWithDiamond containerSize='Small' typographyQuantity={1500} />
                </div>
                <div className='bg-green-primary flex items-center rounded'>
                  <span className='w-6 h-6 flex items-center justify-center text-white'>
                    <PlusIcon />
                  </span>
                </div>
              </div>
            </Menu.Button>
            <Menu.Items as='div' className='absolute xs:w-full right-0 top-full pt-2.5 z-50'>
              <div className='relative min-w-fit p-2 border border-blue-highlight rounded rounded-tr-none bg-blue-secondary'>
                <Menu.Item
                  as={NavLink}
                  to='/deposit'
                  className='relative z-20 text-xs flex-row flex justify-center items-center h-8 px-2.5 leading-8 font-bold gradient-green hover:bg-gradient-to-r hover:to-green-500 hover:from-green-500 rounded shadow-green-20 mb-2'
                >
                  <span className='w-4 shrink-0 mr-2.5 flex text-white'>
                    <DiamondIcon className='w-[15px] h-[13px]' />
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
