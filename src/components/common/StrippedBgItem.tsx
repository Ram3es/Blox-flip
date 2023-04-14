import clsx from 'clsx'
import React, { ReactNode } from 'react'
import strippedBG from '../../assets/img/strippedBg.png'

enum EItemColor {
  Blue = 'Blue',
  Green = 'Green'
}

const StrippedBgItem = ({ children, color, wrapContentClasses }: { children?: ReactNode, color: keyof typeof EItemColor, wrapContentClasses?: string }) => {
  const bgGradient = clsx('', {
    'jp-bg-blue': color === EItemColor.Blue,
    'jp-bg-green': color === EItemColor.Green
  })
  const borderGradient = clsx('', {
    'linear-gradient(90.51deg, rgb(40, 49, 100) -97.7%, rgba(0, 0, 0, 0) 106.16%)': color === EItemColor.Blue,
    'linear-gradient(90.51deg, rgba(44, 221, 104, 0.8) -97.7%, rgba(0, 0, 0, 0) 56.16%)': color === EItemColor.Green
  })
  return (
        <div className={`${bgGradient} w-full rounded-lg relative`}>
          <div
            style={{ background: `${borderGradient}` }}
            className='rounded-lg absolute -left-[1px] -top-[1px] w-[calc(100%+2px)] h-[calc(100%+2px)] -z-10'
          />
          <div style={{ backgroundImage: `url(${strippedBG})` }} className=' bg-cover h-full w-full  rounded-lg'>
            <div className={wrapContentClasses ?? 'p-6 '}>
              {children}
            </div>
          </div>
        </div>
  )
}

export default StrippedBgItem
