export const CopyIcon = ({ iconClasses }: { iconClasses?: string }) => {
  return (
    <svg
      className={iconClasses}
      width='29'
      height='28'
      viewBox='0 0 29 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g filter='url(#filter0_d_142_1667)'>
        <path
          d='M11.1941 15.8506C9.26771 15.8506 7.69979 14.2826 7.69979 12.3563V3.92908H6.26103C5.01377 3.92908 4 4.9427 4 6.18996V17.2893C4 18.5366 5.01377 19.5504 6.26103 19.5504H16.5381C17.7854 19.5504 18.7992 18.5366 18.7992 17.2893V15.8506H11.1941Z'
          fill='#939BB9'
        />
        <path
          d='M24.1548 2.26103C24.1548 1.01211 23.1426 0 21.8939 0H13.261C12.0121 0 11 1.01211 11 2.26103V12.5381C11 13.787 12.0121 14.7992 13.261 14.7992H21.8939C23.1426 14.7992 24.1548 13.787 24.1548 12.5381V2.26103Z'
          fill='#939BB9'
        />
      </g>
      <defs>
        <filter
          id='filter0_d_142_1667'
          x='0'
          y='0'
          width='28.1547'
          height='27.5504'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='4' />
          <feGaussianBlur stdDeviation='2' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_142_1667' />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_142_1667'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  )
}
