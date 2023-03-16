import { Tab } from '@headlessui/react'
import clsx from 'clsx'

export const BetActions = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Tab.Group>
        <Tab.List>
          <Tab className='font-semibold text-17 text-gray-primary w-32 h-11 border-b-[1px] border-blue-light-primary'>
            Manual
          </Tab>
          <Tab
            className={({ selected }) =>
              clsx(
                'font-semibold text-17 text-gray-primary w-32 h-11 border-b-[1px] border-blue-light-primary',
                {
                  'bg-red-300': selected,
                  ' ': !selected
                }
              )
            }
          >
            Automatic
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>Content 1</Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
