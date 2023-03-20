import React, { useRef, useEffect } from 'react'
import { Engine, Render, Runner, Body, Bodies, Composite } from 'matter-js'

export const GamePlinko: React.FC = () => {
  const engineRef = useRef<Engine>()
  const renderRef = useRef<Render>()
  const runnerRef = useRef<Runner>()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    engineRef.current = Engine.create()
    console.log('Engine created:', engineRef.current)

    renderRef.current = Render.create({
      element: canvasRef.current,
      engine: engineRef.current,
      options: {
        width: 600,
        height: 800,
        wireframes: false
      }
    })

    runnerRef.current = Runner.create()
    const { world } = engineRef.current

    // Создаем стены и пол
    const wallThickness = 20
    const ground = Bodies.rectangle(300, 800, 600, wallThickness, { isStatic: true })
    const leftWall = Bodies.rectangle(0, 400, wallThickness, 800, { isStatic: true })
    const rightWall = Bodies.rectangle(600, 400, wallThickness, 800, { isStatic: true })
    Composite.add(world, [ground, leftWall, rightWall])

    // Создаем пины
    const rows = 8
    const cols = 9
    const spacing = 50
    const offset = wallThickness + spacing / 2
    const pins = Composite.create()
    for (let row = 0; row < rows; row++) {
      const y = offset + row * spacing
      const startX = row % 2 === 0 ? offset : offset + spacing / 2
      for (let col = 0; col < cols; col++) {
        const x = startX + col * spacing
        const pin = Bodies.circle(x, y, 5, {
          isStatic: true,
          render: {
            fillStyle: '#ffffff'
          }
        })
        Composite.add(pins, pin)
      }
    }
    Composite.add(world, pins)

    Runner.run(runnerRef.current, engineRef.current)
    Render.run(renderRef.current)
  }, [canvasRef.current])

  return <canvas ref={canvasRef} style={{ width: '600px', height: '800px' }} />
}
