import clsx from 'clsx'
import React from 'react'
import { IMAGES } from '../../constants/Images'

const PageLabel = ({ title, image }: { title: string, image: string }) => {
  return (
    <div className='max-h-[34px] flex items-center  md:mt-0 font-semibold xs:text-base'>
      <span className='mr-3 shrink-0'>You have selected</span>
      <span className="bg-blue-accent-secondary text-gray-primary font-semibold leading-6 py-1 px-3 rounded flex items-center">
      <span className="min-w-fit mr-2">
        <img
          src={IMAGES[image]}
          className={clsx('', {
            'w-[18px] h-[18px]': image === 'bitcoinSmall' || image === 'ethereum' || image === 'litecoin',
            'w-[37px] h-[11px]': image === 'g2a',
            'w-[26px] h-[24px]': image === 'kinguinSmall',
            'w-[31px] h-[19px]': image === 'robloxDeposite' || image === 'robuxDeposite',
            'w-[20px] h-[20px]': image === 'creditCard'
          })}
          alt="@T"
          loading="lazy"
          decoding="async"/>
      </span>
      {title}
    </span>
  </div>
  )
}

export default PageLabel
