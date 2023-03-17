import React from 'react'
import MethodCard from '../../components/Common/Cards/MethodCard'
import PaymentMethodContainer from '../../components/Container/PaymentMethodContainer'
import { METHODS } from '../../constants/PaymentMethods'

const WithdrawMethod = () => {
  return (
         <PaymentMethodContainer>
            <div className="px-6 w-full md:w-2/5 flex flex-col">
                <div className="text-gray-primary font-bold text-lg mb-6">{METHODS.roblox.name}</div>
                <div className="flex flex-wrap -mx-1.5 grow">
                    {METHODS.roblox.methods.map(method => (
                        <MethodCard key={method.path} {...method} />
                    ))}
                </div>
            </div>
          </PaymentMethodContainer>
  )
}

export default WithdrawMethod
