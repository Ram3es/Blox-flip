import React from 'react'

const VerticalDivider = ({ className }: { className?: string }) => {
  return (
    <svg className={className} width="1" height="23" viewBox="0 0 1 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="1" height="23" fill="url(#paint0_linear_333_3358)"/>
    <defs>
    <linearGradient id="paint0_linear_333_3358" x1="0.5" y1="0" x2="0.5" y2="23" gradientUnits="userSpaceOnUse">
    <stop stopColor="#324B6E" stopOpacity="0"/>
    <stop offset="0.48089" stopColor="#324B6E"/>
    <stop offset="1" stopColor="#324B6E" stopOpacity="0"/>
    </linearGradient>
    </defs>
    </svg>
  )
}

export default VerticalDivider
