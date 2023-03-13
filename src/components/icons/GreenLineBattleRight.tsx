import React from 'react'

const GreenLineBattleRight = ({ className }: { className: string }) => {
  return (
    <svg className={className} width="25" height="1" viewBox="0 0 25 1" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="25" width="0.999999" height="25" transform="rotate(90 25 0)" fill="url(#paint0_linear_205_2967)"/>
    <defs>
    <linearGradient id="paint0_linear_205_2967" x1="25.5" y1="0" x2="25.5" y2="25" gradientUnits="userSpaceOnUse">
    <stop stopColor="#D9D9D9" stopOpacity="0"/>
    <stop offset="1" stopColor="#46FF85"/>
    </linearGradient>
    </defs>
    </svg>
  )
}

export default GreenLineBattleRight
