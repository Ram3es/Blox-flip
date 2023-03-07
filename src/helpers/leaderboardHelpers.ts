export const getTopThreeUsers = <T, K extends keyof T>(users: T[], field: K): T[] => {
  return users.sort((a, b) => Number(b[field]) - Number(a[field])).slice(0, 3)
}

export const getPlaceByIndex = (index: number): 1 | 2 | 3 => {
  return index === 0 ? 1 : index === 1 ? 2 : 3
}
