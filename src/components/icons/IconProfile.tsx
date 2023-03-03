import React from 'react'

const IconProfile = ({ iconClasses }: { iconClasses?: string }) => {
  return (
    <svg className={`${iconClasses ?? ''}`} width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.49988 0.422211C5.01858 0.422211 2.99988 2.44091 2.99988 4.92221C2.99988 7.40351 5.01858 9.42221 7.49988 9.42221C9.98118 9.42221 11.9999 7.40351 11.9999 4.92221C11.9999 2.44091 9.98118 0.422211 7.49988 0.422211Z" fill="currentColor"/>
      <path d="M13.0989 12.3621C11.8669 11.1111 10.2336 10.4222 8.5 10.4222H6.5C4.7664 10.4222 3.13313 11.1111 1.90113 12.3621C0.675167 13.6069 0 15.25 0 16.9889C0 17.265 0.223867 17.4889 0.5 17.4889H14.5C14.7761 17.4889 15 17.265 15 16.9889C15 15.25 14.3248 13.6069 13.0989 12.3621Z" fill="currentColor"/>
    </svg>
  )
}

export default IconProfile
