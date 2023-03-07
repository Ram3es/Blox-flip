import { Menu } from '@headlessui/react'
import React, { FC } from 'react'
// import { Link } from 'react-router-dom'
import { Button } from '../base/Button'
import { DiamondIcon } from '../DiamondIcon/DiamondIcon'
import TriangleArrow from '../icons/TriangleArrow'

interface IGreenSelectProps {
  onSelect: Function
}

const selectItem = [{ title: 'Tip Rain Tip RainTip Rain', value: '77777' }, { title: 'Tip Rain', value: '5555' }]

const GreenTipSelect: FC<IGreenSelectProps> = ({ onSelect }) => {
  return (
    <div className='h-fit relative mb-8 xss:mb-0'>
    <Menu>
    <Menu.Button
      as={Button}
      className='relative rounded border text-green-secondary bg-green-primary/15 hover:bg-green-primary/30 border-green-primary flex items-center justify-between whitespace-nowrap py-1 px-1.5 cursor-pointer '
      >
        <span className="w-6 h-6 text-center leading-6 bg-green-primary/20 rounded relative mr-1.5 text-green-secondary">
            <DiamondIcon className='-inset-full absolute m-auto' />
        </span>
        <span className=' min-w-[80px] mr-2'>Price range</span>
        <TriangleArrow />
    </Menu.Button>
    <Menu.Items className=' absolute z-40 right-0 top-full pt-2.5' as='div'>
      <div className='relative p-2 border border-green-primary rounded popup--bg-green  whitespace-normal popup--corner-tl'>
        {selectItem.map((variant) => (
          <Menu.Item
            key={variant.value}
            as={Button}
            onClick={() => onSelect(variant)}
            className='mb-1 block text-green-secondary text-left hover:text-white px-2 py-1'
          >
            {variant.title}
          </Menu.Item>
        ))}
      </div>
    </Menu.Items>
  </Menu>
  </div>
  )
}

export default GreenTipSelect
