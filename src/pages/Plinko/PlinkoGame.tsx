import { memo, useEffect, useMemo, useRef, useState } from 'react'

import Matter, {
  Bodies,
  Body,
  Composite,
  Engine,
  Events,
  IEventCollision,
  Render,
  Runner
} from 'matter-js'
import clsx from 'clsx'

import {
  getColorByMultiplier,
  getMultipliersByProps,
  getPlinkoBottomFields,
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
  const plinkoGameRef = useRef<HTMLDivElement | null>(null)
  const multiplierRefs = useRef<Array<HTMLDivElement | null>>([])

  const [engine, setEngine] = useState(Engine.create())

  const { selectedRow: rows, risk, paths: newPaths, setInGameBalls } = usePlinko()
  const rowSettings = getRowSettingsByRows(rows)

  const paths: Map<number, any> = useMemo(() => new Map(), [])
  const ballCache: Map<number, any> = new Map()
  const forceCache: Map<Body, ForceCacheItem> = new Map()

  let columnSize = Math.round(PlinkoConfig.WIDTH / (rows + 2))
  let rowSize = PlinkoConfig.HEIGHT / rows

  const applyForce = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [ball, forceData] of forceCache.entries()) {
      Body.setVelocity(forceData.body, { x: 0, y: 0 })
      Body.applyForce(forceData.body, forceData.body.position, forceData.force)
      Body.setStatic(forceData.body, false)
    }

    forceCache.clear()
  }

  const incrementBallCache = (bodyId: number): void => {
    if (!ballCache.has(bodyId)) {
      ballCache.set(bodyId, 0)
    }
    ballCache.set(bodyId, parseInt(ballCache.get(bodyId)) + 1)
  }

  const updateBallPosition = (body: Body): void => {
    const shiftedX = (PlinkoConfig.WIDTH / 2 - body.position.x) % (columnSize / 2)

    Body.translate(body, {
      x:
        Math.abs(shiftedX) < columnSize / 4
          ? shiftedX
          : columnSize / 2 + shiftedX * (shiftedX < 0 ? 1 : -1),
      y: (-body.position.y + (16 - (rowSettings.pegSize + rowSettings.plinkoSize))) % rowSize
    })
    Body.setStatic(body, true)
  }

  const setToApplyForce = (body: Body): void => {
    forceCache.set(body, {
      body,
      force: {
        x: rowSettings.xForce * (paths.get(body.id)[ballCache.get(body.id) - 1] === 1 ? 1 : -1),
        y: rowSettings.yForce
      }
    })
  }

  const handleCollision = (event: IEventCollision<Engine>): void => {
    const { pairs } = event

    for (const pair of pairs) {
      const { bodyA, bodyB } = pair

      if (bodyA.label !== bodyB.label) {
        if (bodyB.label === 'plinko') {
          incrementBallCache(bodyB.id)
          updateBallPosition(bodyB)
          setToApplyForce(bodyB)

          if (
            bodyA.label === 'BottomWall' ||
            bodyA.label === 'Rectangle Body' ||
            bodyA.label === 'LeftWall' ||
            bodyA.label === 'RightWall'
          ) {
            const rights = paths.get(bodyB.id).filter((value: number) => value === 1).length

            const multiplierIndex =
              (rights - (paths.get(bodyB.id).length - rights)) / 2 + paths.get(bodyB.id).length / 2

            const multiplierBox = multiplierRefs.current[multiplierIndex]

            if (multiplierBox?.style) {
              multiplierBox.style.transform = 'translateY(10px)'

              setTimeout(() => {
                multiplierBox.style.transform = 'translateY(0px)'
                setInGameBalls((prev) => prev - 1)
              }, 500)
            }

            Composite.remove(engine.world, bodyB)
            paths.delete(bodyB.id)

            return
          }
        }
      }
    }
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

  const makeGridPegs = (rows: number): Body[] => {
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

    return pegs
  }

  const makePlinkoBall = (): Body => {
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
    Composite.add(engine.world, plinko)
  }

  const leftWall = Bodies.rectangle(0, 0, PlinkoConfig.PADDING / 2, PlinkoConfig.HEIGHT * 2, {
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
    PlinkoConfig.HEIGHT * 2,
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

    const render = Render.create({
      element: plinkoGameRef.current,
      engine,
      options: {
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

    Matter.Runner.run(Runners, engine)
    Render.run(render)

    const pegs = makeGridPegs(rows)

    Composite.add(engine.world, [...pegs, leftWall, rightWall, bottomWall])

    Events.on(engine, 'collisionStart', handleCollision)
    Events.on(engine, 'beforeUpdate', applyForce)

    return () => {
      ballCache.clear()
      forceCache.clear()
      Composite.clear(engine.world, true)
      Engine.clear(engine)
      render.canvas.remove()
      render.textures = {}
      Events.off(engine, 'collisionStart', handleCollision)
      Events.off(engine, 'beforeUpdate', applyForce)
    }
  }, [engine])

  useEffect(() => {
    if (newPaths) {
      newPaths.forEach((item: number[], index: number) => {
        setTimeout(() => addPlinkoBall(item), PlinkoConfig.DELAY_BALL_DROP * index)
      })
    }
  }, [newPaths])

  useEffect(() => {
    setEngine(Engine.create())
  }, [risk, rows])

  return (
    <div className='bg-blue-primary rounded-lg flex justify-center h-full mt-4 md:mt-0 '>
      <div className='scale-[0.58] sm:scale-100 flex items-center flex-col justify-center'>
        <div ref={plinkoGameRef} />
        <div className='flex justify-center items-center'>
          {getPlinkoBottomFields(risk, rows)
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
