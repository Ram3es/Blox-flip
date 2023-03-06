import { FC } from 'react'

interface DiamondIconProps {
  className?: string
  width?: string
  height?: string
}

export const DiamondIcon: FC<DiamondIconProps> = ({
  className = '',
  width = '14',
  height = '12'
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 16 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path d='M11.345 3.15243L8.70325 11.5179L15.0874 3.15243H11.345Z' fill='currentColor' />
      <path d='M2.97057 0.193363L0.942505 2.62704H4.39022L2.97057 0.193363Z' fill='currentColor' />
      <path d='M13.0294 0.193363L11.6097 2.62704H15.0575L13.0294 0.193363Z' fill='currentColor' />
      <path d='M4.65505 3.15243H0.912598L7.29679 11.5179L4.65505 3.15243Z' fill='currentColor' />
      <path d='M8.63428 0L11.0974 2.46311L12.5341 0H8.63428Z' fill='currentColor' />
      <path d='M3.46606 0L4.90277 2.46311L7.36588 0H3.46606Z' fill='currentColor' />
      <path d='M5.20593 3.15243L8.00005 12L10.7942 3.15243H5.20593Z' fill='currentColor' />
      <path d='M8.00007 0.10878L5.48181 2.62704H10.5183L8.00007 0.10878Z' fill='currentColor' />
    </svg>
  )
}
