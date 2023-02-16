import { Link, NavLink } from 'react-router-dom'

import { DiamondGreenIcon } from '../DiamondGreenIcon/DiamondGreenIcon'
import { DiamondWhiteIcon } from '../DiamondWhiteIcon/DiamondWhiteIcon'

import logo from '../../assets/img/logo.png'
import plusIcon from '../../assets/img/plus_ico.svg'
import homeIcon from '../../assets/img/home_ico.svg'
import gamesIcon from '../../assets/img/games_ico.svg'
import arrowWhite from '../../assets/img/arrow_white.svg'

export const Header = () => {
  return (
    <div className='mb-8 md:mb-12 pl-4 xs:pl-8 flex flex-wrap justify-between bg-blue-accent rounded-lg relative z-50'>
      <div className='flex items-center py-1 xs:py-2 md:py-4'>
        <Link to='/' className='mr-4 xs:mr-8 overflow-hidden w-[47px] xs:w-auto'>
          <img
            src={logo}
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
            src={homeIcon}
            alt=''
            width='17'
            height='14'
            loading='lazy'
            decoding='async'
            className='mx-auto'
          />
        </NavLink>
        <div className='px-3 flex flex-row items-center h-8 xs:h-10 text-13 rounded bg-lightblue-secondary hover:bg-lightblue-wave relative'>
          <img
            src={gamesIcon}
            alt=''
            width='17'
            height='11'
            loading='lazy'
            decoding='async'
            className='mr-2'
          />
          <span className='py-2 mr-2 font-bold hidden md:block'>Games</span>
          <img src={arrowWhite} alt='' width='7' height='4' loading='lazy' decoding='async' />
          <div className='absolute mx-auto max-w-xs -left-full -right-full top-full pt-2.5 popup'>
            <div className='relative p-2 border border-blue-highlight rounded rounded-tr-none bg-blue-secondary popup--corner-tc'>
            <NavLink
                to='/cases'
                className='block text-white text-13 py-1.5 leading-2 px-2.5 rounded bg-lightblue-secondary hover:bg-lightblue-wave mb-1.5 border border-blue-accent'
              >
                Cases
              </NavLink>
              <NavLink
                to='/cups'
                className='block text-white text-13 py-1.5 leading-2 px-2.5 rounded bg-lightblue-secondary hover:bg-lightblue-wave mb-1.5 border border-blue-accent'
              >
                Cups
              </NavLink>
              <NavLink
                to='/mines'
                className='block text-white text-13 py-1.5 leading-2 px-2.5 rounded bg-lightblue-secondary hover:bg-lightblue-wave mb-1.5 border border-blue-accent'
              >
                Mines
              </NavLink>
              <NavLink
                to='/plinko'
                className='block text-white text-13 py-1.5 leading-2 px-2.5 rounded bg-lightblue-secondary hover:bg-lightblue-wave mb-1.5 border border-blue-accent'
              >
                Plinko
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-wrap items-center ml-auto'>
        <div className='flex items-center rounded text-11 font-extrabold leading-6 bg-green-aсcent/30 bg-opacity-25 pr-1.5 pl-2 ml-1 xs:ml-2 border border-green-primary border-opacity-30'>
          <span className='w-1.5 h-1.5 bg-green-primary rounded-full outline outline-3 outline-green-primary/25 mr-1.5'></span>
          1545
        </div>
        <div className='diamond--highlight mr-2 xs:mr-6 ml-2 xs:ml-6'>
          <a
            href='#'
            className='text-xs flex-row flex items-center w-8 h-8 xs:h-9 xs:w-auto xs:px-2.5 font-bold gradient-green hover:bg-gradient-to-r hover:to-green-500 hover:from-green-500 rounded shadow-green-20'
          >
            <span className='w-4 shrink-0 mx-auto'>
              <DiamondWhiteIcon />
            </span>
            <span className='hidden md:block ml-2.5'>Free Diamonds</span>
          </a>
        </div>
        <div className='group p-2 xs:p-4 h-full flex flex-col justify-center rounded-r-lg bg-green-primary/15 relative'>
          <a
            href='#'
            className='border border-green-primary bg-green-primary/15 group-hover:bg-green-primary/30 flex items-center p-1.5'
          >
            <DiamondGreenIcon />
            <span className='font-bold text-sm whitespace-nowrap mr-7 hidden xs:block'>
              1,500<span className='text-white/50'>.00</span>
            </span>
            <span className='w-6 h-6 text-center leading-6 bg-green-primary rounded relative'>
              <img
                src={plusIcon}
                alt=''
                width='11'
                height='11'
                loading='lazy'
                decoding='async'
                className='-inset-full absolute m-auto'
              />
            </span>
          </a>
          <div className='absolute w-full right-0 top-full pt-2.5 popup'>
            <div className='relative min-w-fit p-2 border border-blue-highlight rounded rounded-tr-none bg-blue-secondary popup--corner-tc'>
              <a
                href='#'
                className='relative z-20 text-xs flex-row flex justify-center items-center h-8 px-2.5 leading-8 font-bold gradient-green hover:bg-gradient-to-r hover:to-green-500 hover:from-green-500 rounded shadow-green-20 mb-2'
              >
                <span className='w-4 shrink-0 mr-2.5'>
                  <DiamondWhiteIcon />
                </span>
                <span>Deposit</span>
              </a>
              <a
                href='#'
                className='block text-gray-primary hover:text-white h-8 text-13 leading-8 px-2.5 rounded bg-blue-highlight hover:bg-blue-accent border border-blue-accent text-center'
              >
                Withdraw
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
