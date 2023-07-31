import { BASE_MULTIPLIERS, PlinkoConfig } from '../constants/plinko'
import { RiskVariant } from '../types/enums'
import { RowVariant } from '../types/Plinko'

export const getRowSettingsByRows = (rows: RowVariant) => {
  const { PEG_SIZE, PLINKO_SIZE, Y_FORCE_BASE, X_FORCE_BASE } = PlinkoConfig

  switch (rows) {
    case 8:
      return {
        pegSize: PEG_SIZE,
        plinkoSize: PLINKO_SIZE,
        yForce: Y_FORCE_BASE * 1.3,
        xForce: X_FORCE_BASE * 1
      }
    case 9:
      return {
        pegSize: PEG_SIZE,
        plinkoSize: PLINKO_SIZE,
        yForce: Y_FORCE_BASE * 1,
        xForce: X_FORCE_BASE * 1
      }
    case 10:
      return {
        pegSize: PEG_SIZE,
        plinkoSize: PLINKO_SIZE,
        yForce: Y_FORCE_BASE * 1,
        xForce: X_FORCE_BASE * 1
      }
    case 11:
      return {
        pegSize: 4,
        plinkoSize: 7,
        yForce: Y_FORCE_BASE * 1.1,
        xForce: X_FORCE_BASE * 0.84
      }
    case 12:
      return {
        pegSize: 4,
        plinkoSize: 7,
        yForce: Y_FORCE_BASE * 1.1,
        xForce: X_FORCE_BASE * 0.84
      }
    case 13:
      return {
        pegSize: 3.5,
        plinkoSize: 5,
        yForce: Y_FORCE_BASE * 0.967,
        xForce: X_FORCE_BASE * 0.7757
      }
    case 14:
      return {
        pegSize: 3.5,
        plinkoSize: 5,
        yForce: Y_FORCE_BASE * 0.967,
        xForce: X_FORCE_BASE * 0.7757
      }
    case 15:
      return {
        pegSize: 3.5,
        plinkoSize: 4.5,
        yForce: Y_FORCE_BASE * 0.95,
        xForce: X_FORCE_BASE * 0.7465
      }
    case 16:
      return {
        pegSize: 3.5,
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
  if (BASE_MULTIPLIERS?.[risk] && BASE_MULTIPLIERS?.[risk]?.[row]) {
    return BASE_MULTIPLIERS[risk][row]
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

export const getPlinkoBottomFields = (risk: keyof typeof RiskVariant, rows: RowVariant) => {
  const multipliers = getMultipliersByProps(risk, rows)

  if (rows % 2 === 0) {
    return multipliers.slice(1).reverse().concat(multipliers)
  } else {
    return multipliers.slice(0).reverse().concat(multipliers)
  }
}

export const getAllIndexesByValue = <T>(array: T[], value: T) =>
  array.reduce<number[]>((acc, item, index) => (item === value ? [...acc, index] : acc), [])

export const getRandomItemFromArray = <T>(array: T[]) => {
  return array[Math.floor(Math.random() * array.length)]
}

export const getRandomValidPath = (
  risk: keyof typeof RiskVariant,
  selectedRow: RowVariant,
  multiplier: number
): number[] => {
  const currentBottomFields = getPlinkoBottomFields(risk, selectedRow)
  const possibleIndexes = getAllIndexesByValue(currentBottomFields, multiplier)
  const randomIndex = getRandomItemFromArray(possibleIndexes)

  const path: number[] = []

  for (let i = 0; i < selectedRow; i++) {
    if (randomIndex > i) {
      path.push(1)
    } else {
      path.push(0)
    }
  }
  return path
}
