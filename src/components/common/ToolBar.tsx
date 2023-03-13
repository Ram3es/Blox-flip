import React, { FC } from 'react'
import { sortingVariants } from '../../constants/Sorting'
import GreenTipSelect from './GreenTipSelect'
import SearchInput from './SearchInput'
import SortSelect from './SortSelect'

interface IToolBarProps {
  value: string
  onChange: Function
  setSortOptions: Function
  currentOption: string
}

const ToolBar: FC<IToolBarProps> = ({ value, onChange, setSortOptions, currentOption }) => {
  return (
    <div className='flex flex-wrap gap-x-3 gap-y-8 mb-8' >
      <SortSelect options={sortingVariants} onSelect={setSortOptions} currentOptions={currentOption} />
      <GreenTipSelect onSelect={() => {}} />
      <SearchInput value={value} onChange={onChange} />
    </div>
  )
}

export default ToolBar
