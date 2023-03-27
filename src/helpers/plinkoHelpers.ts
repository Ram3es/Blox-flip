import { PlinkoConfig } from '../constants/plinko'
import { RiskVariant } from '../types/enums'
import { RowVariant } from '../types/Plinko'

export const getRowSettingsByRows = (rows: number) => {
  const { PEG_SIZE, PLINKO_SIZE, Y_FORCE_BASE, X_FORCE_BASE } = PlinkoConfig

  switch (rows) {
    case 8:
      return {
        pegSize: PEG_SIZE,
        plinkoSize: PLINKO_SIZE,
        yForce: Y_FORCE_BASE * 1.3,
        xForce: X_FORCE_BASE * 1
      }
    case 10:
      return {
        pegSize: PEG_SIZE,
        plinkoSize: PLINKO_SIZE,
        yForce: Y_FORCE_BASE * 1,
        xForce: X_FORCE_BASE * 1
      }
    case 12:
      return {
        pegSize: 4,
        plinkoSize: 8,
        yForce: Y_FORCE_BASE * 1.05,
        xForce: X_FORCE_BASE * 0.84
      }
    case 14:
      return {
        pegSize: 3.5,
        plinkoSize: 5,
        yForce: Y_FORCE_BASE * 0.967,
        xForce: X_FORCE_BASE * 0.7757
      }
    case 16:
      return {
        pegSize: 2,
        plinkoSize: 4.5,
        yForce: Y_FORCE_BASE * 0.95,
        xForce: X_FORCE_BASE * 0.7465
      }
    default:
      return {
        pegSize: PEG_SIZE,
        plinkoSize: PLINKO_SIZE,
        yForce: Y_FORCE_BASE,
        xForce: X_FORCE_BASE
      }
  }
}

export const getMultipliersByProps = (
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
