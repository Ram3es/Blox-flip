
import React from 'react'
import { IMethodLabel } from '../../types/payments-methods'

const PageLabel = ({ title, image, smallSize }: IMethodLabel) => {
  return (
    <div className='max-h-[34px] flex items-center  md:mt-0 font-semibold xs:text-base'>
      <span className='mr-3 shrink-0'>You have selected</span>
      <span className="bg-blue-accent-secondary text-gray-primary font-semibold leading-6 py-1 px-3 rounded flex items-center">
      <span className="min-w-fit mr-2">
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          {...smallSize}
          />
      </span>
      {title}
    </span>
  </div>
  )
}

export default PageLabel
