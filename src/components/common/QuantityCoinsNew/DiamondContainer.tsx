import { FC, PropsWithChildren } from 'react'

import clsx from 'clsx'

enum SizeEnum {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  ExtraLarge = 'ExtraLarge'
}

enum ColorEnum {
  Green = 'Green',
  Red = 'Red',
  Gray = 'Gray'
}

interface DiamondContainerProps {
  color?: keyof typeof ColorEnum
  size?: keyof typeof SizeEnum
}

const DiamondContainer: FC<PropsWithChildren<DiamondContainerProps>> = ({
  children,
  color,
  size = SizeEnum.Medium
}) => {
  const diamondContainerClasses = clsx('rounded flex items-center justify-center', {
    'bg-green-primary/20 text-green-primary': color === ColorEnum.Green,
    'bg-red-accent/20 text-red-accent': color === ColorEnum.Red,
    'bg-gray-secondary-darken/40 text-gray-primary': color === ColorEnum.Gray
  })

  const sizeClasses = clsx('', {
    'w-5 h-5': size === SizeEnum.Small,
    'w-6 h-6': size === SizeEnum.Medium
  })

  return <div className={`${diamondContainerClasses} ${sizeClasses}`}>{children}</div>
}
export default DiamondContainer
