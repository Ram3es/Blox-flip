import { FC } from 'react'
import clsx from 'clsx'

enum DiamondIconSizeEnum {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE'
}

enum DiamondIconColorEnum {
  GREEN = 'GREEN',
  WHITE = 'WHITE'
}

interface DiamondIconProps {
  size?: keyof typeof DiamondIconSizeEnum
  color?: keyof typeof DiamondIconColorEnum
}

export const DiamondIcon: FC<DiamondIconProps> = ({
  size = DiamondIconSizeEnum.MEDIUM,
  color = DiamondIconColorEnum.GREEN
}) => {
  const iconClasses = clsx('text-center leading-6 relative', {
    'w-5 h-5 shrink-0 mr-2 bg-green-primary/20 rounded': size === DiamondIconSizeEnum.MEDIUM,
    'w-6 h-6 hidden xxs:block mr-3 bg-green-primary/20 rounded':
      size === DiamondIconSizeEnum.LARGE && color === DiamondIconColorEnum.GREEN,
    'xxs:block relative':
      size === DiamondIconSizeEnum.LARGE && color === DiamondIconColorEnum.WHITE
  })
  const widthSvg = clsx('', {
    16: size === DiamondIconSizeEnum.LARGE,
    15: size === DiamondIconSizeEnum.MEDIUM
  })
  const svgColor = clsx('', {
    white: color === DiamondIconColorEnum.WHITE,
    '#2CDD68': color === DiamondIconColorEnum.GREEN
  })

  return (
    <span className={iconClasses}>
      <svg
        width={widthSvg}
        height='12'
        viewBox='0 0 16 12'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='-inset-full absolute m-auto'
      >
        <path d='M11.345 3.15243L8.70325 11.5179L15.0874 3.15243H11.345Z' fill={svgColor} />
        <path d='M2.97057 0.193363L0.942505 2.62704H4.39022L2.97057 0.193363Z' fill={svgColor} />
        <path d='M13.0294 0.193363L11.6097 2.62704H15.0575L13.0294 0.193363Z' fill={svgColor} />
        <path d='M4.65505 3.15243H0.912598L7.29679 11.5179L4.65505 3.15243Z' fill={svgColor} />
        <path d='M8.63428 0L11.0974 2.46311L12.5341 0H8.63428Z' fill={svgColor} />
        <path d='M3.46606 0L4.90277 2.46311L7.36588 0H3.46606Z' fill={svgColor} />
        <path d='M5.20593 3.15243L8.00005 12L10.7942 3.15243H5.20593Z' fill={svgColor} />
        <path d='M8.00007 0.10878L5.48181 2.62704H10.5183L8.00007 0.10878Z' fill={svgColor} />
      </svg>
    </span>
  )
}
