import { useCallback, useState } from 'react'
import { Listbox } from '@headlessui/react'

import clsx from 'clsx'

import ArrowTriangleIcon from '../icons/ArrowTriangleIcon'

interface SelectWithInlineLabelProps {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}

const SelectWithInlineLabel = ({ value, label, options, onChange }: SelectWithInlineLabelProps) => {
  const [selected, setSelectedValue] = useState(value)

  const handleChangeSelectedValue = useCallback((value: string) => {
    setSelectedValue(value)
    onChange(value)
  }, [selected])

  return (
    <Listbox
      as='div'
      className='pl-4 pr-4 rounded-10 gradient-background--blue__secondary py-4 flex items-center justify-between w-full cursor-text relative'
      value={selected}
      onChange={handleChangeSelectedValue}
    >
      <Listbox.Button className='flex items-center justify-between w-full'>
        {({ open }) => (
          <>
            <span className='rounded-md px-5 py-2 font-medium text-sm gradient--background--blue__third text-gray-primary'>
              {label}
            </span>

            <div className='flex items-center justify-between gap-2 text-gray-primary'>
              <span className='capitalize'>{selected}</span>
              <ArrowTriangleIcon
                className={clsx('h-2', {
                  'rotate-180': open
                })}
              />
            </div>
          </>
        )}
      </Listbox.Button>
      <Listbox.Options className='z-50 absolute top-full right-0 p-2 border border-blue-highlight rounded rounded-tr-none bg-blue-secondary popup--corner-tr flex flex-col gap-1.5'>
        {options.map((option) => (
          <Listbox.Option key={option} value={option}>
            <div className='text-gray-primary text-13 cursor-pointer py-1.5 px-2.5 rounded bg-blue-highlight hover:bg-blue-accent hover:text-white border border-blue-accent'>
              {option}
            </div>
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}

export default SelectWithInlineLabel
