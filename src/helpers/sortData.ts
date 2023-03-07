export const sortData = <T, K extends keyof T>(data: T[], sortBy: K, direction: 'ASC' | 'DESC') => {
  switch (direction) {
    case 'ASC':
      return data.sort((a: T, b: T) => {
        return typeof a[sortBy] === 'string' ? String(a[sortBy]).localeCompare(String(b[sortBy])) : Number(a[sortBy]) - Number(b[sortBy])
      })
    case 'DESC':
      return data.sort((a: T, b: T) => {
        return typeof a[sortBy] === 'string' ? String(b[sortBy]).localeCompare(String(a[sortBy])) : Number(b[sortBy]) - Number(a[sortBy])
      })
    default:
      return data
  }
}
