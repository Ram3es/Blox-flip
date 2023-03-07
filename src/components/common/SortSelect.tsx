import { Menu } from '@headlessui/react'
import React, { FC } from 'react'
import { ISortOptions } from '../../types/sortOptions'
import { Button } from '../base/Button'
import TriangleArrow from '../icons/TriangleArrow'

interface ISortSelectProps {
  options: ISortOptions[]
  onSelect: Function
  currentOptions: ISortOptions
}

const SortSelect: FC<ISortSelectProps> = ({ options, currentOptions, onSelect }) => {
  return (
        <Menu>
        <Menu.Button
            as={Button}
            className='flex items-center justify-center font-semibold py-2 px-2.5 leading-4 gap-1.5 group text-gray-primary rounded bg-blue-accent-secondary hover:bg-blue-accent border border-transparent'
          >
            <span className='shrink-0'>Filter by:</span>
            <span className='text-white min-w-[80px] mr-1'>{currentOptions.title}</span>
            <TriangleArrow />
          </Menu.Button>
        <Menu.Items className='absolute left-0 right-0 top-full pt-2.5 z-40' as='div'>
          <div className='relative p-2 border border-blue-highlight rounded rounded-tr-none bg-blue-secondary popup--corner-tc'>
            {options.map((variant) => (
              <Menu.Item
                key={variant.direction}
                as={Button}
                onClick={() => onSelect(variant)}
                className='w-full capitalize block text-gray-primary text-13 py-1.5 leading-2 px-2.5 rounded bg-blue-highlight hover:bg-blue-accent hover:text-white mb-1.5 border border-blue-accent'
              >
                {variant.title}
              </Menu.Item>))}
          </div>
        </Menu.Items>
      </Menu>
  )
}

export default SortSelect
