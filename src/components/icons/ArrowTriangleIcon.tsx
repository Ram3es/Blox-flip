import { FC } from 'react'

interface ArrowTriangleIconProps {
  className?: string
}

export const ArrowTriangleIcon: FC<ArrowTriangleIconProps> = ({ className = 'inline' }) => {
  return (
    <svg
      className={className}
      width='9'
      height='8'
      viewBox='0 0 9 6'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4.49998 6C4.33869 6 4.17741 5.92807 4.05443 5.78451L0.184628 1.26463C-0.0615425 0.977107 -0.0615425 0.510942 0.184628 0.223538C0.430698 -0.0638665 0.642857 0.00798196 1.07593 0.00798455L4.49998 0.00798455L7.71429 0.00798565C8.35714 0.00798565 8.56923 -0.0637267 8.81528 0.223677C9.06157 0.511082 9.06157 0.977246 8.81528 1.26477L4.94554 5.78465C4.8225 5.92823 4.66122 6 4.49998 6Z'
        fill='currentColor'
      />
    </svg>
  )
}

export default ArrowTriangleIcon
