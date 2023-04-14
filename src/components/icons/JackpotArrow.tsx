import React from 'react'

const JackpotArrow = ({ iconClasses }: { iconClasses?: string }) => {
  return (
    <svg className={iconClasses ?? ''} width="88" height="44" viewBox="0 0 88 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M44.0801 3.91699L79.0473 3.91698L44.0801 38.8842L9.11284 3.91698L22.3716 3.91698L44.0801 3.91699Z" fill="#272D46"/>
    <path d="M44.0801 3.91699L79.0473 3.91698L44.0801 38.8842L9.11284 3.91698L22.3716 3.91698L44.0801 3.91699Z" fill="url(#paint0_radial_1607_485)"/>
    <path d="M44.0801 3.91699L79.0473 3.91698L44.0801 38.8842L9.11284 3.91698L22.3716 3.91698L44.0801 3.91699Z" stroke="#202438" strokeWidth="7"/>
    <defs>
    <radialGradient id="paint0_radial_1607_485" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(44.0801 -29.7642) rotate(90) scale(63.7724)">
    <stop stopColor="#29FF71"/>
    <stop offset="1" stopColor="#272D46" stopOpacity="0"/>
    </radialGradient>
    </defs>
    </svg>
  )
}

export default JackpotArrow
