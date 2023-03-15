import React from 'react'

const BlueLine = ({ className }: { className: string }) => {
  return (
    <svg className={className} width="94" height="1" viewBox="0 0 94 1" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="94" width="0.999996" height="94" transform="rotate(90 94 0)" fill="url(#paint0_linear_282_142)"/>
    <defs>
    <linearGradient id="paint0_linear_282_142" x1="94.5" y1="0" x2="94.5" y2="94" gradientUnits="userSpaceOnUse">
    <stop stopColor="#D9D9D9" stopOpacity="0"/>
    <stop offset="1" stopColor="#6389FF"/>
    </linearGradient>
    </defs>
    </svg>
  )
}

export default BlueLine
