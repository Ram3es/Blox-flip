import { Listbox } from '@headlessui/react'
import { RowVariant } from '../../../types/Plinko'
import { ArrowGrayIcon } from '../../icons/ArrowGrayIcon'

interface ToggleRowsProps {
  value: RowVariant
  handleChange: (value: RowVariant) => void
  rowOptions: RowVariant[]
}

const ToggleRows = ({ value, handleChange, rowOptions }: ToggleRowsProps) => {
  return (
    <Listbox value={value} onChange={handleChange}>
      <Listbox.Button>
        <div className='flex items-center justify-between bg-blue-highlight rounded h-12 pl-2.5'>
          <div className='flex items-center space-y-2'>
            <div className='bg-blue-light rounded px-2 py-1 items-center flex font-bold text-15 text-gray-primary'>
              Rows
            </div>
            <div className='px-2 pb-1.5'>{value}</div>
          </div>
          <div className='text-gray-primary pr-4'>
            <ArrowGrayIcon size='SMALL' className='w-3 h-2' />
          </div>
        </div>
      </Listbox.Button>
      <Listbox.Options>
        <div className='pt-2.5 z-40 left-0 right-0 top-full'>
          <div className='relative p-2 border border-blue-highlight rounded rounded-tr-none bg-blue-secondary popup--corner-tr'>
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
