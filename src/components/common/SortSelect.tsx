import { Menu } from '@headlessui/react'
import { FC } from 'react'
import { ISelectOptions, ISortOptions } from '../../types/SortOptions'
import { Button } from '../base/Button'
import TriangleArrow from '../icons/TriangleArrow'

interface ISortSelectProps {
  options: ISortOptions[] | ISelectOptions[]
  onSelect: Function
  currentOptions?: string
  title?: string
}

const SortSelect: FC<ISortSelectProps> = ({
  options,
  onSelect,
  currentOptions = 'Recommended',
  title = 'Filter by:'
}) => {
  return (
    <div className="relative">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button
              as={Button}
              className="flex items-center justify-center font-semibold py-2 px-2.5 leading-4 gap-1.5 group text-gray-primary rounded bg-blue-accent-secondary hover:bg-blue-accent border border-transparent"
            >
              <div className='min-w-[120px] flex items-center gap-1.5'>
              <span className="shrink-0">{title}</span>
              <span className="text-white mr-1">{currentOptions}</span>
              </div>
              <TriangleArrow iconClasses={open ? 'rotate-180' : ''} />
            </Menu.Button>
            <Menu.Items className="absolute left-0 right-0 top-full pt-2.5 z-40" as="div">
              <div className="relative p-2 borders rounded rounded-tr-none bg-[#2F3656] popup--corner-tr-gray">
                {options.map((variant, idx) => (
                  <Menu.Item
                    key={`${variant.title} - ${idx}`}
                    as={Button}
                    onClick={() => onSelect(variant)}
                    className="text-start w-full capitalize block text-gray-primary text-13 py-1.5 leading-2 px-2.5 rounded bg-[#3C456B] hover:bg-blue-accent hover:text-white mb-1.5"
                  >
                    {variant.title}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </>
        )}
      </Menu>
    </div>
  )
}

export default SortSelect
