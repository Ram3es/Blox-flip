/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react'

import { Bodies, Body, Engine, Events, IEventCollision, Render, Runner, World } from 'matter-js'
import clsx from 'clsx'

import { RowVariant } from '../../../types/Plinko'
import { RiskVariant } from '../../../types/enums'
import {
  getColorByMultiplier,
  getMultipliersByProps,
  getRandomPathByRows,
  getRowSettingsByRows
} from '../../../helpers/plinko'

import PlinkoBall from '../../../assets/img/plinko_ball.png'

const mainConfig = {
  width: 500,
  height: 500,
  contour: 50,
  startPins: 3,
  padding: 130
}
type PathMap = Record<number, number[] | undefined>

interface PlinkoGame2Props {
  rows: RowVariant
  risk: keyof typeof RiskVariant
  numberOfBets: number
}

const PlinkoGame2 = ({ rows, risk, numberOfBets }: PlinkoGame2Props) => {
  const plinkoGameRef = useRef<HTMLDivElement | null>(null)
  const multiplierRefs = useRef<Array<HTMLDivElement | null>>([])
  const engine = Engine.create()
  let columnSize = Math.round(mainConfig.width / (rows + 2))
  let rowSize = mainConfig.height / rows

  const paths: PathMap = {}

  let forceCache: any = []
  let ballCache: PathMap = {}

  const rowSettings = getRowSettingsByRows(rows)

  const applyForce = () => {
    for (let ball of forceCache) {
      Body.setVelocity(ball.body, { x: 0, y: 0 })
      Body.applyForce(ball.body, ball.body.position, ball.force)
      Body.setStatic(ball.body, false)
    }
    forceCache = []
  }

  const handleCollision = (event: IEventCollision<Engine>) => {
    const { pairs } = event
    for (let index = 0; index < pairs.length; index++) {
      const pair = pairs[index]
      const { bodyA, bodyB } = pair
      const { label: labelA } = bodyA
      const { label: labelB } = bodyB

      if (labelA !== labelB) {
        if (labelB === 'plinko') {
          if (!ballCache[bodyB.id]) {
            ballCache[bodyB.id] = 0
          }
          ballCache[bodyB.id]++

          const shiftedX = (mainConfig.width / 2 - bodyB.position.x) % (columnSize / 2)
          const shiftedY =
            (-bodyB.position.y + (16 - (rowSettings.pegSize + rowSettings.plinkoSize))) % rowSize
          const newX =
            Math.abs(shiftedX) < columnSize / 4
              ? shiftedX
              : columnSize / 2 + shiftedX * (shiftedX < 0 ? 1 : -1)

          const newY = shiftedY
          Body.setPosition(bodyB, {
            x: bodyB.position.x + newX,
            y: bodyB.position.y + newY
          })

          forceCache.push({
            body: bodyB,
            force: {
              x: rowSettings.xForce * (paths[bodyB.id][ballCache[bodyB.id] - 1] === 1 ? 1 : -1),
              y: rowSettings.yForce
            }
          })

          if (
            labelA === 'BottomWall' ||
            labelA === 'Rectangle Body' ||
            labelA === 'LeftWall' ||
            labelA === 'RightWall'
          ) {
            const rights = paths[bodyB.id].filter((val: number) => val === 1).length
            const i = (rights - (paths[bodyB.id].length - rights)) / 2 + paths[bodyB.id].length / 2
            const multiplierBox2 = multiplierRefs.current[i]

            if (multiplierBox2?.style) {
              multiplierBox2.style.transform = 'translateY(10px)'

              setTimeout(() => {
                multiplierBox2.style.transform = 'translateY(0px)'
              }, 1000)
            }

            World.remove(engine.world, bodyB)
            delete paths[bodyB.id]

            return
          }
        }
      }
    }
  }

  useEffect(() => {
    if (!plinkoGameRef.current) return

    const render = Render.create({
      element: plinkoGameRef.current,
      engine,
      bounds: {
        max: {
          y: mainConfig.height,
          x: mainConfig.width
        },
        min: {
          y: 0,
          x: 0
        }
      },
      options: {
        hasBounds: true,
        wireframes: false,
        background: 'transparent',
        width: mainConfig.width,
        height: mainConfig.height
      }
    })

    columnSize = Math.round(mainConfig.width / (rows + 2))
    rowSize = mainConfig.height / rows

    const Runners = Runner.create({
      isFixed: true
    })

    Runner.run(Runners, engine)
    Render.run(render)

    const pegs: Body[] = []
    for (let row = 0; row < rows; row++) {
      const rowPins = mainConfig.startPins + row
      const dx = -row * (columnSize / 2)
      for (let column = 0; column < rowPins; column++) {
        const x = columnSize * column + dx + (mainConfig.width / 2 - columnSize)
        const y = rowSize * row + 16
        const pin = makePeg(x, y)
        pegs.push(pin)
      }
    }

    World.add(engine.world, [...pegs])
    Events.on(engine, 'collisionStart', handleCollision)
    Events.on(engine, 'beforeUpdate', applyForce)

    return () => {
      forceCache = []
      ballCache = {}
      World.clear(engine.world, true)
      Engine.clear(engine)
      render.canvas.remove()
      render.textures = {}
    }
  }, [risk, rows])

  const leftWall = Bodies.rectangle(0, 0, mainConfig.padding / 2, mainConfig.width * 2, {
    isStatic: true,
    label: 'LeftWall',
    render: {
      fillStyle: 'transparent'
    }
  })
  const rightWall = Bodies.rectangle(
    mainConfig.width,
    0,
    mainConfig.padding / 2,
    mainConfig.width * 2,
    {
      isStatic: true,
      label: 'RightWall',
      render: {
        fillStyle: 'transparent'
      }
    }
  )
  const bottomWall = Bodies.rectangle(
    mainConfig.width / 2,
    mainConfig.height + mainConfig.contour / 2,
    mainConfig.width,
    mainConfig.contour,
    {
      isStatic: true,
      label: 'BottomWall',
      render: {
        fillStyle: 'transparent'
      }
    }
  )
  const contours = [leftWall, rightWall, bottomWall]
  World.add(engine.world, [...contours])

  const makePlinko = () => {
    const x = Math.round(mainConfig.width / 2)
    const y = -5
    const radius = rowSettings.plinkoSize

    return Bodies.circle(x, y, radius, {
      restitution: 0,
      friction: 1,
      mass: 0.23805846,
      inverseMass: 1 / 0.23805846,
      collisionFilter: {
        group: -1
      },
      render: {
        sprite: {
          texture: PlinkoBall,
          xScale: rowSettings.plinkoSize / 9,
          yScale: rowSettings.plinkoSize / 9
        }
      },
      label: 'plinko'
    })
  }
  const addPlinko = () => {
    const plinko = makePlinko()
    const path = getRandomPathByRows(rows)
    console.log(path)
    paths[plinko.id] = path
    World.add(engine.world, plinko)
  }
  const makePeg = (x: number, y: number) => {
    const radius = rowSettings.pegSize

    return Bodies.circle(x, y, radius, {
      isStatic: true,
      friction: 1,
      render: { fillStyle: '#4F5677' },
      label: 'peg'
    })
  }

  return (
    <div className='flex items-center flex-col justify-center'>
      <div ref={plinkoGameRef} />
      <div className='flex justify-center items-center'>
        {getMultipliersByProps(risk, rows)
          .slice(1)
          .reverse()
          .concat(getMultipliersByProps(risk, rows))
          .map((multiplier, index) => (
            <div
              key={multiplier + new Date().getTime() * Math.random()}
              className={clsx(
                `${getColorByMultiplier(
                  multiplier
                )} flex items-center justify-center rounded mx-0.5`,
                {
                  'h-4 text-[8px] w-7': rows === 16,
                  'h-4 text-10 w-8': rows === 14,
                  'h-5 text-11 w-9': rows === 12,
                  'h-7 text-13 w-11': rows === 10,
                  'h-8 text-14 w-14': rows === 8
                }
              )}
              id={`mult_${index}`}
              ref={(ref) => (multiplierRefs.current[index] = ref)}
            >
              {multiplier}
            </div>
          ))}
      </div>
    </div>
  )
}

export default PlinkoGame2
