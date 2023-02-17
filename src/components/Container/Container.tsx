import { FC, PropsWithChildren } from 'react'

export const Container: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='flex flex-col min-h-full page--bg text-sm overflow-x-hidden'>
      <div className='relative z-10 py-3 px-3 xs:py-6 xs:px-6 sm:pr-78 lg:pl-12 lg:pr-84 grow max-w-full flex flex-col'>
        {children}
      </div>
    </div>
  )
}
