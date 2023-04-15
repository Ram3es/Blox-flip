import React from 'react'

const GreenVector = ({ iconClasses }: { iconClasses?: string }) => {
  return (
    <svg className={ iconClasses ?? '' } width="36" height="19" viewBox="0 0 36 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M35.8446 0.131938C35.6647 0.00653076 35.3792 -0.0314806 35.1371 0.0331344L18.0023 6.90909L0.867489 0.0331344C0.356057 -0.11649 -0.229438 0.271914 0.0917735 0.572745L17.4686 18.8127C17.6856 19.0605 18.319 19.0643 18.536 18.8127L35.9129 0.57273C36.0494 0.43213 36.0246 0.253515 35.8446 0.131938Z" fill="currentColor"/>
    </svg>
  )
}

export default GreenVector
