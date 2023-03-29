import { memo, useEffect, useRef } from 'react'

import { Bodies, Body, Engine, Events, IEventCollision, Render, Runner, World } from 'matter-js'
import clsx from 'clsx'

import {
  getColorByMultiplier,
  getMultipliersByProps,
  getRandomPathByRows,
  getRowSettingsByRows
} from '../../helpers/plinkoHelpers'

import PlinkoBall from '../../assets/img/plinko_ball.png'
import { PlinkoConfig } from '../../constants/plinko'
import { usePlinko } from '../../store/PlinkoStore'

interface ForceCacheItem {
  body: Body
  force: {
    x: number
    y: number
  }
}

const PlinkoGame = () => {
  const { selectedRow: rows, risk, mode, numberOfBets, betAmount, paths: newPaths } = usePlinko()
  const plinkoGameRef = useRef<HTMLDivElement | null>(null)
  const multiplierRefs = useRef<Array<HTMLDivElement | null>>([])

  const rowSettings = getRowSettingsByRows(rows)

  const paths: Map<number, any> = new Map()
  const ballCache: Map<number, any> = new Map()

  let forceCache: ForceCacheItem[] = []

  let engine = Engine.create()

  let columnSize = Math.round(PlinkoConfig.WIDTH / (rows + 2))
  let rowSize = PlinkoConfig.HEIGHT / rows

  const applyForce = () => {
    for (const ball of forceCache) {
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
          if (!ballCache.has(bodyB.id)) {
            ballCache.set(bodyB.id, 0)
          }
          ballCache.set(bodyB.id, parseInt(ballCache.get(bodyB.id)) + 1)

          const shiftedX = (PlinkoConfig.WIDTH / 2 - bodyB.position.x) % (columnSize / 2)
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
              x:
                rowSettings.xForce *
                (paths.get(bodyB.id)[ballCache.get(bodyB.id) - 1] === 1 ? 1 : -1),
              y: rowSettings.yForce
            }
          })

          if (
            labelA === 'BottomWall' ||
            labelA === 'Rectangle Body' ||
            labelA === 'LeftWall' ||
            labelA === 'RightWall'
          ) {
            const rights = paths.get(bodyB.id).filter((value: number) => value === 1).length
            const i =
              (rights - (paths.get(bodyB.id).length - rights)) / 2 + paths.get(bodyB.id).length / 2
            const multiplierBox = multiplierRefs.current[i]
            if (multiplierBox?.style) {
              multiplierBox.style.transform = 'translateY(10px)'
              setTimeout(() => {
                multiplierBox.style.transform = 'translateY(0px)'
              }, 500)
            }

            World.remove(engine.world, bodyB)
            paths.delete(bodyB.id)

            return
          }
        }
      }
    }
  }

  const makePlinkoBall = () => {
    const x = Math.round(PlinkoConfig.WIDTH / 2)
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

  const addPlinkoBall = (path: number[]) => {
    const plinko = makePlinkoBall()
    paths.set(plinko.id, path)
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

  const leftWall = Bodies.rectangle(0, 0, PlinkoConfig.PADDING / 2, PlinkoConfig.WIDTH * 2, {
    isStatic: true,
    label: 'LeftWall',
    render: {
      fillStyle: 'transparent'
    }
  })

  const rightWall = Bodies.rectangle(
    PlinkoConfig.WIDTH,
    0,
    PlinkoConfig.PADDING / 2,
    PlinkoConfig.WIDTH * 2,
    {
      isStatic: true,
      label: 'RightWall',
      render: {
        fillStyle: 'transparent'
      }
    }
  )

  const bottomWall = Bodies.rectangle(0, PlinkoConfig.WIDTH + 10, PlinkoConfig.WIDTH * 10, 40, {
    isStatic: true,
    label: 'BottomWall',
    render: {
      fillStyle: 'transparent'
    }
  })

  useEffect(() => {
    if (!plinkoGameRef.current) return

    engine = Engine.create()

    const render = Render.create({
      element: plinkoGameRef.current,
      engine,
      bounds: {
        max: {
          y: PlinkoConfig.HEIGHT,
          x: PlinkoConfig.WIDTH
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
        width: PlinkoConfig.WIDTH,
        height: PlinkoConfig.HEIGHT
      }
    })

    columnSize = Math.round(PlinkoConfig.WIDTH / (rows + 2))
    rowSize = PlinkoConfig.HEIGHT / rows

    const Runners = Runner.create({
      isFixed: true
    })

    Runner.run(Runners, engine)
    Render.run(render)

    const pegs: Body[] = []
    for (let row = 0; row < rows; row++) {
      const rowPins = PlinkoConfig.START_PINS + row
      const dx = -row * (columnSize / 2)
      for (let column = 0; column < rowPins; column++) {
        const x = columnSize * column + dx + (PlinkoConfig.WIDTH / 2 - columnSize)
        const y = rowSize * row + 16
        const pin = makePeg(x, y)
        pegs.push(pin)
      }
    }

    World.add(engine.world, [...pegs, leftWall, rightWall, bottomWall])
    Events.on(engine, 'collisionStart', handleCollision)
    Events.on(engine, 'beforeUpdate', applyForce)

    return () => {
      forceCache = []
      ballCache.clear()
      World.clear(engine.world, true)
      Engine.clear(engine)
      render.canvas.remove()
      render.textures = {}
    }
  }, [risk, rows, mode, numberOfBets, betAmount, newPaths])

  useEffect(() => {
    console.log(newPaths)

    if (newPaths) {
      newPaths.forEach((item: number[], index: number) => {
        setTimeout(() => addPlinkoBall(item), 200 * index)
      })
    }
  }, [newPaths])

  return (
    <div className='bg-blue-primary rounded-lg flex justify-center h-full mt-4 md:mt-0 '>
      <div className='scale-[0.58] sm:scale-100 flex items-center flex-col justify-center'>
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
                    'h-4 text-[8px] w-6': rows === 16,
                    'h-4 text-10 w-7': rows === 14,
                    'h-5 text-11 w-8': rows === 12,
                    'h-7 text-13 w-10': rows === 10,
                    'h-8 text-14 w-12': rows === 8
                  }
                )}
                ref={(ref) => (multiplierRefs.current[index] = ref)}
              >
                {multiplier}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default memo(PlinkoGame)
