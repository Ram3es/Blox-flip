import { Listbox, RadioGroup, Tab } from '@headlessui/react'
import clsx from 'clsx'
import { ChangeEvent, useCallback, useState } from 'react'
import { Button } from '../../components/Base/Button'
import InputWithLabel from '../../components/Base/InputWithLabel'
import { ArrowGrayIcon } from '../../components/Icons/ArrowGrayIcon'
import { GreenRhombusIcon } from '../../components/Icons/GreenRhombusIcon'
import { RhombusIcon } from '../../components/Icons/RhombusIcon'
import RangeSlider from './RangeSlider'

const tabs = ['manual', 'automatic']
interface IBetVariant {
  name: string
  onClick: () => void
}

const betVariants: IBetVariant[] = [
  {
    name: '1/2',
    onClick: () => console.log('1/2')
  },
  {
    name: '2x',
    onClick: () => console.log('2x')
  },
  {
    name: 'Min',
    onClick: () => console.log('Min')
  },
  {
    name: 'Max',
    onClick: () => console.log('Max')
  }
]

const rowOptions: number[] = [14, 15, 16]

export const BetActions = () => {
  const [betAmount, setBetAmount] = useState(2900)
  const [selectedBet, setSelectedBet] = useState<IBetVariant | null>(null)
  const [selectedRow, setSelectedRow] = useState(16)
  const [numberOfBets, setNumberOfBets] = useState(1)

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
          <Tab.Panel className='flex flex-col space-y-4 mt-4'>
            <div className=''>
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
              <RadioGroup value={selectedBet} onChange={setSelectedBet}>
                <div className='flex items-center justify-between'>
                  <Button color='BlueHighlight' onClick={() => setSelectedBet(null)}>
                    <span className='px-2 py-2.5 items-center flex font-bold text-15 text-gray-primary'>
                      Clear
                    </span>
                  </Button>
                  {betVariants?.map((betVariant: IBetVariant) => (
                    <RadioGroup.Option key={betVariant.name} value={betVariant.name}>
                      {({ checked }) => (
                        <Button
                          color={checked ? 'GreenPrimaryOpacity' : 'BlueHighlight'}
                          onClick={betVariant.onClick}
                        >
                          <span
                            className={clsx('px-2 py-2.5 items-center flex font-bold text-15', {
                              'text-green-primary': checked,
                              'text-gray-primary': !checked
                            })}
                          >
                            {betVariant.name}
                          </span>
                        </Button>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>
            <div className='flex'>
              <Listbox value={selectedRow} onChange={setSelectedRow}>
                <Listbox.Button className='basis-full'>
                  <div className='flex items-center justify-between bg-blue-highlight rounded h-12 w-full pl-2.5'>
                    <div className='flex items-center space-y-2'>
                      <div
                        className='bg-blue-light rounded px-2 py-1 items-center flex font-bold text-15 text-gray-primary'
                        onClick={() => setSelectedBet(null)}
                      >
                        Rows
                      </div>
                      <div className='px-2 pb-1.5'>{selectedRow}</div>
                    </div>
                    <div className='text-gray-primary pr-4'>
                      <ArrowGrayIcon size='SMALL' className='w-3 h-2' />
                    </div>
                  </div>
                </Listbox.Button>
                <Listbox.Options className='absolute basis-full pt-2.5'>
                  <div className='absolute pt-12'>
                    <div className='relative p-2 border border-blue-highlight rounded rounded-tr-none bg-blue-secondary popup--corner-tr w-[264px]'>
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
            </div>
            <div className=''>
              <div className='flex items-start justify-between text-17'>
                <div className='bg-blue-highlight rounded px-3 py-1 items-center flex font-bold  text-gray-primary'>
                  <span className='gradient-gold-yellow-text font-bold'>Risk</span>
                </div>
                <div className='flex flex-col items-center space-y-2'>
                  <span>Low</span>
                  <GreenRhombusIcon />
                </div>
                <div className='flex flex-col items-center space-y-2'>
                  <span className='text-gray-primary'>Medium</span>
                  <span className='rotate-180'>
                    <RhombusIcon />
                  </span>
                </div>
                <div className='flex flex-col items-center space-y-2'>
                  <span className='text-gray-primary'>High</span>
                  <RhombusIcon />
                </div>
              </div>
            </div>
            <div className=''>
              <InputWithLabel
                type='number'
                name='numberOfBets'
                label='Number of Bets'
                placeholder='Enter number of bets'
                value={numberOfBets}
                onChange={(e) => setNumberOfBets(Number(e.target.value))}
              />
            </div>
            <div className='flex'>
              <Button className='w-full bg-green-primary rounded h-11'>Place Bet</Button>
            </div>
          </Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

// divide-blue-accent-fourth divide-y-[2px] divide-y-reverse
