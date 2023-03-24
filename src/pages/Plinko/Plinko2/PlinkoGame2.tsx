/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Bodies, Body, Engine, Events, IEventCollision, Render, Runner, World } from 'matter-js'
import { useEffect, useRef } from 'react'
import { RiskVariant } from '../../../types/enums'
import { RowVariant } from '../../../types/Plinko'
import PlinkoBall from '../../../assets/img/plinko_ball.png'
import { Button } from '../../../components/base/Button'

const mainConfig = {
  width: 700,
  height: 700,
  contour: 50,
  startPins: 3
}
type PathMap = Record<number, unknown>

interface PlinkoGame2Props {
  rows: RowVariant
  risk: keyof typeof RiskVariant
  numberOfBets: number
}

const PlinkoGame2 = ({ rows, risk, numberOfBets }: PlinkoGame2Props) => {
  const plinkoGameRef = useRef<HTMLDivElement | null>(null)
  const multiplierRefs = useRef<HTMLDivElement[]>([])
  const engine = Engine.create()

  let columnSize = Math.round(mainConfig.width / (rows + 2))
  let rowSize = mainConfig.height / rows

  const paths: PathMap = {}

  let forceCache: any = []
  let ballCache: PathMap = {}

  const rowSettings = getRowSettings(rows)

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

    pairs.forEach((pair, i) => {
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

          Body.translate(bodyB, {
            x:
              Math.abs(shiftedX) < columnSize / 4
                ? shiftedX
                : columnSize / 2 + shiftedX * (shiftedX < 0 ? 1 : -1),
            // y: ((2 - bodyB.position.y)) % (rowSize)
            y: (-bodyB.position.y + (16 - (rowSettings.pegSize + rowSettings.plinkoSize))) % rowSize
          })
          // Body.setStatic(bodyB, true)

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
            const rights = paths[bodyB.id].filter((val) => val == 1).length
            const i = (rights - (paths[bodyB.id].length - rights)) / 2 + paths[bodyB.id].length / 2

            const multiplierBox = document.getElementById(`mult_${i}`)

            if (multiplierBox?.style) {
              multiplierBox.style.transform = 'translateY(3px)'
              multiplierBox.style.filter = 'brightness(1.5)'

              setTimeout(() => {
                multiplierBox.style.transform = 'translateY(0px)'
                multiplierBox.style.filter = 'brightness(1)'
              }, 200)
            }

            World.remove(engine.world, bodyB)
            delete paths[bodyB.id]

            return
          }
        }
      }
    })
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
  }, [rows, risk])

  const leftWall = Bodies.rectangle(0, 0, 133.33333333333334 / 2, mainConfig.width * 2, {
    isStatic: true,
    label: 'LeftWall',
    render: {
      fillStyle: 'transparent'
    }
  })
  const rightWall = Bodies.rectangle(mainConfig.width, 0, 133.33333333333334 / 2, mainConfig.width * 2, {
    isStatic: true,
    label: 'RightWall',
    render: {
      fillStyle: 'transparent'
    }
  })
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
    paths[plinko.id] = getPathByRows(rows)
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
  const getMultipliersByProps = (
    risk: keyof typeof RiskVariant,
    row: RowVariant
  ): [] | number[] => {
    const multipliers = {
      Low: {
        8: [0.48, 0.96, 1.06, 2.01, 5.37],
        10: [0.48, 0.96, 1.06, 1.34, 2.88, 8.54],
        12: [0.48, 0.96, 1.06, 1.34, 1.54, 2.88, 9.6],
        14: [0.48, 0.96, 1.06, 1.25, 1.34, 1.82, 3.84, 6.81],
        16: [0.48, 0.96, 1.06, 1.15, 1.34, 1.34, 1.92, 8.64, 15.3]
      },
      Medium: {
        8: [0.38, 0.67, 1.25, 2.88, 12.5],
        10: [0.38, 0.58, 1.34, 1.92, 4.8, 21.1],
        12: [0.29, 0.58, 1.06, 1.92, 3.84, 10.6, 31.7],
        14: [0.19, 0.48, 0.96, 1.82, 3.84, 6.72, 14.4, 55.6],
        16: [0.29, 0.48, 0.96, 1.44, 2.88, 4.8, 9.6, 39.3, 105.5]
      },
      High: {
        8: [0.19, 0.29, 1.44, 3.84, 27.8],
        10: [0.19, 0.29, 0.86, 2.88, 9.6, 72.9],
        12: [0.19, 0.19, 0.67, 1.92, 7.77, 23.0, 163.1],
        14: [0.19, 0.19, 0.29, 1.82, 4.8, 17.3, 53.7, 403.0],
        16: [0.19, 0.19, 0.19, 1.92, 3.84, 8.64, 24.9, 124.7, 959.5]
      }
    }

    if (multipliers?.[risk] && multipliers?.[risk]?.[row]) {
      return multipliers[risk][row]
    }
    return []
  }

  return (
    <div className='flex items-center flex-col'>
      <div ref={plinkoGameRef} />
      <div className='flex justify-center items-center'>
        {getMultipliersByProps(risk, rows)
          .slice(1)
          .reverse()
          .concat(getMultipliersByProps(risk, rows))
          .map((multiplier, i) => (
            <div
              key={multiplier + new Date().getTime() * Math.random()}
              className={`${getColorByMultiplier(
                multiplier
              )} flex items-center justify-center h-5 m-0.5 rounded text-11 px-2`}
              id={`mult_${i}`}
            >
              {multiplier}
            </div>
          ))}
      </div>
      <Button color='GreenPrimary' onClick={() => addPlinko()}>
        Start
      </Button>
    </div>
  )
}

