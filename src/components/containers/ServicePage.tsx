import React, { FC, ReactNode } from 'react'

interface IServicePageContainerProps {
  title: string
  renderHeaderDescription: () => JSX.Element
  children: ReactNode

}

const ServicePageContainer: FC<IServicePageContainerProps> = ({ title, renderHeaderDescription, children }) => {
  return (
    <div className=' flex flex-col items-center xs:items-start ite w-full lg:w-[1200px]  terms-papper text-gray-primary mx-auto p-4 xxs:p-8 '>
      <h1 className='text-2xl font-bold mb-5 text-white'>{title}</h1>
      <div className='w-full border-b border-gray-700 pb-10 text-lg font-normal leading-5 '>
        {renderHeaderDescription()}
      </div>
       {children}
    </div>
  )
}

export default ServicePageContainer
