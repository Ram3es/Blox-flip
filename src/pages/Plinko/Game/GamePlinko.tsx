import { FC, useEffect, useRef } from 'react'
import {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  World,
  Events,
  IEventCollision
} from 'matter-js'
import { config } from './config'
import PlinkoBall from '../../../assets/img/plinko_ball.png'

import { getColorByMultiplier, multipliersVariants } from './multipiliers'
import { MultiplierValues } from './types'

interface GamePlinkoProps {
  risk?: 'low' | 'medium' | 'high'
  row?: 8 | 10 | 12 | 14 | 16
}

const GamePlinko: FC<GamePlinkoProps> = ({ risk = 'high', row = 16 }) => {
  const plinkoRef = useRef<null | HTMLDivElement>(null)
  const engine = Engine.create()
  const { pins: pinsConfig, ball: ballConfig, engine: engineConfig, world: worldConfig } = config
  const worldWidth: number = worldConfig.width
  const worldHeight: number = worldConfig.height
  const lines = row
  const { world } = engine

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
  }, [])

  const pins: Body[] = []

  for (let l = 0; l < lines; l++) {
    const linePins = pinsConfig.startPins + l
    const lineWidth = linePins * pinsConfig.pinGap
    for (let i = 0; i < linePins; i++) {
      const pinX = worldWidth / 2 - lineWidth / 2 + i * pinsConfig.pinGap + pinsConfig.pinGap / 2

      const pinY = worldWidth / lines + l * pinsConfig.pinGap + pinsConfig.pinGap

      const pin = Bodies.circle(pinX, pinY, pinsConfig.pinSize, {
        label: `pin-${i}`,
        render: {
          fillStyle: '#4F5988'
        },
        isStatic: true
      })
      pins.push(pin)
    }
  }

  const paths = {}

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
      collisionFilter: {
        group: -1
      },
      render: {
        // fillStyle:"white"
        sprite: {
          texture: PlinkoBall,
          xScale: rowSettings.plinkoSize / 9,
          yScale: rowSettings.plinkoSize / 9
        }
      },
      label: 'plinko'
    })
  }

  const addPlinko = (path: number[]) => {
    const plinko = makePlinko()

    paths[plinko.id] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    // paths[plinko.id] = path
    World.add(world, plinko)
  }

  const multipliers = multipliersVariants.high[16]

  Composite.add(engine.world, [...pins])

  async function onCollideWithMultiplier(ball: Body, multiplier: Body) {
    ball.collisionFilter.group = 2
    World.remove(engine.world, ball)
    // removeInGameBall()
    const ballValue = ball.label.split('-')[1]
    const multiplierValue = +multiplier.label.split('-')[1] as MultiplierValues

    if (+ballValue <= 0) return

    const newBalance = +ballValue * multiplierValue
    // await incrementCurrentBalance(newBalance)
  }
  async function onBodyCollision(event: IEventCollision<Engine>) {
    const pairs = event.pairs
    for (const pair of pairs) {
      const { bodyA, bodyB } = pair
      if (bodyB.label.includes('ball') && bodyA.label.includes('block'))
        await onCollideWithMultiplier(bodyB, bodyA)
    }
  }

  Events.on(engine, 'collisionActive', onBodyCollision)

  return (
    <div className='flex items-center flex-col space-y-2'>
      <div ref={plinkoRef} />
      <div className='flex justify-center items-center'>
        {multipliers.map((multiplier) => (
          <div
            key={multiplier + new Date().getTime() * Math.random()}
            className={`${getColorByMultiplier(
              multiplier
            )} flex items-center justify-center h-5 m-0.5 rounded text-11 px-2`}
          >
            {multiplier}
          </div>
        ))}
      </div>
      <button onClick={() => addPlinko()}>btn</button>
    </div>
  )
}

export default GamePlinko
