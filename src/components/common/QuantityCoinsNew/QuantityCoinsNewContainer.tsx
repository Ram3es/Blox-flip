import { FC, PropsWithChildren, ReactNode } from 'react'

import clsx from 'clsx'

enum ColorEnum {
  Transparent = 'Transparent',
  Green = 'GreenPrimary',
  GreenDarken = 'GreenDarken'
}

enum SizeEnum {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  ExtraLarge = 'ExtraLarge'
}

interface QuantityCoinsNewContainerProps {
  children: ReactNode
  color?: keyof typeof ColorEnum
  size?: keyof typeof SizeEnum
}

const QuantityCoinsNewContainer: FC<PropsWithChildren<QuantityCoinsNewContainerProps>> = ({
  children,
  color = ColorEnum.Transparent,
  size = SizeEnum.Medium
}) => {
  const mainClasses = clsx('flex items-center gap-2 rounded', {
    'gradient-green-secondary shadow-green-primary-20 border border-green-primary ':
      color === ColorEnum.Green,
    'bg-green-primary/15': color === ColorEnum.GreenDarken
  })

  const sizeClasses = clsx('px-1.5', {
    'w-[108px] h-[31px]': size === SizeEnum.Small,
    'w-[117px] h-[31px]': size === SizeEnum.Medium,
    'w-[135px] h-[35px]': size === SizeEnum.Large
  })

  return <div className={`${mainClasses} ${sizeClasses}`}>{children}</div>
}

export default QuantityCoinsNewContainer
