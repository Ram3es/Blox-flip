export const formatNumber = (num: number, maxMinFraction?: number): string => {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxMinFraction
  })
}

export const localeStringToNumber = (num: string, locale: string) => {
  if (num === '') {
    return ''
  }
  const { format } = new Intl.NumberFormat(locale)
  const regexMatch = /^0(.)1$/.exec(format(0.1))
  const [, decimalSign] = regexMatch ?? []
  if (!regexMatch) {
    return ''
  }

  const decimalRegex = new RegExp(`[^${decimalSign}\\d]`, 'g')
  const numWithoutInvalidChars = num.replace(decimalRegex, '').replace(decimalSign, '.')

  return +numWithoutInvalidChars
}

export const getCostByFieldName = <T extends Record<K, number>, K extends keyof T>(
  items: T[],
  field: K
): number => {
  return items.reduce((acc, item) => acc + item[field], 0)
}
