import React from 'react'
import MethodCard from '../../../components/Common/Cards/MethodCard'
import PaymentMethodContainer from '../../../components/Container/PaymentMethodContainer'
import { METHODS } from '../../../constants/PaymentMethods'

const Methods = () => {
  return (
        <PaymentMethodContainer>
          <div className="px-6 w-full md:w-2/5 flex flex-col">
            <div className="text-gray-primary font-bold text-lg mb-6">{METHODS.roblox.name}</div>
              <div className="flex flex-wrap mb-9 ">
                 {METHODS.roblox.methods.map(method => (
                   <MethodCard key={method.path} {...method} />
                 ))}
               </div>
            </div>
            <div className="px-6 w-full md:w-3/5 flex flex-col">
              <div className="text-gray-primary font-bold text-lg mb-6">{METHODS.crypto.name}</div>
                <div className="flex  flex-wrap  md:flex-nowrap mb-9  ">
                  {METHODS.crypto.methods.map(method => (
                    <MethodCard key={method.path} {...method} />
                  ))}
                </div>
              </div>
            <div className="px-6 w-full md:w-3/5">
              <div className="text-gray-primary font-bold text-lg mb-6">{METHODS.fiat.name}</div>
                <div className="flex flex-wrap  md:flex-nowrap ">
                {METHODS.fiat.methods.map(method => (
                        <MethodCard key={method.path} {...method} />
                ))}
              </div>
            </div>
        </PaymentMethodContainer>
  )
}

export default Methods
