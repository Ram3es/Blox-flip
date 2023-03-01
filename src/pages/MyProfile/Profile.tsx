
import React, { useState } from 'react'
import ButtonsToggle from '../../components/base/ButtonToggle'
import { QuantityCoins } from '../../components/common/QuantityCoins/QuantityCoins'
import DiamondIcon from '../../components/icons/DiamondIcon'
import ItemsIcon from '../../components/icons/ItemsIcon'
import UserProgress from '../../components/user/UserProgress'

const user = {
  name: 'John Johnson',
  avatar: '',
  level: 11,
  progress: {
    current: 50,
    required: 165
  }
}

const actions = [
  { name: 'wagered' },
  { name: 'withdrawn' },
  { name: 'deposited' },
  { name: 'profit' }

]

const cardsSorting = ['All', 'Active Items', 'Sold']
const Profile = () => {
  const [currentCardsVariant, setCurrentCardsVariant] = useState(cardsSorting[1])
  return (
    <>
    <div className='profile--box border border-blue-highlight rounded-lg mb-12 mt-18 md:mt-12 relative '>
      <div className="flex flex-col justify-center items-center mx-auto relative z-20 -mt-9 w-3/4 xs:w-3/5 md:w-1/3">
        <UserProgress user={user} />
      </div>
      <div className="flex flex-wrap pt-6 pb-2 px-2 border-t border-blue-highlight">
        {actions.map(action => (
          <div key={action.name} className="px-2 w-full xxs:w-1/2 md:w-auto grow shrink-0 mb-4 flex flex-col ">
            <div className="text-sm font-extrabold text-gray-primary mb-1.5 uppercase">{action.name}</div>
            <div className="gradient-blue-secondary flex items-center justify-center py-8 px-5 rounded-lg grow cursor-pointer hover:bg-blue-accent">
              <QuantityCoins
                quantity={1500}
                quantityClasses='flex items-center text-lg font-bold'>
                  <span className="w-8 h-8 shrink-0 text-center leading-8 bg-green-primary/20 rounded text-green-secondary relative mr-3">
                    <DiamondIcon className='w-[19px] h-[18px] -inset-full absolute m-auto' />
                  </span>
              </QuantityCoins>
              {/* <a href="#"className="flex items-center uppercase leading-7 text-xs font-bold gradient-green rounded shadow-green-35 px-1.5">
                <span className="w-4 shrink-0 mr-1.5">
                  <img src="img/diamond_white.svg" alt="" width="16" height="12" loading="lazy" decoding="async" />
                </span>
                claim
             </a> */}
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="flex flex-wrap justify-between border-b border-blue-accent-secondary mb-6 pb-2 items-center">
      <div className="flex flex-wrap items-center">
        <div className="text-gray-primary mr-2.5 font-bold text-base mb-2 flex items-center">
          <div className="w-4 mr-2 5 shrink-0">
            <ItemsIcon />
          </div>
          My Items
          </div>
          <div className="text-gray-primary mr-2.5 font-bold text-base mb-2">-</div>
          <div className="text-green-secondary mr-2.5 mb-2">3 SELECTED</div>
          <div className="flex items-center rounded mb-2 mr-2.5">
            <QuantityCoins
                quantity={1500}
                quantityClasses='flex items-center text-sm font-bold'>
                  <span className="w-6 h-6 text-center leading-6 bg-green-primary/20 rounded relative mr-1.5 text-green-secondary">
                    <DiamondIcon className='-inset-full absolute m-auto' />
                  </span>
            </QuantityCoins>
          </div>
          <a href="#" className="bg-green-primary hover:bg-green-500  border border-green-primary py-2 px-7 leading-4 rounded  mr-2.5">Sell items</a>
          <a href="#" className="block text-gray-primary text-13 font-semibold py-1.5 leading-2 px-4 text-center rounded bg-blue-highlight border  border-blue-highlight  hover:text-white">Withdraw</a>
          </div>
      <ButtonsToggle options={cardsSorting} currentSelect={currentCardsVariant} peackFunction={setCurrentCardsVariant} />
      {/* <ul className="flex flex-wrap -ml-1 -mr-1">
        <li className="group"><a href="#" className="block text-gray-primary text-13 py-1.5 leading-2 px-4 text-center rounded  mx-1 border mb-2 bg-blue-highlight border-blue-highlight group-[.is-active]:text-white hover:text-white group-[.is-active]:bg-blue-highlight/25">All</a></li>
        <li className="group is-active"><a href="#" className="block text-gray-primary text-13 py-1.5 leading-2 px-4 text-center rounded  mx-1 border mb-2 bg-blue-highlight border-blue-highlight group-[.is-active]:text-white hover:text-white group-[.is-active]:bg-blue-highlight/25">Active items</a></li>
        <li className="group"><a href="#" className="block text-gray-primary text-13 py-1.5 leading-2 px-4 text-center rounded  mx-1 border mb-2 bg-blue-highlight border-blue-highlight group-[.is-active]:text-white hover:text-white group-[.is-active]:bg-blue-highlight/25">Sold</a></li>
      </ul> */}
    </div>
    </>
  )
}

export default Profile
