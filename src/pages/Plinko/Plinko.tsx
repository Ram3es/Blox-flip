import { BetMode, BetToolkit, RowVariant } from '../../types/Plinko'
import { ChangeEvent, MouseEventHandler, useCallback, useState } from 'react'
import { Listbox, RadioGroup } from '@headlessui/react'
import clsx from 'clsx'

import GamePlinko from './Game/GamePlinko'
import { GreenRhombusIcon } from '../../components/Icons/GreenRhombusIcon'
import { RhombusIcon } from '../../components/Icons/RhombusIcon'
import { Button } from '../../components/Base/Button'
import { ArrowGrayIcon } from '../../components/Icons/ArrowGrayIcon'
import RangeSlider from '../../components/Common/RangeSlider'
import InputWithLabel from '../../components/Base/InputWithLabel'

const Plinko = () => {
  const [mode, setMode] = useState<keyof typeof BetMode>(BetMode.Manual)
  const [betAmount, setBetAmount] = useState(200)
  const [selectedBet, setSelectedBet] = useState<BetToolkit | null>(null)
  const [selectedRow, setSelectedRow] = useState<RowVariant>(16)
  const [numberOfBets, setNumberOfBets] = useState(1)
  const rowOptions: RowVariant[] = [8, 10, 12, 14, 16]

  const handleChangeBetAmount = useCallback(
    (eventOrValue: ChangeEvent<HTMLInputElement> | number) => {
      if (typeof eventOrValue === 'number') {
        setBetAmount(eventOrValue)
      } else {
        setBetAmount(Number(eventOrValue.target.value))
      }
    },
    []
  )

  const handleChangeBetMode: MouseEventHandler<HTMLButtonElement> = (event) => {
    const mode = event.currentTarget.textContent as BetMode
    setMode(mode)
  }

  const betToolkit: BetToolkit[] = [
    {
      label: '1/2',
      function: () => setBetAmount((prev) => Number((prev / 2).toFixed()))
    },
    {
      label: '2x',
      function: () => setBetAmount((prev) => Number((prev * 2).toFixed()))
    },
    {
      label: 'Min',
      function: () => setBetAmount(50)
    },
    {
      label: 'Max',
      function: () => setBetAmount(1500)
    }
  ]

  return (
    <div className='flex flex-col md:flex-row justify-center'>
      <div className='bg-blue-accent rounded-lg md:w-1/4 w-full py-6 mr-4'>
        <div className='mx-4'>
          <div className='flex items-center'>
            {Object.keys(BetMode).map((tab) => (
              <Button
                key={tab}
                onClick={handleChangeBetMode}
                className={clsx(
                  'capitalize font-semibold text-17 w-full h-11 border-b-[1px] flex items-center justify-center',
                  {
                    'text-blue-golf border-blue-golf bg-blue-golf': mode,
                    'text-gray-primary border-blue-light-primary': !mode
                  }
                )}
              >
                {tab}
              </Button>
            ))}
          </div>
          <div>
            <div className='flex flex-col space-y-7 mt-4'>
              <div className='border-b-2 border-b-blue-accent-fourth pb-6'>
                <div className='relative'>
                  <InputWithLabel
                    type='number'
                    name='password'
                    label='Bet amount'
                    value={betAmount}
                    onChange={handleChangeBetAmount}
                  />
                </div>
                <RangeSlider
                  value={betAmount}
                  min={100}
                  max={1500}
                  sliderValueChanged={handleChangeBetAmount}
                />
              </div>
              <div className='border-b-2 border-b-blue-accent-fourth pb-6'>
                <RadioGroup value={selectedBet} onChange={setSelectedBet}>
                  <div className='flex items-center justify-between'>
                    <Button color='BlueHighlight' onClick={() => setSelectedBet(null)}>
                      <span className='px-2 py-2.5 items-center flex font-bold text-15 text-gray-primary'>
                        Clear
                      </span>
                    </Button>
                    {betToolkit?.map((toolkit: BetToolkit) => (
                      <RadioGroup.Option key={toolkit.label} value={toolkit.label}>
                        {({ checked }) => (
                          <Button
                            color={checked ? 'GreenPrimaryOpacity' : 'BlueHighlight'}
                            onClick={toolkit.function}
                          >
                            <span
                              className={clsx('px-2 py-2.5 items-center flex font-bold text-15', {
                                'text-green-primary': checked,
                                'text-gray-primary': !checked
                              })}
                            >
                              {toolkit.label}
                            </span>
                          </Button>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              <div className='border-b-2 border-b-blue-accent-fourth flex flex-col w-full pb-6'>
                <Listbox value={selectedRow} onChange={setSelectedRow}>
                  <Listbox.Button>
                    <div className='flex items-center justify-between bg-blue-highlight rounded h-12 pl-2.5'>
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
              </div>
              <div className='border-b-2 border-b-blue-accent-fourth pb-6'>
                <div className='flex items-start justify-between text-17'>
                  <div className='bg-blue-highlight rounded px-3 py-1 items-center flex font-bold text-gray-primary'>
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
              {mode === 'Automatic' && (
                <div className='border-b-2 border-b-blue-accent-fourth'>
                  <InputWithLabel
                    type='number'
                    name='numberOfBets'
                    label='Number of Bets'
                    placeholder='Enter number of bets'
                    value={numberOfBets}
                    onChange={(e) => setNumberOfBets(Number(e.target.value))}
                  />
                </div>
              )}
              <div className='flex'>
                <Button className='w-full bg-green-primary rounded h-11'>Place Bet</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-blue-primary rounded-lg md:w-3/4 w-full flex items-start justify-center'>
        <GamePlinko rows={selectedRow} />
      </div>
    </div>
  )
}

export default Plinko
