export const formatNumber = (num: number, maxMinFraction?: number): string => {
  return num.toLocaleString('en-IN', {
    minimumFractionDigits: maxMinFraction,
    maximumFractionDigits: maxMinFraction
  })
}
