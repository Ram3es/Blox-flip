export const OpeningLineIcon = ({
  width = '4',
  height = '29'
}: {
  width?: string
  height?: string
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 4 29'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M0 0L4 0V29H0V0Z' fill='url(#paint0_linear_173_41)' />
      <defs>
        <linearGradient
          id='paint0_linear_173_41'
          x1='2'
          y1='-22'
          x2='2'
          y2='29'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#939BB9' />
          <stop offset='1' stopColor='#939BB9' stopOpacity='0' />
        </linearGradient>
      </defs>
    </svg>
  )
}
