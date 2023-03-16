import React from 'react'

const YellowLine = ({ className }: { className: string }) => {
  return (
    <svg className={className} width="93" height="1" viewBox="0 0 93 1" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="0.999996" height="93" transform="matrix(-4.37114e-08 1 1 4.37114e-08 0 0)" fill="url(#paint0_linear_282_141)"/>
    <defs>
    <linearGradient id="paint0_linear_282_141" x1="0.499998" y1="0" x2="0.499998" y2="93" gradientUnits="userSpaceOnUse">
    <stop stopColor="#D9D9D9" stopOpacity="0"/>
    <stop offset="1" stopColor="#FFB84C"/>
    </linearGradient>
    </defs>
    </svg>
  )
}

export default YellowLine
