import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { RadioGroup } from '@headlessui/react'
import clsx from 'clsx'

import { SPIN_TIME, SPIN_TIME_MILLISECONDS } from '../../../constants/cases'
import { getRandomCards, getRandomId } from '../../../helpers/casesHelpers'

import type { IRootCasePotentialItem } from '../../../types/Cases'

import { Button } from '../../../components/base/Button'
import { CasesLineItem } from '../../../components/common/Cards/CasesLineItem'
import { PotentialDrops } from './PotentialDrops'

import ArrowTriangleIcon from '../../../components/icons/ArrowTriangleIcon'
import FairIcon from '../../../components/icons/FairIcon'
import { OpeningLineIcon } from '../../../components/icons/OpeningLineIcon'
import UnboxingIcon from '../../../components/icons/UnboxingIconTitle'
import ItemBig from '../../../assets/img/item_big1.png'
import CoinsWithDiamond from '../../../components/common/CoinsWithDiamond'
import { useCaseOpening } from '../../../store/CaseOpeningStore'
import { useSocketCtx } from '../../../store/SocketStore'

export const CaseOpening = () => {
  const { socket } = useSocketCtx()
  const { shortName } = useParams()
  const { cases } = useCaseOpening()
  const [currentCasePrice, setCurrentCasePrice] = useState(0)
  const [potentialDropItems, setPotentialDropsItems] = useState<IRootCasePotentialItem[]>([])
  const [wonItem, setWonItem] = useState<IRootCasePotentialItem[]>([])

  const navigate = useNavigate()

  const [lineCount, setLineCount] = useState<1 | 2 | 3 | 4>(1)
  const [isSpin, setIsSpin] = useState(false)
  const itemsRef = useRef<HTMLDivElement[]>([])

  const [rouletteItems, setRouletteItems] = useState<Array<{ items: IRootCasePotentialItem[] }>>([
    {
      items: getRandomCards<IRootCasePotentialItem>(
        100,
        potentialDropItems
      )
    }
  ])

  const refreshLinesByCount = (count: number) => {
    const localLineCount = Math.min(count, 4)

    setRouletteItems((prevItems) => {
      const newItems = [...prevItems]

      if (newItems.length > localLineCount) {
        newItems.splice(localLineCount)
      } else if (newItems.length < localLineCount) {
        for (let i = newItems.length; i < localLineCount; i++) {
          newItems.push({
            items: getRandomCards(100, potentialDropItems)
          })
        }
      }
      return newItems
    })
  }

  useEffect(() => {
    refreshLinesByCount(lineCount)
  }, [lineCount])

  const reset = () => {
    if (itemsRef.current) {
      itemsRef.current.forEach((item) => {
        item.style.transition = 'none'
        item.style.left = '0px'
      })
    }
    setRouletteItems(() => {
      const newItems = []
      for (let i = 0; i < lineCount; i++) {
        newItems.push({
          items: getRandomCards(100, potentialDropItems)
        })
      }
      return newItems
    })
  }

  const spin = (time: number) => {
    const start = performance.now()
    const startPosition = 0

    const endPosition = -6.26 * 88 - 87 * 0.375

    const animate = (currentTime: number) => {
      const elapsed = currentTime - start
      const progress = Math.min(elapsed / (time * 1000), 1)

      const easedProgress = 1 - Math.pow(1 - progress, 2)

      if (itemsRef.current) {
        itemsRef.current.forEach((item) => {
          item.style.left = `${startPosition + (endPosition - startPosition) * easedProgress}rem`
        })
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsSpin(false)
      }
    }

    requestAnimationFrame(animate)
  }

  const addWonItemInLines = (wonItemsArray: IRootCasePotentialItem[]) => {
    // const wonItemsArray: IRootCasePotentialItem[] = []
    // for (let i = 0; i < lineCount; i++) {
    //   const randomCardIndex = Math.floor(Math.random() * potentialDropItems.length)
    //   const randomCard = potentialDropItems[randomCardIndex]
    //   const itemWon = {
    //     ...randomCard,
    //     id: `${randomCard.id} ${new Date().getTime()}`
    //   }
    //   wonItemsArray.push(itemWon)
    // }
    // const wonItemsWithIds = wonItemsArray.map((item) => ({ ...item, id: getRandomId() }))
    setRouletteItems((prevItems) => {
      const rouletteItems = [...prevItems]
      for (let i = 0; i < lineCount; i++) {
        const rouletteItem = [...rouletteItems[i].items]
        rouletteItem[87] = wonItemsArray[i]
        rouletteItems[i] = { items: rouletteItem }
      }
      return rouletteItems
    })
    setWonItem(() => wonItemsArray)
  }

  const play = () => {
    socket.emit(
      'case_open',
      { short: shortName, num: lineCount },
      (err: boolean, results: IRootCasePotentialItem[]) => {
        if (err) {
          return
        }
        reset()
        addWonItemInLines(results)
        spin(SPIN_TIME)
        setIsSpin(true)
      }
    )
  }

  useEffect(() => {
    reset()
    addWonItemInLines([])
  }, [lineCount])

  useEffect(() => {
    const currentCase = cases.find((item) => item.short === shortName)

    if (!currentCase) return

    setCurrentCasePrice(currentCase.cost)
    setPotentialDropsItems(currentCase.items)
  }, [cases])

  return (
    <div className="max-w-1190 w-full m-auto">
      <div className="flex flex-wrap justify-between mb-5">
        <div className="w-36 flex">
          <Button
            onClick={() => navigate(-1)}
            className="rounded p-2 leading-4 text-gray-primary font-semibold flex  items-center bg-blue-accent-secondary hover:bg-blue-accent hover:text-white mb-4 mr-auto"
          >
            <span className="mr-1.5 rotate-90">
              <ArrowTriangleIcon />
            </span>
            Back
          </Button>
        </div>
        <div className="flex items-center mb-4 mx-2">
          <div className="w-6 shrink-0 mr-3 text-blue-golf">
            <UnboxingIcon iconClasses="w-6 h-6 " />
          </div>
          <span className="text-2xl font-bold">{`Diamond Case ${String(shortName)}`}</span>
        </div>
        <Link
          to="/provably-fair#cases"
          className="relative hover:z-50 rounded text-green-primary border bg-green-primary/15 hover:bg-green-primary/30 border-green-primary whitespace-nowrap px-3.5 py-1 leading-6 cursor-pointer mb-4 flex items-center"
        >
          <div className="w-4 shrink-0 mr-2.5">
            <FairIcon />
          </div>
          Provably fair
        </Link>
      </div>
      <div className="border-t border-b border-t-sky-primary/40 border-b-sky-primary/40 rounded mb-9">
        <div className="border--mask border--radial-blue  bg-gradient-radial from-blue-light-secondary/30 to-blue-accent-secondary/1 rounded text-sm px-4 sm:px-12 py-9 overflow-hidden relative">
          <div className="flex flex-wrap justify-center relative items-start z-10 mb-4 px-4 sm:px-12 -mx-4 sm:-mx-12">
            <div className="flex flex-wrap justify-center gap-4 sm:justify-start min-w-fit mb-5 z-20 relative">
              <CoinsWithDiamond
                containerColor="GreenDarken"
                typographyQuantity={currentCasePrice * lineCount}
                typographyFontSize="Size16"
              />
              <Button
                disabled={isSpin}
                onClick={play}
                className="bg-green-primary hover:bg-green-500 border border-green-primary py-2 px-4 leading-4 rounded mb-2 h-[35px]"
              >
                Open case
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center xs:justify-end sm:justify-end -mx-0.5 text-center leading-10 text-gray-primary font-semibold xs:ml-auto min-w-fit xs:min-w-0 xs:w-1/3 z-20 relative">
              <RadioGroup className="flex" value={lineCount} onChange={setLineCount}>
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
            <div className="xs:-mt-18 min-w-full flex items-center relative z-10">
              <div className="bg-gradient-to-l from:bg-blue-highlight/0 to-bg-blue-highlight h-px grow"></div>
              <div className="flex before:content-[''] before:pb-60% before:w-0 before:shrink-0">
                <div className="text-center min-w-fit mb-5 w-64 min-h-1/2 px-4 relative shrink-0">
                  <img
                    src={ItemBig}
                    alt=""
                    width="148"
                    height="161"
                    loading="lazy"
                    decoding="async"
                    className="mx-auto"
                  />
                </div>
              </div>
              <div className="bg-gradient-to-r from:bg-blue-highlight/0 to-bg-blue-highlight h-px grow"></div>
            </div>
          </div>
          {rouletteItems.map((item, index) => (
            <div
              key={index + 1}
              className="flex py-3 relative z-10 bg-dark/30 overflow-hidden mb-2.5 rounded justify-center"
            >
              <div className="absolute left-1/2 -ml-0.5 top-0 z-20 w-0.5 xs:w-1">
                <OpeningLineIcon />
              </div>
              <div className="absolute left-1/2 -ml-0.5 bottom-0 z-20 rotate-180 w-0.5 xs:w-1">
                <OpeningLineIcon />
              </div>
              <div className="min-w-[1094px]">
                <div
                  className="whitespace-nowrap relative left-0 flex gap-3"
                  ref={(item) => {
                    if (item !== null) {
                      itemsRef.current[index] = item
                    }
                  }}
                >
                  {item.items.map((item: IRootCasePotentialItem) => (
                    <CasesLineItem
                      key={item.name}
                      timeoutToShow={SPIN_TIME_MILLISECONDS}
                      itsWinning={!!wonItem && item.id === wonItem[index]?.id}
                      image={item.image}
                      name={item.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PotentialDrops cards={potentialDropItems} />
    </div>
  )
}
