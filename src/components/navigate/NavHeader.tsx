import React, { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { METHODS } from '../../constants/paymentMethods'
import { IMethodLabel } from '../../types/PaymentsMethods'
import { Button } from '../base/Button'
import TriangleArrow from '../icons/TriangleArrow'
import PageLabel from './PageLabel'

const labelProps = Object.values(METHODS).reduce<IMethodLabel[]>((acc, method) => acc.concat(method.methods), [])

const NavHeader = ({ title, pathName, children, renderIcon, wrapperClasses }: { title: string, pathName?: string, children?: ReactNode, renderIcon: () => JSX.Element, wrapperClasses?: string }) => {
  const navigate = useNavigate()
  return (
    <div className={wrapperClasses ?? ' w-full flex flex-wrap justify-between mb-8'}>
      <div className="flex items-center gap-4 mb-8">
        <Button
           onClick={() => navigate(-1)}
           className='flex items-center justify-center font-semibold p-2 leading-4 gap-1.5 group text-gray-primary rounded bg-blue-accent-secondary hover:bg-blue-accent border border-transparent '
         >
        <TriangleArrow iconClasses='rotate-90' />
        <span className='group-hover:text-white'>Back</span>
      </Button>
      {renderIcon()}
      <h3 className='text-2xl font-bold mr-6 md:mr-0'>{title}</h3>
    </div>
     { children }
     {pathName && <PageLabel {...labelProps.find(method => method.path === pathName) as IMethodLabel } /> }
  </div>
  )
}

export default NavHeader
