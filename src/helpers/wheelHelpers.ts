import { possibleBets } from '../types/Wheel'

export const getItemColorByIndex = (ticket: number, isForSvg: boolean): string => {
  if (ticket === 0) {
    return isForSvg ? 'url(#MaxWinGradient)' : 'linear-gradient(90deg, #FE4747 25%, #FFC700 95%)'
  } else if (ticket % 2 === 0) {
    return '#596180'
  } else if ([1, 9, 11, 19, 21, 33, 35, 43, 45, 53].includes(ticket)) {
    return '#4764D6'
  }
  return '#E1B850'
}

export const getItemColorByName = (name: possibleBets, isForSvg: boolean): string => {
  if (name === possibleBets.RED) {
    return isForSvg ? 'url(#MaxWinGradient)' : 'linear-gradient(90deg, #FE4747 25%, #FFC700 95%)'
  } else if (name === possibleBets.GRAY) {
    return '#596180'
  } else if (name === possibleBets.BLUE) {
    return '#4764D6'
  }
  return '#E1B850'
}

export const getColorHistory = (color: possibleBets) => {
  const colors: Record<possibleBets, string> = {
    gray: '#596180',
    blue: '#4764D6',
    red: 'linear-gradient(90deg, #FE4747 25%, #FFC700 95%)',
    yellow: '#E1B850'
  }
  return colors[color]
}

export const getTimerValue = (unixTimestamp: string, delay = 0): number => {
  const now = Date.now()
  const future = +unixTimestamp * 1000
  return Math.floor((future + delay - now) / 1000) // date to won ticket + 15sec
}
