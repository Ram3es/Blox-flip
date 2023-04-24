import clsx from 'clsx'
import React, { ReactNode } from 'react'

enum ELabelVariant {
  INSIDE = 'INSIDE',
  LEFT = 'LEFT',
  CENTER = 'CENTER'
}

const FieldWithLabel = ({ children, labelVariant, title, labelClasses }: { children: ReactNode, labelVariant: keyof typeof ELabelVariant, title: string, labelClasses?: string }) => {
  const labelPosition = clsx(`${labelClasses ?? 'py-1.5 px-4 text-gray-primary gradient-blue-secondary'}`, {
    'rounded absolute left-4': labelVariant === ELabelVariant.INSIDE,
    'rounded-t-xl w-fit': labelVariant === ELabelVariant.LEFT,
    'rounded-t-xl w-fit mx-auto': labelVariant === ELabelVariant.CENTER

  })
  return (
    <div className={`${labelVariant === ELabelVariant.INSIDE ? 'flex items-center' : ''} relative `}>
      <div className={labelPosition}>{title}</div>
      <div className={`flex justify-end items-center w-full min-h-[56px] gradient-trivia-field rounded-[10px] px-5 ${labelVariant === ELabelVariant.LEFT ? 'rounded-tl-none' : ''}`}>
        {children}
      </div>
    </div>
  )
}

export default FieldWithLabel
