import { FC, PropsWithChildren, ReactNode } from 'react'

import clsx from 'clsx'

enum ColorEnum {
  Transparent = 'Transparent',
  Green = 'Green'
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
    'border border-green-primary gradient-green-secondary shadow-green-primary-20':
      color === ColorEnum.Green
  })

  const sizeClasses = clsx('', {
    'px-2 py-2': size === SizeEnum.Medium
  })

  return <div className={`${mainClasses} ${sizeClasses}`}>{children}</div>
}

export default QuantityCoinsNewContainer
