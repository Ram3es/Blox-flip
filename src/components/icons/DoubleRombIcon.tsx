export const DoubleRombIcon = ({
  width = '20',
  height = '10'
}: {
  width?: string
  height?: string
}) => {
  return (
    <svg width={width} height={height} viewBox='0 0 20 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M3.5 1.5L7 5L3.5 8.5L0 5L3.5 1.5Z' fill='url(#paint0_linear_792_5)' />
      <path
        d='M3.5 1.5L7 5L3.5 8.5L0 5L3.5 1.5Z'
        fill='url(#paint1_radial_792_5)'
        fillOpacity='0.2'
      />
      <path
        d='M15.2427 0.242676L20 5.00004L15.2427 9.75739L10.4853 5.00004L15.2427 0.242676Z'
        fill='url(#paint2_linear_792_5)'
      />
      <path
        d='M15.2427 0.242676L20 5.00004L15.2427 9.75739L10.4853 5.00004L15.2427 0.242676Z'
        fill='url(#paint3_radial_792_5)'
        fillOpacity='0.2'
      />
      <defs>
        <linearGradient
          id='paint0_linear_792_5'
          x1='19.777'
          y1='5.22304'
          x2='10.2575'
          y2='4.64754'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#404970' />
          <stop offset='0.972035' stopColor='#5265B5' />
        </linearGradient>
        <radialGradient
          id='paint1_radial_792_5'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(15.2427 5.00004) rotate(135) scale(6.34107)'
        >
          <stop stopColor='#529ADD' />
          <stop offset='1' stopOpacity='0' />
        </radialGradient>
        <linearGradient
          id='paint2_linear_792_5'
          x1='19.777'
          y1='5.22304'
          x2='10.2575'
          y2='4.64754'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#404970' />
          <stop offset='0.972035' stopColor='#5265B5' />
        </linearGradient>
        <radialGradient
          id='paint3_radial_792_5'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(15.2427 5.00004) rotate(135) scale(6.34107)'
        >
          <stop stopColor='#529ADD' />
          <stop offset='1' stopOpacity='0' />
        </radialGradient>
      </defs>
    </svg>
  )
}
