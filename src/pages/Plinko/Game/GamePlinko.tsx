import { FC, useEffect, useRef, useState } from 'react'
import Matter, { Engine, Render, Runner, Bodies, Composite, World } from 'matter-js'
import { config } from './config'
import PlinkoBall from '../../../assets/img/plinko_ball.png'

import { getColorByMultiplier, getMultiplierByLinesQnt, multipliersVariants } from './multipiliers'

interface GamePlinkoProps {
  risk?: 'low' | 'medium' | 'high'
}

const GamePlinko: FC<GamePlinkoProps> = ({ risk = 'high' }) => {
  const plinkoRef = useRef<null | HTMLDivElement>(null)
  const engine = Engine.create()
  const { pins: pinsConfig, ball: ballConfig, engine: engineConfig, world: worldConfig } = config
  const worldWidth: number = worldConfig.width
  const worldHeight: number = worldConfig.height
  const lines = 16

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

  const leftWall = Bodies.rectangle(
    worldWidth / 3 - pinsConfig.pinSize * pinsConfig.pinGap - pinsConfig.pinGap,
    worldWidth / 2 - pinsConfig.pinSize,
    worldWidth * 2,
    40,
    {
      angle: 90,
      render: {
        visible: false
      },
      isStatic: true
    }
  )
  const rightWall = Bodies.rectangle(
    worldWidth - pinsConfig.pinSize * pinsConfig.pinGap - pinsConfig.pinGap - pinsConfig.pinGap / 2,
    worldWidth / 2 - pinsConfig.pinSize,
    worldWidth * 2,
    40,
    {
      angle: -90,
      render: {
        visible: false
      },
      isStatic: true
    }
  )

  const floor = Bodies.rectangle(0, worldWidth + 10, worldWidth * 10, 40, {
    label: 'block-1',
    render: {
      visible: false
    },
    isStatic: true
  })

  const multipliers = multipliersVariants.high[16]

  Composite.add(engine.world, [...pins, rightWall, leftWall, floor])

  return (
    <div className='flex items-center flex-col space-y-2'>
      <div ref={plinkoRef} />
      <div className='flex justify-center items-center'>
        {multipliers.map((multiplier) => (
          <div
            key={multiplier + new Date().getTime() * Math.random()}
            className={`${getColorByMultiplier(multiplier)} h-5 m-0.5 rounded text-11 px-2`}
          >
            {multiplier}
          </div>
        ))}
      </div>
    </div>
  )
}

export default GamePlinko
