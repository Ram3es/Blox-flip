import { ReactNode } from 'react'

import clsx from 'clsx'

import { BaseSize } from '../../../types/enums'

interface QuantityCoinsContainerProps {
  children: ReactNode
  size?: keyof typeof BaseSize
}

const QuantityCoinsContainer = ({ children, size = 'MEDIUM' }: QuantityCoinsContainerProps) => {
  const classes = clsx(
    'flex items-center border border-green-primary gradient-green-secondary shadow-green-primary-20 rounded justify-center',
    { 'w-32 h-10': size === BaseSize.MEDIUM, 'w-[8.5rem] h-9': size === BaseSize.SMALL }
  )

  return <div className={classes}>{children}</div>
}

export default QuantityCoinsContainer
