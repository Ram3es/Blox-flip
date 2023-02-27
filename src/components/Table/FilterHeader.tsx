import { FC } from 'react'

interface FilterHeaderProps {
  label: JSX.Element
  text: string
}

export const FilterHeader: FC<FilterHeaderProps> = ({ label, text }) => {
  return (
    <div className='text-17 whitespace-nowrap mb-5'>
      {label}
      {text}
    </div>
  )
}
