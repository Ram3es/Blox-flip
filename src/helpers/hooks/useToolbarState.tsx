import { useEffect, useState } from 'react'
import { selectItem } from '../../constants/sorting'
import { ISortOptions } from '../../types/SortOptions'
import { useDebounce } from './useDebounce'

export const useToolbarState = () => {
  const [value, onChange] = useState('')
  const [searchBy, setSearchBy] = useState('')
  const [priceRange, setPriceRange] = useState(selectItem[0])
  const [sortOptions, setSortOptions] = useState<ISortOptions | null>(null)

  const debounce = useDebounce()

  useEffect(() => {
    debounce(() => setSearchBy(value))
  }, [value])

  return {
    value,
    onChange,
    sortOptions,
    setSortOptions,
    searchBy,
    priceRange: priceRange.value,
    setPriceRange
  }
}
