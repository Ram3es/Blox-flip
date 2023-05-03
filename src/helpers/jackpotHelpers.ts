import { IJackpotCard } from '../types/Jackpot'

export const getSumElements = <T extends {}, K extends keyof T>(arr: T[], key: K): number => {
  if (arr.length && (typeof arr[0][key] === 'number')) {
    return arr.reduce((acc, el) => acc + (el[key] as number), 0)
  }
  return 0
}

export const getAngleTilt = (d: any): number => ((d.startAngle as number) + (d.endAngle as number)) * 90 / Math.PI

export const getColorByIndex = (index: number) => {
  if ([0, 4, 8, 12, 16, 20, 24, 28, 32].includes(index)) {
    return { arcColor: '#F59A10', stroke: '#9857AD' }
  }
  if ([1, 5, 9, 13, 17, 21, 25, 29, 33].includes(index)) {
    return { arcColor: '#5D2EA9', stroke: '#438DDE' }
  }
  if ([2, 6, 10, 14, 18, 22, 26, 30, 34].includes(index)) {
    return { arcColor: '#27D5DA', stroke: '#847FF2' }
  }
  if ([3, 7, 11, 15, 19, 23, 27, 31, 35].includes(index)) {
    return { arcColor: '#199258', stroke: '#5DE6ED' }
  }
  return ({ arcColor: '#5D2EA9', stroke: '#438DDE' })
}

export const sumItemsPrice = (items: IJackpotCard[]): number => items.reduce((acc, item) => acc + item.price, 0)
