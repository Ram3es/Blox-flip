import { useEffect, useRef, useState } from 'react'
import Matter, { Engine, Render, Runner, Bodies, Composite } from 'matter-js'

export default function GamePlinko() {
  const worldWidth = 800
  const startPins = 5
  const pinLines = 25
  const pinSize = 3
  const pinGap = 30
  const ballSize = 5
  const ballElastity = 0.75

  const plinkoRef = useRef(null)
  const [isMounted, setIsMounted] = useState(false)

  // useEffect(() => {
  //   engine.gravity.y = 1.0
  //   const element = document.getElementById('plinko')
  //   const render = Render.create({
  //     element: element!,
  //     bounds: {
  //       max: {
  //         y: worldHeight,
  //         x: worldWidth
  //       },
  //       min: {
  //         y: 0,
  //         x: 0
  //       }
  //     },
  //     options: {
  //       background: colors.background,
  //       hasBounds: true,
  //       width: worldWidth,
  //       height: worldHeight,
  //       wireframes: false
  //     },
  //     engine
  //   })
  //   const runner = Runner.create()
  //   Runner.run(runner, engine)
  //   Render.run(render)
  //   return () => {
  //     World.clear(engine.world, true)
  //     Engine.clear(engine)
  //     render.canvas.remove()
  //     render.textures = {}
  //   }
  // }, [lines])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted && plinkoRef.current) {
      // create an engine
      let engine = Engine.create()

      // create a renderer
      let render = Render.create({
        element: plinkoRef.current,
        engine
      })

      const pins = []
      for (let l = 0; l < pinLines; l++) {
        const linePins = startPins + l
        const lineWidth = linePins * pinGap
        for (let i = 0; i < linePins; i++) {
          const pin = Bodies.circle(
            worldWidth / 2 - lineWidth / 2 + i * pinGap,
            100 + l * pinGap,
            pinSize,
            {
              isStatic: true
            }
          )
          pins.push(pin)
        }
      }
      Composite.add(engine.world, pins)

      const ball = Bodies.circle(worldWidth / 2, 0, ballSize, {
        restitution: ballElastity
      })
      Composite.add(engine.world, [ball])

      // run the renderer
      Render.run(render)

      // create runner
      let runner = Runner.create()

      // run the engine
      Runner.run(runner, engine)

      return () => {
        // cleanup
        Render.stop(render)
        Runner.stop(runner)
        Matter.Composite.clear(engine.world)
        Matter.Engine.clear(engine)
      }
    }
  }, [isMounted])

  return <div className='bg-blue-primary' id='plinko' ref={plinkoRef} />
}
