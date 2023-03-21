import { LinesType, MultiplierType, MultiplierValuesType } from './types'

const multipliers = {
  110: {
    label: 'block-110'
  },
  88: {
    label: 'block-88'
  },
  41: {
    label: 'block-41'
  },
  33: {
    label: 'block-33'
  },
  25: {
    label: 'block-25'
  },
  18: {
    label: 'block-18'
  },
  15: {
    label: 'block-15'
  },
  10: {
    label: 'block-10'
  },
  5: {
    label: 'block-5'
  },
  3: {
    label: 'block-3'
  },
  2: {
    label: 'block-2'
  },
  1.5: {
    label: 'block-1.5'
  },
  1: {
    label: 'block-1'
  },
  0.5: {
    label: 'block-0.5'
  },
  0.3: {
    label: 'block-0.3'
  }
} as const

export type MultipliersType = keyof typeof multipliers

export function getMultiplier(value: MultiplierValuesType): MultiplierType {
  return multipliers[value]
}

export const multiplyBlocks16Lines = [
  getMultiplier(110),
  getMultiplier(41),
  getMultiplier(10),
  getMultiplier(5),
  getMultiplier(3),
  getMultiplier(1.5),
  getMultiplier(1),
  getMultiplier(0.5),
  getMultiplier(0.3),
  getMultiplier(0.5),
  getMultiplier(1),
  getMultiplier(1.5),
  getMultiplier(3),
  getMultiplier(5),
  getMultiplier(10),
  getMultiplier(41),
  getMultiplier(110)
]

export const multiplyBlocksByLinesQnt = {
  16: multiplyBlocks16Lines
}

export function getMultiplierByLinesQnt(value: LinesType): MultiplierType[] {
  return multiplyBlocksByLinesQnt[value]
}

export const multipliersVariants = {
  low: {
    8: [0.48, 0.96, 1.06, 2.01, 5.37],
    10: [0.48, 0.96, 1.06, 1.34, 2.88, 8.54],
    12: [0.48, 0.96, 1.06, 1.34, 1.54, 2.88, 9.6],
    14: [0.48, 0.96, 1.06, 1.25, 1.34, 1.82, 3.84, 6.81],
    16: [0.48, 0.96, 1.06, 1.15, 1.34, 1.34, 1.92, 8.64, 15.3]
  },
  medium: {
    8: [0.38, 0.67, 1.25, 2.88, 12.5],
    10: [0.38, 0.58, 1.34, 1.92, 4.8, 21.1],
    12: [0.29, 0.58, 1.06, 1.92, 3.84, 10.6, 31.7],
    14: [0.19, 0.48, 0.96, 1.82, 3.84, 6.72, 14.4, 55.6],
    16: [0.29, 0.48, 0.96, 1.44, 2.88, 4.8, 9.6, 39.3, 105.5]
  },
  high: {
    8: [0.19, 0.29, 1.44, 3.84, 27.8],
    10: [0.19, 0.29, 0.86, 2.88, 9.6, 72.9],
    12: [0.19, 0.19, 0.67, 1.92, 7.77, 23.0, 163.1],
    14: [0.19, 0.19, 0.29, 1.82, 4.8, 17.3, 53.7, 403.0],
    16: [
      0.19, 0.19, 0.19, 1.92, 3.84, 8.64, 24.9, 124.7, 959.5, 0.19, 0.19, 1.92, 3.84, 8.64, 24.9,
      124.7, 959.5
    ]
  }
}

export const getColorByMultiplier = (multiplier: number): string => {
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
