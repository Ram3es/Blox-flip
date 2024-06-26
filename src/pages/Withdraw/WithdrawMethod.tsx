import MethodCard from '../../components/common/Cards/MethodCard'
import PaymentMethodContainer from '../../components/containers/PaymentMethodContainer'
import { METHODS } from '../../constants/paymentMethods'

const WithdrawMethod = () => {
  return (
    <PaymentMethodContainer>
      <div className="px-6 w-full md:w-2/5 flex flex-col">
        <div className="text-gray-primary font-bold text-lg mb-6">{METHODS.roblox.name}</div>
        <div className="flex flex-wrap -mx-1.5 grow">
          {METHODS.roblox.methods.map((method) => (
            <MethodCard key={method.path} {...method} />
          ))}
        </div>
      </div>
      <div className="px-6 w-full md:w-3/5 flex flex-col">
        <div className="text-gray-primary font-bold text-lg mb-6">{METHODS.crypto.name}</div>
        <div className="flex flex-wrap md:flex-nowrap">
          {METHODS.crypto.methods.map((method) => (
            <MethodCard key={method.path} {...method} />
          ))}
        </div>
      </div>
      <div className="px-6 w-full md:w-2/5 flex flex-col">
        <div className="text-gray-primary font-bold text-lg mb-6 mt-6">{METHODS.gift.name}</div>
        <div className="flex flex-wrap -mx-1.5 grow">
          {METHODS.gift.methods.map((method) => (
            <MethodCard key={method.path} {...method} />
          ))}
        </div>
      </div>
    </PaymentMethodContainer>
  )
}

export default WithdrawMethod
