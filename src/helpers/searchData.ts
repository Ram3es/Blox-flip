export const searchData = <T, K extends keyof T >(data: T[], searchBy: K, search: string) => {
  return data.filter(card => {
    const value = card[searchBy] as string
    return value.toLowerCase().includes(search.trim().toLowerCase()) && card
  })
}
