import { useCallback } from 'react'

export const resetColumnFilterHelper = <T>(
  setCurrentColumn: (column: string) => void,
  setSearchValue: (value: string) => void,
  setColumnFilters: (filters: T[]) => void,
  columnFilters: T[]
) => {
  return useCallback(() => {
    setCurrentColumn('')
    setSearchValue('')
    setColumnFilters([])
  }, [columnFilters])
}

export const handleFilterByValueHelper = (
  setCurrentColumn: (column: string) => void,
  setSearchValue: (value: string) => void
) => {
  return useCallback(
    (column: string, value: string) => {
      setCurrentColumn(column)
      setSearchValue(value)
    },
    [setCurrentColumn, setSearchValue]
  )
}
