import { Menu } from '@headlessui/react'
import React, { FC } from 'react'
import { selectItem } from '../../constants/Sorting'
// import { Link } from 'react-router-dom'
import { Button } from '../base/Button'
import { DiamondIcon } from '../DiamondIcon/DiamondIcon'
import TriangleArrow from '../icons/TriangleArrow'

interface IGreenSelectProps {
  onSelect: Function
  selectClasses?: string
}

const GreenTipSelect: FC<IGreenSelectProps> = ({ onSelect, selectClasses }) => {
  return (
    <div className={selectClasses ?? 'h-fit relative'}>
    <Menu>
      {({ open }) => (<>
    <Menu.Button
      as={Button}
      className='relative rounded border text-green-secondary bg-green-primary/15 hover:bg-green-primary/30 border-green-primary flex items-center justify-between whitespace-nowrap py-1 px-1.5 cursor-pointer '
      >
        <span className="w-6 h-6 text-center leading-6 bg-green-primary/20 rounded relative mr-1.5 text-green-secondary">
            <DiamondIcon className='-inset-full absolute m-auto' />
        </span>
        <span className=' min-w-[80px] mr-2'>Price range</span>
        <TriangleArrow iconClasses={open ? 'rotate-180' : '' } />
    </Menu.Button>
    <Menu.Items className=' absolute z-40 right-0 top-full pt-2.5' as='div'>
      <div className='relative p-2 rounded popup--bg-green  whitespace-normal popup--corner-tr-green'>
        {selectItem.map((variant) => (
          <Menu.Item
            key={variant.title}
            as={Button}
            onClick={() => onSelect(variant)}
            className='flex items-center text-start w-[125px] capitalize text-white text-13 py-1 px-1.5 leading-2  rounded bg-[#213941] hover:bg-[#213941]/60 mb-1.5 '
          >
            <span className="w-6 h-6 shrink-0 text-center leading-8 bg-[#235D4A] rounded text-green-secondary relative mr-2 ">
              <DiamondIcon className=' -inset-full absolute m-auto' />
            </span>
            {variant.title}
          </Menu.Item>
        ))}
      </div>
    </Menu.Items>
    </>)}
  </Menu>
  </div>
  )
}

export default GreenTipSelect
