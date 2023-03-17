import React, { FC } from 'react'
import { sortingVariants } from '../../constants/Sorting'
import GreenTipSelect from '../Common/GreenTipSelect'
import SearchInput from '../Common/SearchInput'
import SortSelect from '../Common/SortSelect'

interface IToolBarProps {
  value: string
  onChange: Function
  setSortOptions: Function
  currentOption?: string
  setPriceRange: Function
}

const ToolBar: FC<IToolBarProps> = ({ value, onChange, setSortOptions, currentOption, setPriceRange }) => {
  return (
    <div className='flex flex-wrap gap-x-3 gap-y-8 mb-8' >
      <SortSelect options={sortingVariants} onSelect={setSortOptions} currentOptions={currentOption} />
      <GreenTipSelect onSelect={setPriceRange} />
      <SearchInput value={value} onChange={onChange} />
    </div>
  )
}

export default ToolBar
