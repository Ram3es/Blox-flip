import { FC, useEffect, useRef, useState } from 'react'
import { Engine, Body, Render, Runner, Bodies, Composite, World, Events } from 'matter-js'
import { config } from './config'
import PlinkoBall from '../../../assets/img/plinko_ball.png'

import { getColorByMultiplier, multipliersVariants } from './multipiliers'
import { RowVariant } from '../../../types/Plinko'
import { Button } from '../../../components/Base/Button'
import { MultiplierValues } from './types'

interface GamePlinkoProps {
  risk?: 'low' | 'medium' | 'high'
  rows: RowVariant
}

export default function GamePlinko({ risk = 'high', rows }: GamePlinkoProps) {
  // const [plinkoPaths, setPlinkoPaths] = useState<Record<string, number[]>>({})
  const plinkoRef = useRef<null | HTMLDivElement>(null)
  const engine = Engine.create()
  const { pins: pinsConfig, ball: ballConfig, engine: engineConfig, world: worldConfig } = config
  const worldWidth: number = worldConfig.width
  const worldHeight: number = worldConfig.height
  const { world } = engine

  const padding = 133.33333333333334
  const contourSize = 50
  let columnSize = Math.round(worldWidth / (rows + 2))
  const paths: any = {}
  let forceCache = []
  let ballCache = {}
  let rowSize = worldHeight / rows

  useEffect(() => {
    if (!plinkoRef.current) {
      return
    }
    engine.gravity.y = 1.0

    const render = Render.create({
      element: plinkoRef.current,
      bounds: {
        max: {
          y: worldWidth,
          x: worldHeight
        },
        min: {
          y: 0,
          x: 0
        }
      },
      options: {
        background: 'rgba(29, 33, 53)',
        hasBounds: true,
        width: worldWidth,
        height: worldHeight,
        wireframes: false
      },
      engine
    })
    const runner = Runner.create()
    Runner.run(runner, engine)
    Render.run(render)
    return () => {
      World.clear(engine.world, true)
      Engine.clear(engine)
      render.canvas.remove()
      render.textures = {}
    }
  }, [rows])

  const leftWall = Bodies.rectangle(0, 0, padding / 2, worldHeight * 2, {
    isStatic: true,
    label: 'leftWall',
    render: {
      fillStyle: 'red'
    }
  })
  const rightWall = Bodies.rectangle(worldWidth, 0, padding / 2, worldHeight * 2, {
    isStatic: true,
    label: 'rightWall',
    render: {
      fillStyle: 'red'
    }
  })

  const bottomWall = Bodies.rectangle(
    worldWidth / 2,
    worldHeight + contourSize / 2,
    worldWidth,
    contourSize,
    {
      isStatic: true,
      label: 'bottomWall',
      render: {
        fillStyle: 'red',
        visible: true
      }
    }
  )

  const pins: Body[] = []

  for (let l = 0; l < rows; l++) {
    const linePins = pinsConfig.startPins + l
    const lineWidth = linePins * pinsConfig.pinGap
    for (let i = 0; i < linePins; i++) {
      const pinX = worldWidth / 2 - lineWidth / 2 + i * pinsConfig.pinGap + pinsConfig.pinGap / 2

      const pinY = worldWidth / rows + l * pinsConfig.pinGap + pinsConfig.pinGap

      const pin = Bodies.circle(pinX, pinY, pinsConfig.pinSize, {
        label: `pin-${Math.random()}`,
        render: {
          fillStyle: '#4F5988'
        },
        isStatic: true
      })
      pins.push(pin)
    }
  }

  const rowSettings = {
    pegSize: 2,
    plinkoSize: 4.5,
    yForce: -0.0019 * 0.95,
    xForce: 0.00075 * 0.7465
  }

  const makePlinko = () => {
    const x = Math.round(worldWidth / 2)
    const y = -5
    let r = rowSettings.plinkoSize

    return Bodies.circle(x, y, r, {
      restitution: 0,
      friction: 1,
      mass: 0.23805846,
      inverseMass: 1 / 0.23805846,
      // frictionAir: 0.05,
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

    paths[plinko.id] = generateRandomArray(rows)
    // paths[plinko.id] = path
    World.add(world, plinko)
  }

  const handleCollision = (event: any) => {
    const { pairs } = event
    pairs.forEach((pair: any, i: number) => {
      const { bodyA, bodyB } = pair
      const { label: labelA } = bodyA
      const { label: labelB } = bodyB
      console.log(bodyA, 'bodyA')
      console.log(bodyB, 'bodyB')


      if (labelA !== labelB) {
        if (labelB === 'plinko') {
          if (!ballCache[bodyB.id]) {
            ballCache[bodyB.id] = 0
          }
          ballCache[bodyB.id]++

          // const shiftedX = (worldWidth / 2 - bodyB.position.x) % (columnSize / 2)
          // Body.translate(bodyB, {
          //   x:
          //     Math.abs(shiftedX) < columnSize / 3
          //       ? shiftedX
          //       : columnSize / 2 + shiftedX * (shiftedX < 0 ? 1 : -1),
          //   y:
          //     (-bodyB.position.y + (rows - (rowSettings.pegSize + rowSettings.plinkoSize))) %
          //     rowSize
          // })


          // console.log(pair, 'PAIR')

          // Body.setStatic(bodyB, true)

          Body.translate(bodyB, {
            x: Math.random(),
            y: Math.random()
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
            labelA === 'bottomWall' ||
            labelA === 'Rectangle Body' ||
            labelA === 'leftWall' ||
            labelA === 'rightWall'
          ) {
            const rights = paths[bodyB.id].filter((val: any) => val === 1).length
            const i = (rights - (paths[bodyB.id].length - rights)) / 2 + paths[bodyB.id].length / 2
            const multiplierBox = document.getElementById(`mult_${i}`)

            if (multiplierBox?.style) {
              multiplierBox.style.transform = 'translateY(15px)'
              // multiplierBox.style.filter = 'brightness(1.5)'

              setTimeout(() => {
                // multiplierBox.style.transform = 'translateY(0px)'
                // multiplierBox.style.filter = 'brightness(1)'
              }, 1000)
            }

            World.remove(world, bodyB)
            delete paths[bodyB.id]

            return
          }
        }
      }
    })
  }

  Events.on(engine, 'collisionStart', handleCollision)

  const multipliers = multipliersVariants.high[16]

  Composite.add(engine.world, [...pins, leftWall, rightWall, bottomWall])

  return (
    <div className='flex items-center flex-col'>
      <div ref={plinkoRef} />
      <div className='flex justify-center items-center'>
        {multipliers.map((multiplier, i) => (
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

const generateRandomArray = (rows: number): number[] => {
  const result = []
  for (let i = 0; i < rows; i++) {
    const randomBit = Math.round(Math.random())
    result.push(randomBit)
  }
  return result
}
