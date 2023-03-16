import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RadioGroup } from '@headlessui/react'
import clsx from 'clsx'

import { ICaseItem } from '../../../types/cases'
import { getRandomCards } from '../../../helpers/casesHelpers'
import { caseCards } from './mock'

import { Button } from '../../../components/base/Button'
import { QuantityCoins } from '../../../components/common/QuantityCoins/QuantityCoins'
import { CasesLineItem } from './CasesLineItem'
import { PotentialDrops } from './PotentialDrops'

import { ArrowGrayIcon } from '../../../components/ArrowGrayIcon/ArrowGrayIcon'
import { FairIcon } from '../../../components/icons/FairIcon'
import { OpeningLineIcon } from '../../../components/icons/OpeningLineIcon'
import UnboxingIcon from '../../../components/icons/UnboxingIcon'
import ItemBig from '../../../assets/img/item_big1.png'

export const CaseOpening = () => {
  const { id } = useParams()
  const [cards] = useState<ICaseItem[]>(caseCards)

  const [lineCount, setLineCount] = useState<1 | 2 | 3 | 4>(1)
  const [isReply, setIsReply] = useState(false)
  const [isSpin, setIsSpin] = useState(false)
  const itemsRef = useRef<HTMLDivElement[]>([])

  const [rouletteItems, setRouletteItems] = useState<Array<{ items: ICaseItem[] }>>([
    { items: getRandomCards(100, cards) }
  ])

  const refreshLinesByCount = (count: number) => {
    const localLineCount = Math.min(count, 4)

    setRouletteItems((prevItems) => {
      const newItems = [...prevItems]

      if (newItems.length > localLineCount) {
        newItems.splice(localLineCount)
      } else if (newItems.length < localLineCount) {
        for (let i = newItems.length; i < localLineCount; i++) {
          newItems.push({ items: getRandomCards(100, cards) })
        }
      }
      return newItems
    })
  }

  useEffect(() => {
    refreshLinesByCount(lineCount)
  }, [lineCount])

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
      })
    }

    setTimeout(() => {
      if (itemsRef.current) {
        itemsRef.current.forEach((item) => {
          item.style.left = `-${6.2 * 88 + 87 * 0.375}rem`
        })
      }
    }, 1000)
  }

  const load = () => {
    setRouletteItems((prevItems) => {
      const rouletteItems = [...prevItems]

      for (let i = 0; i < rouletteItems.length; i++) {
        const rouletteItem = [...rouletteItems[i].items]

        const randomCardIndex = Math.floor(Math.random() * cards.length)
        const randomCard = cards[randomCardIndex]

        rouletteItem[87] = {
          ...randomCard,
          id: `${randomCard.id} ${new Date().getTime()}`
        }

        rouletteItems[i] = { items: rouletteItem }
      }
      return rouletteItems
    })
  }

  const play = () => {
    if (isReply) {
      reset()
      setTimeout(() => {
        load()
        spin(8)
        setIsSpin(true)
      }, 10)
      return
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
          <div className='w-6 shrink-0 mr-3 text-blue-golf'>
            <UnboxingIcon iconClasses='w-6 h-6 ' />
          </div>
          <span className='text-2xl font-bold'>{`Diamond Case ${String(id)}`}</span>
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
          {rouletteItems.map((item, index) => (
            <div
              key={index + 1}
              className='flex py-3 relative z-10 bg-dark/30 overflow-hidden mb-2.5 rounded justify-center'
            >
              <div className='absolute left-1/2 -ml-0.5 top-0 z-20 w-0.5 xs:w-1'>
                <OpeningLineIcon />
              </div>
              <div className='absolute left-1/2 -ml-0.5 bottom-0 z-20 rotate-180 w-0.5 xs:w-1'>
                <OpeningLineIcon />
              </div>
              <div className='min-w-[1094px]'>
                <div
                  className='whitespace-nowrap relative left-0 flex'
                  ref={(item) => {
                    if (item !== null) {
                      itemsRef.current[index] = item
                    }
                  }}
                  onTransitionEnd={transitionEndHandler}
                >
                  {item.items.map((item: ICaseItem, index) => (
                    <CasesLineItem key={item.id} itsWinning={index === 87} image={item.image} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PotentialDrops cards={cards} />
    </div>
  )
}
