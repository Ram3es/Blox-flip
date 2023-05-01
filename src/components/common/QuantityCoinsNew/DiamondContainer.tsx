import { FC, PropsWithChildren } from 'react'

import clsx from 'clsx'

enum DiamondColorEnum {
  Green = 'Green',
  Red = 'Red',
  Gray = 'Gray'
}

interface DiamondContainerProps {
  color?: keyof typeof DiamondColorEnum
}

const DiamondContainer: FC<PropsWithChildren<DiamondContainerProps>> = ({ children, color }) => {
  const diamondContainerClasses = clsx('w-6 h-6 rounded flex items-center justify-center', {
    'bg-green-primary/20 text-green-primary': color === DiamondColorEnum.Green,
    'bg-red-accent/20 text-red-accent': color === DiamondColorEnum.Red,
    'bg-gray-secondary-darken/40 text-gray-primary': color === DiamondColorEnum.Gray
  })

  return <div className={diamondContainerClasses}>{children}</div>
}
export default DiamondContainer
