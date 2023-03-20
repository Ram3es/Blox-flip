import { FC } from 'react'

interface FilterHeaderProps {
  label: JSX.Element
  text: string
  textColor?: string
}

export const FilterHeader: FC<FilterHeaderProps> = ({ label, text, textColor = '' }) => {
  return (
    <div className='text-17 flex items-center justify-between whitespace-nowrap mb-5'>
      <span className='mr-2'>{label}</span>
      <span className={textColor}>{text}</span>
    </div>
  )
}
