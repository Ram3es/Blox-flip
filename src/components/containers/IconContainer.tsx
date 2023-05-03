import { FC, PropsWithChildren } from 'react'

import clsx from 'clsx'
import { BaseSize } from '../../types/enums'

export enum IconContainerColorEnum {
  GreenPrimary = 'GreenPrimary',
  RedPrimary = 'RedPrimary',
  RedAccent = 'RedAccent',
  Gray = 'Gray'
}

export interface IconContainerProps {
  iconContainerColor?: keyof typeof IconContainerColorEnum
  iconContainerSize?: keyof typeof BaseSize
}

const IconContainer: FC<PropsWithChildren<IconContainerProps>> = ({
  children,
  iconContainerColor = IconContainerColorEnum.GreenPrimary,
  iconContainerSize = BaseSize.Medium
}) => {
  const IconContainerClasses = clsx('rounded flex items-center justify-center shrink-0', {
    'bg-green-primary/20 text-green-primary':
      iconContainerColor === IconContainerColorEnum.GreenPrimary,
    'bg-red-primary/20 text-red-primary': iconContainerColor === IconContainerColorEnum.RedPrimary,
    'bg-red-accent/20 text-red-accent': iconContainerColor === IconContainerColorEnum.RedAccent,
    'bg-gray-secondary-darken/40 text-gray-primary':
      iconContainerColor === IconContainerColorEnum.Gray
  })

  const sizeClasses = clsx('', {
    'w-5 h-5': iconContainerSize === BaseSize.Small,
    'w-6 h-6': iconContainerSize === BaseSize.Medium,
    'w-[26px] h-[26px]': iconContainerSize === BaseSize.Large,
    'w-[30px] h-[30px]': iconContainerSize === BaseSize.XL
  })

  return <div className={`${IconContainerClasses} ${sizeClasses}`}>{children}</div>
}
export default IconContainer
