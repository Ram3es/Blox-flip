import { FC, PropsWithChildren } from 'react'

export const Container: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='flex flex-col min-h-full page--bg text-sm overflow-x-hidden'>{children}</div>
  )
}
