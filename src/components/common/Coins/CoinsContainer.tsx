import { FC, PropsWithChildren, ReactNode } from 'react'

import clsx from 'clsx'

enum ColorEnum {
  Transparent = 'Transparent',
  GreenGradient = 'GreenGradient',
  GreenDarken = 'GreenDarken',
  RedPrimary = 'RedPrimary'
}

enum SizeEnum {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  ExtraLarge = 'ExtraLarge'
}

interface CoinsContainerProps {
  children: ReactNode
  color?: keyof typeof ColorEnum
  size?: keyof typeof SizeEnum
}

const CoinsContainer: FC<PropsWithChildren<CoinsContainerProps>> = ({
  children,
  color = ColorEnum.Transparent,
  size = SizeEnum.Medium
}) => {
  const mainClasses = clsx('flex items-center gap-2 rounded', {
    'gradient-green-secondary shadow-green-primary-20 border border-green-primary ':
      color === ColorEnum.GreenGradient,
    'bg-green-primary/15': color === ColorEnum.GreenDarken,
    'bg-red-primary/15': color === ColorEnum.RedPrimary
  })

  const sizeClasses = clsx('px-1.5', {
    'min-w-[108px] h-[31px]': size === SizeEnum.Small,
    'min-w-[117px] h-[31px]': size === SizeEnum.Medium,
    'min-w-[135px] h-[35px]': size === SizeEnum.Large
  })

  return <div className={`${mainClasses} ${sizeClasses}`}>{children}</div>
}

export default CoinsContainer
