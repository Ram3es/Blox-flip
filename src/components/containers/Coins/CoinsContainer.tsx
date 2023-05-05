import { FC, PropsWithChildren, ReactNode } from 'react'

import clsx from 'clsx'

import { BaseSize } from '../../../types/enums'

enum CoinsContainerColorEnum {
  Transparent = 'Transparent',
  GreenGradient = 'GreenGradient',
  GreenGradientSecondary = 'GreenGradientSecondary',
  GreenDarken = 'GreenDarken',
  RedPrimary = 'RedPrimary'
}

export interface CoinsContainerProps {
  children?: ReactNode
  containerColor?: keyof typeof CoinsContainerColorEnum
  containerSize?: keyof typeof BaseSize
}

const CoinsContainer: FC<PropsWithChildren<CoinsContainerProps>> = ({
  children,
  containerColor = CoinsContainerColorEnum.Transparent,
  containerSize = BaseSize.Medium
}) => {
  const mainClasses = clsx('flex items-center gap-2 rounded', {
    'gradient-green-secondary shadow-green-primary-20 border border-green-primary':
      containerColor === CoinsContainerColorEnum.GreenGradient,
    'gradient-green-secondary shadow-green-primary-20':
      containerColor === CoinsContainerColorEnum.GreenGradientSecondary,
    'bg-green-primary/15': containerColor === CoinsContainerColorEnum.GreenDarken,
    'bg-red-primary/15': containerColor === CoinsContainerColorEnum.RedPrimary
  })

  const sizeClasses = clsx('px-1.5', {
    'h-[31px]': containerSize === BaseSize.Small,
    'min-w-[50px] h-[35px]': containerSize === BaseSize.Medium,
    'min-w-[130px] h-[40px]': containerSize === BaseSize.Large,
    'min-w-[130px] h-[43px]': containerSize === BaseSize.XL,
    'min-w-[150px] h-[50px]': containerSize === BaseSize.XXL
  })

  return <div className={`${mainClasses} ${sizeClasses}`}>{children}</div>
}

export default CoinsContainer
