export const dateFormatter = (date: string, locales: string = 'en-US') => {
  const dateString = new Date(+date * 1000)
  const formatter = new Intl.DateTimeFormat(locales, {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })
  return formatter.format(dateString)
}
