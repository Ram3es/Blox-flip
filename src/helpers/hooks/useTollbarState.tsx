import { useEffect, useState } from 'react'
import { ISortOptions } from '../../types/sortOptions'
import { useDebounce } from './useDebounce'

export const useToolbarState = (sorting: ISortOptions[]) => {
  const [value, onChange] = useState('')
  const [searchBy, setSearchBy] = useState('')
  const [sortOptions, setSortOptions] = useState<ISortOptions>(sorting[0])

  const debounce = useDebounce()

  useEffect(() => {
    debounce(() => setSearchBy(value))
  }, [value])
  return {
    value,
    onChange,
    sortOptions,
    setSortOptions,
    searchBy

  }
}
