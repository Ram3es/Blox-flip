import { Listbox } from '@headlessui/react'
import { RowVariant } from '../../../types/Plinko'
import ArrowTriangleIcon from '../../icons/ArrowTriangleIcon'
import clsx from 'clsx'

interface ToggleRowsProps {
  value: RowVariant
  handleChange: (value: RowVariant) => void
  rowOptions: RowVariant[]
  isBlocked?: boolean
}

const ToggleRows = ({ value, handleChange, rowOptions, isBlocked = false }: ToggleRowsProps) => {
  return (
    <Listbox value={value} onChange={handleChange}>
      <Listbox.Button className={`${isBlocked ? 'pointer-events-none' : 'pointer-event-auto'}`}>
        {({ open }) => (
          <div className='flex items-center justify-between bg-blue-highlight rounded h-12 pl-2.5'>
            <div className='flex items-center space-y-2'>
              <div className='bg-blue-light rounded px-2 py-1 items-center flex font-bold text-15 text-gray-primary'>
                Rows
              </div>
              <div className='px-2 pb-1.5'>{value}</div>
            </div>
            <div className='text-gray-primary pr-4'>
              <ArrowTriangleIcon
                className={clsx('h-2', {
                  'rotate-180': open
                })}
              />
            </div>
          </div>
        )}
      </Listbox.Button>
      <Listbox.Options>
        <div className='z-40 relative top-full'>
          <div className='absolute mt-2 w-full p-2 border border-blue-highlight rounded rounded-tr-none bg-blue-secondary popup--corner-tr'>
            {rowOptions.map((row) => (
              <Listbox.Option key={row} value={row}>
                <div className='text-gray-primary text-13 cursor-pointer py-1.5 px-2.5 rounded bg-blue-highlight hover:bg-blue-accent hover:text-white mb-1.5 border border-blue-accent'>
                  {row}
                </div>
              </Listbox.Option>
            ))}
          </div>
        </div>
      </Listbox.Options>
    </Listbox>
  )
}

export default ToggleRows
