import clsx from 'clsx'
import { ReactNode } from 'react'

const BattleLayout = ({
  amountGamePlates,
  children
}: {
  amountGamePlates: number
  children: ReactNode
}) => {
  const overflowBehavior = clsx('overflow-auto', {
    'md:overflow-visible ': amountGamePlates === 4,
    'xs:overflow-visible': amountGamePlates === 2 || amountGamePlates === 3
  })

  const responsiveClasses = clsx('', {
    'min-w-3xl w-full': amountGamePlates === 4,
    'min-w-3xl xs:min-w-full': amountGamePlates === 2 || amountGamePlates === 3
  })
  return (
    <div className={overflowBehavior}>
      <div className={responsiveClasses}>{children}</div>
    </div>
  )
}

export default BattleLayout
