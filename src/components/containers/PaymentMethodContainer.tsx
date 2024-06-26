import React, { FC, PropsWithChildren } from 'react'

const PaymentMethodContainer: FC<PropsWithChildren > = ({ children }) => {
  return (
    <div className="border-t border-b border-t-sky-primary/40 border-b-sky-primary/40 rounded mb-9">
      <div className="border--mask border--radial-blue  bg-gradient-radial from-blue-light-secondary/20 to-blue-accent-secondary/0 rounded text-sm p-5 xs:p-9 overflow-hidden relative">
        <div className="flex flex-wrap  relative z-20">
            {children}
        </div>
      </div>
    </div>
  )
}

export default PaymentMethodContainer
