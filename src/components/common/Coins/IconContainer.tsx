import { FC, PropsWithChildren } from 'react'

import clsx from 'clsx'

enum SizeEnum {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  XL = 'XL'
}

enum ColorEnum {
  GreenPrimary = 'GreenPrimary',
  RedPrimary = 'RedPrimary',
  RedAccent = 'RedAccent',
  Gray = 'Gray'
}

interface IconContainerProps {
  color?: keyof typeof ColorEnum
  size?: keyof typeof SizeEnum
}

const IconContainer: FC<PropsWithChildren<IconContainerProps>> = ({
  children,
  color,
  size = SizeEnum.Medium
}) => {
  const IconContainerClasses = clsx('rounded flex items-center justify-center', {
    'bg-green-primary/20 text-green-primary': color === ColorEnum.GreenPrimary,
    'bg-red-primary/20 text-red-primary': color === ColorEnum.RedPrimary,
    'bg-red-accent/20 text-red-accent': color === ColorEnum.RedAccent,
    'bg-gray-secondary-darken/40 text-gray-primary': color === ColorEnum.Gray
  })

  const sizeClasses = clsx('', {
    'w-5 h-5': size === SizeEnum.Small,
    'w-6 h-6': size === SizeEnum.Medium,
    'w-[26px] h-[26px]': size === SizeEnum.Large,
    'w-[30px] h-[30px]': size === SizeEnum.XL
  })

  return <div className={`${IconContainerClasses} ${sizeClasses}`}>{children}</div>
}
export default IconContainer
