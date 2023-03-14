import { Menu } from '@headlessui/react'
import React, { FC } from 'react'
import { ISortOptions } from '../../types/sortOptions'
import { Button } from '../base/Button'
import TriangleArrow from '../icons/TriangleArrow'

interface ISortSelectProps {
  options: ISortOptions[]
  onSelect: Function
  currentOptions?: string
}

const SortSelect: FC<ISortSelectProps> = ({ options, currentOptions = 'Recomended', onSelect }) => {
  return (
    <div className='relative'>
        <Menu>
          {({ open }) => (<>
        <Menu.Button
            as={Button}
            className='flex items-center justify-center font-semibold py-2 px-2.5 leading-4 gap-1.5 group text-gray-primary rounded bg-blue-accent-secondary hover:bg-blue-accent border border-transparent'
          >
            <span className='shrink-0'>Filter by:</span>
            <span className='text-white min-w-[90px] mr-1'>{currentOptions}</span>
            <TriangleArrow iconClasses={open ? 'rotate-180' : '' } />
          </Menu.Button>
        <Menu.Items className='absolute left-0 right-0 top-full pt-2.5 z-40' as='div'>
          <div className='relative p-2 borders rounded rounded-tr-none bg-[#2F3656] popup--corner-tr-gray'>
            {options.map((variant, idx) => (
              <Menu.Item
                key={`${variant.title} - ${idx}`}
                as={Button}
                onClick={() => onSelect(variant)}
                className='text-start w-full capitalize block text-gray-primary text-13 py-1.5 leading-2 px-2.5 rounded bg-[#3C456B] hover:bg-blue-accent hover:text-white mb-1.5'
              >
                {variant.title}
              </Menu.Item>))}
          </div>
        </Menu.Items>
        </>)}
      </Menu>
      </div>
  )
}

export default SortSelect
