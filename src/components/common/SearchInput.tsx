import React from 'react'
import SearchIcon from '../Icons/SearchIcon'

const SearchInput = ({ value, onChange }: { value: string, onChange: Function }) => {
  return (
    <div className=" bg-blue-accent-secondary/25 border border-blue-highlight rounded text-gray-primary w-full xxs:w-40 flex items-center h-[34px] py-1 px-2  mr-2.5">
    <div className="mr-2 w-3.5 shrink-0">
      <SearchIcon/>
    </div>
    <input
      type="text"
      placeholder="Search item"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="grow w-0 mr-2 focus:text-white bg-transparent bg-none border-none outline-none shadow-none" />
  </div>
  )
}

export default SearchInput
