export const formatNumber = (num: number, maxMinFraction?: number): string => {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxMinFraction
  })
}