export default PlinkoGame2

const getRowSettings = (rows: number) => {
  const PEG_SIZE = 5
  const PLINKO_SIZE = 9
  const Y_FORCE_BASE = -0.0019
  const X_FORCE_BASE = 0.00075

  switch (rows) {
    case 8:
      return {
        pegSize: PEG_SIZE,
        plinkoSize: PLINKO_SIZE,
        yForce: Y_FORCE_BASE * 1.2 * -1,
        xForce: X_FORCE_BASE * 1.02
      }
    case 10:
      return {
        pegSize: PEG_SIZE,
        plinkoSize: PLINKO_SIZE,
        yForce: Y_FORCE_BASE * 1.05 * -1,
        xForce: X_FORCE_BASE * 0.95
      }
    case 12:
      return {
        pegSize: 4,
        plinkoSize: 8,
        yForce: Y_FORCE_BASE * 1.05 * -1,
        xForce: X_FORCE_BASE * 0.84
      }
    case 14:
      return {
        pegSize: 3.5,
        plinkoSize: 5,
        yForce: Y_FORCE_BASE * 0.967 * -1,
        xForce: X_FORCE_BASE * 0.7757
      }
    case 16:
      return {
        pegSize: 2,
        plinkoSize: 4.5,
        yForce: Y_FORCE_BASE * 0.95 * -1,
        xForce: X_FORCE_BASE * 0.7465
      }
    default:
      return {
        pegSize: PEG_SIZE,
        plinkoSize: PLINKO_SIZE,
        yForce: Y_FORCE_BASE * -1,
        xForce: X_FORCE_BASE
      }
  }
}
const getColorByMultiplier = (multiplier: number): string => {
  if (multiplier < 1) {
    return 'bg-blue-accent-five'
  }
  if (multiplier < 10) {
    return 'bg-lightblue-primary-secondary'
  }
  if (multiplier > 100) {
    return 'bg-pink-third'
  }
  return 'bg-green-primary'
}
const getPathByRows = (rows: number): number[] => {
  const result = []
  for (let i = 0; i < rows; i++) {
    const randomBit = Math.round(Math.random())
    result.push(randomBit)
  }
  return result
}
