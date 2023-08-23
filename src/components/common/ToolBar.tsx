import React, { FC } from 'react'
import { sortingVariants } from '../../constants/sorting'
import GreenTipSelect from '../common/GreenTipSelect'
import SearchInput from '../common/SearchInput'
import SortSelect from '../common/SortSelect'

interface IToolBarProps {
  value: string
  onChange: Function
  setSortOptions: Function
  currentOption?: string
  setPriceRange: Function
}

const ToolBar: FC<IToolBarProps> = ({ value, onChange, setSortOptions, currentOption, setPriceRange }) => {
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-8">
      <SortSelect options={sortingVariants} onSelect={setSortOptions} currentOptions={currentOption} />
      <GreenTipSelect onSelect={setPriceRange} />
      <SearchInput value={value} onChange={onChange} />
    </div>
  )
}

export default ToolBar
