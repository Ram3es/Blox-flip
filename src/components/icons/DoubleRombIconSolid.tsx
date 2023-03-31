import React from 'react'

const DoubleRombIconSolid = ({ iconClasses }: { iconClasses?: string }) => {
  return (
    <svg className={iconClasses ?? ''} width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect opacity="0.75" x="3.5" y="1.5" width="4.94975" height="4.94975" transform="rotate(45 3.5 1.5)" fill="currentColor"/>
      <rect x="15.2427" y="0.242188" width="6.72792" height="6.72792" transform="rotate(45 15.2427 0.242188)" fill="currentColor"/>
    </svg>
  )
}

export default DoubleRombIconSolid
