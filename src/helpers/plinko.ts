export const getRowSettingsByRows = (rows: number) => {
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

export const getRandomPathByRows = (rows: number): number[] => {
  const result = []
  for (let i = 0; i < rows; i++) {
    const randomBit = Math.round(Math.random())
    result.push(randomBit)
  }
  return result
}

export const getColorByMultiplier = (multiplier: number): string => {
  if (multiplier < 1) {
    return 'bg-blue-accent-five blue-accent-five--shadow'
  }
  if (multiplier < 10) {
    return 'bg-lightblue-primary-secondary light-blue-primary-secondary--shadow'
  }
  if (multiplier > 100) {
    return 'bg-pink-third pink-third--shadow'
  }
  return 'bg-green-primary green-primary--shadow'
}
