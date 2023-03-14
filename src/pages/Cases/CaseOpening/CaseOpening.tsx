import { useCallback, useEffect, useRef, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import clsx from 'clsx'

import { ICaseItem } from '../../../types/cases'
import { randomItems } from '../../../helpers/casesHelpers'

import { Button } from '../../../components/base/Button'
import { QuantityCoins } from '../../../components/common/QuantityCoins/QuantityCoins'
import { CasesLineItem } from './CasesLineItem'
import { PotentialDrops } from './PotentialDrops'

import { ArrowGrayIcon } from '../../../components/ArrowGrayIcon/ArrowGrayIcon'
import { FairIcon } from '../../../components/icons/FairIcon'
import { UnboxingIcon } from '../../../components/icons/UnboxingIcon'
import { OpeningLineIcon } from '../../../components/icons/OpeningLineIcon'
import ItemBig from '../../../assets/img/item_big1.png'

export const CaseOpening = () => {
  const [lineCount, setLineCount] = useState<number>(1)

  const [rouletteItems, setRouletteItems] = useState(randomItems(100))
  const [isReply, setIsReply] = useState(false)
  const [isSpin, setIsSpin] = useState(false)
  const itemsRef = useRef<HTMLDivElement[]>([])

  const transitionEndHandler = useCallback(() => {
    setIsSpin(false)
  }, [isSpin])

  const reset = () => {
    if (itemsRef.current) {
      itemsRef.current.forEach((item) => {
        item.style.transition = 'none'
        item.style.left = '0px'
      })
    }
  }

  const spin = (time: number) => {
    if (itemsRef.current) {
      itemsRef.current.forEach((item) => {
        item.style.transition = `left ${time}s cubic-bezier(0.12, 0.8, 0.38, 1)`
        // item.style.transform = 'translateX(0rem)'
        // item.style.transitionTimingFunction = 'cubic-bezier(0.12, 0.8, 0.38, 1)'
        // item.style.transitionDuration = '0s'
      })
    }

    setTimeout(() => {
      if (itemsRef.current) {
        itemsRef.current.forEach((item) => {
          item.style.left = `-${6.2 * 88 + 87 * 0.375}rem` // + 24
          // item.style.left = `-${342}rem` // 320 x 484
          // item.style.transform = `translateX(${-8 * 78 - 10}rem)`
          // item.style.transitionTimingFunction = 'cubic-bezier(0.12, 0.8, 0.38, 1)'
          // item.style.transitionDuration = `${time}s`
        })
      }
    }, 1000)
  }

  const load = () => {
    const winner = { itemName: `Winning item ${Math.random()}`, rarity: '100', image: '', id: 87 }

    setRouletteItems(() => {
      const newItems = [...rouletteItems]
      newItems[87] = winner
      return newItems
    })
  }

  const play = () => {
    if (isReply) {
      load()
      reset()
    }

    load()
    spin(8)
    setIsSpin(true)
    setIsReply(true)
  }

  useEffect(() => {
    if (isReply) {
      load()
      reset()
    }
  }, [lineCount])

  return (
    <div className='max-w-1190 w-full m-auto'>
      <div className='flex flex-wrap justify-between mb-5'>
        <div className='w-36 flex'>
          <Button className='rounded p-2 leading-4 text-gray-primary font-semibold flex  items-center bg-blue-accent-secondary hover:bg-blue-accent hover:text-white mb-4 mr-auto'>
            <span className='mr-1.5 rotate-90'>
              <ArrowGrayIcon />
            </span>
            Back
          </Button>
        </div>
        <div className='flex items-center mb-4 mx-2'>
          <div className='w-6 shrink-0 mr-3'>
            <UnboxingIcon />
          </div>
          <span className='text-2xl font-bold'>Diamond Case</span>
        </div>
        <Button className='relative hover:z-50 rounded text-green-primary border bg-green-primary/15 hover:bg-green-primary/30 border-green-primary whitespace-nowrap px-3.5 py-1 leading-6 cursor-pointer mb-4 flex items-center'>
          <div className='w-4 shrink-0 mr-2.5'>
            <FairIcon />
          </div>
          Provably fair
        </Button>
      </div>
      <div className='border-t border-b border-t-sky-primary/40 border-b-sky-primary/40 rounded mb-9'>
        <div className='border--mask border--radial-blue  bg-gradient-radial from-blue-light-secondary/30 to-blue-accent-secondary/1 rounded text-sm px-4 sm:px-12 py-9 overflow-hidden relative'>
          <div className='flex flex-wrap justify-center relative items-start z-10 mb-4 px-4 sm:px-12 -mx-4 sm:-mx-12'>
            <div className='flex flex-wrap justify-center sm:justify-start min-w-fit mb-5 z-20 relative'>
              <div className='bg-green-primary/15 flex items-center px-1 pr-4 rounded mr-2.5 mb-2'>
                <QuantityCoins
                  quantity={1500}
                  iconBgHeight='6'
                  iconBgWidth='6'
                  iconWidth='15.4'
                  iconHeight='13'
                  textSize='text-base'
                />
              </div>
              <Button
                disabled={isSpin}
                onClick={play}
                className='bg-green-primary hover:bg-green-500 border border-green-primary py-2 px-4 leading-4 rounded mb-2'
              >
                Open case
              </Button>
            </div>
            <div className='flex flex-wrap items-center justify-center xs:justify-end sm:justify-end -mx-0.5 text-center leading-10 text-gray-primary font-semibold xs:ml-auto min-w-fit xs:min-w-0 xs:w-1/3 z-20 relative'>
              <RadioGroup className='flex' value={lineCount} onChange={setLineCount}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <RadioGroup.Option value={i + 1} key={i + 1}>
                    {({ checked }) => (
                      <>
                        <Button
                          disabled={isSpin}
                          className={clsx('mx-0.5 mb-1 w-10 h-10 rounded border', {
                            'hover:bg-blue-accent-secondary/30 hover:text-white pag--active':
                              checked,
                            'bg-blue-accent-secondary border-blue-accent-secondary': !checked
                          })}
                        >
                          {i + 1}
                        </Button>
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </RadioGroup>
            </div>
            <div className='xs:-mt-18 min-w-full flex items-center relative z-10'>
              <div className='bg-gradient-to-l from:bg-blue-highlight/0 to-bg-blue-highlight h-px grow'></div>
              <div className="flex before:content-[''] before:pb-60% before:w-0 before:shrink-0">
                <div className='text-center min-w-fit mb-5 w-64 min-h-1/2 px-4 relative shrink-0'>
                  <img
                    src={ItemBig}
                    alt=''
                    width='148'
                    height='161'
                    loading='lazy'
                    decoding='async'
                    className='mx-auto'
                  />
                </div>
              </div>
              <div className='bg-gradient-to-r from:bg-blue-highlight/0 to-bg-blue-highlight h-px grow'></div>
            </div>
          </div>
          {Array.from({ length: lineCount }).map((_, index) => (
            <div
              key={index + 1}
              className='flex py-3 relative z-10 bg-dark/30 overflow-hidden mb-2.5 rounded'
            >
              <div className='absolute left-1/2 -ml-0.5 top-0 z-20 w-0.5 xs:w-1'>
                <OpeningLineIcon />
              </div>
              <div className='absolute left-1/2 -ml-0.5 bottom-0 z-20 rotate-180 w-0.5 xs:w-1'>
                <OpeningLineIcon />
              </div>
              <div
                className='whitespace-nowrap relative left-0 flex'
                ref={(item) => {
                  if (item !== null) {
                    itemsRef.current[index] = item
                  }
                }}
                onTransitionEnd={transitionEndHandler}
              >
                {rouletteItems.map((item: ICaseItem) => (
                  <CasesLineItem
                    key={item.itemName}
                    itsWinning={item.id === 87}
                    itemName={item.itemName}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <PotentialDrops />
    </div>
  )
}
