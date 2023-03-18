import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { ChangeEvent, useCallback, useState } from 'react'
import { Button } from '../../components/Base/Button'
import InputWithLabel from '../../components/Base/InputWithLabel'
import RangeSlider from './RangeSlider'

const tabs = ['manual', 'automatic']

export const BetActions = () => {
  const [betAmount, setBetAmount] = useState(2900)

  const sliderValueChanged = useCallback(
    (value: number) => {
      setBetAmount(value)
    },
    [betAmount]
  )

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setBetAmount(Number(event.target.value))
    },
    [betAmount]
  )

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
          <Tab.Panel className='flex flex-col  space-y-4 mt-4'>
            <div className='divide-blue-accent-fourth divide-y-[2px] divide-y-reverse'>
              <div className='relative'>
                <InputWithLabel
                  type='number'
                  name='password'
                  label='Bet amount'
                  value={betAmount}
                  onChange={handleChange}
                />
              </div>
              <RangeSlider
                value={betAmount}
                min={500}
                max={50000}
                step={500}
                sliderValueChanged={sliderValueChanged}
              />
            </div>
            <div className=''>
              <Button color='BlueHighlight'>
                <span className='w-16 h-8 items-center flex justify-center text-gray-primary font-bold text-15'>
                  Clear
                </span>
              </Button>
            </div>
          </Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
