import { useEffect, useRef, useState } from 'react'
import Matter, { Engine, Render, Runner, Bodies, Composite, World } from 'matter-js'
import { config } from './config'
import PlinkoBall from '../../../assets/img/plinko_ball.png'

const GamePlinko = () => {
  const plinkoRef = useRef<null | HTMLDivElement>(null)
  const engine = Engine.create()
  const { pins: pinsConfig, ball: ballConfig, engine: engineConfig, world: worldConfig } = config
  const worldWidth: number = worldConfig.width
  const worldHeight: number = worldConfig.height

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

  for (let l = 0; l < 16; l++) {
    const linePins = pinsConfig.startPins + l
    const lineWidth = linePins * pinsConfig.pinGap
    for (let i = 0; i < linePins; i++) {
      const pinX = worldWidth / 2 - lineWidth / 2 + i * pinsConfig.pinGap + pinsConfig.pinGap / 2

      const pinY = worldWidth / 16 + l * pinsConfig.pinGap + pinsConfig.pinGap

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

  const floor = Bodies.rectangle(0, worldWidth + 10, worldWidth * 10, 40, {
    label: 'block-1',
    render: {
      visible: false
    },
    isStatic: true
  })

  Composite.add(engine.world, [...pins, floor])

  return <div ref={plinkoRef} />
}

export default GamePlinko
