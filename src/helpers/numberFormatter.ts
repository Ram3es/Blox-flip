export const formatNumber = (num: number, maxMinFraction?: number): string => {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: maxMinFraction,
    maximumFractionDigits: maxMinFraction
  })
}
