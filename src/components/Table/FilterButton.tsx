import { FC, ReactNode } from 'react'
import clsx from 'clsx'
import { Button } from '../base/Button'
import { TableVariant } from '../../types/table'

interface FilterButtonProps {
  onClick: () => void
  children: ReactNode
  isActive: boolean
  variant: keyof typeof TableVariant
}

export const FilterButton: FC<FilterButtonProps> = ({ onClick, children, isActive, variant }) => {
  const buttonMainClasses = clsx(
    'capitalize text-13 py-1.5 leading-2 text-center rounded mx-1 border ',
    {
      'bg-blue-accent border-blue-light text-white mb-1 w-28':
        variant === TableVariant.Feed && isActive,
      'text-gray-primary bg-blue-secondary hover:bg-blue-accent border-blue-secondary mb-1 w-28':
        variant === TableVariant.Feed && !isActive,
      'text-gray-primary bg-blue-highlight border-blue-highlight hover:text-white px-4':
        variant === TableVariant.History && !isActive,
      'text-gray-primary bg-blue-highlight border-blue-highlight hover:text-white text-white bg-blue-highlight/25 px-4':
        variant === TableVariant.History && isActive
    }
  )

  return (
    <Button onClick={onClick} className={buttonMainClasses}>
      {children}
    </Button>
  )
}
