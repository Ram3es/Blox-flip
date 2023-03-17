import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import InputWithLabel from '../../components/Base/InputWithLabel'
import RangeSlider from './RangeSlider'

const tabs = ['manual', 'automatic']

export const BetActions = () => {
  return (
    <div className='mx-4'>
      <Tab.Group>
        <Tab.List className='flex'>
          {tabs.map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                clsx('capitalize font-semibold text-17 w-36 h-11 border-b-[1px]', {
                  'text-blue-golf border-blue-golf bg-blue-golf': selected,
                  'text-gray-primary border-blue-light-primary': !selected
                })
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className='mt-6'>
            <div>
              <div className='relative'>
                <InputWithLabel type='number' name='password' label='Bet amount' value={1500} />
              </div>
              <RangeSlider value={15} onChange={() => console.log('hi')} />
            </div>
          </Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
