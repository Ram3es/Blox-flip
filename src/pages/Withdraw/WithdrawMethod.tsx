import React from 'react'
import MethodCard from '../../components/common/Cards/MethodCard'

const methods = [
  {
    path: 'roblox-limiteds',
    title: 'Roblox Methods',
    image: 'robloxDeposite'
  },
  {
    path: 'robux',
    title: 'Robux',
    image: 'robuxDeposite'
  }
]

const WithdrawMethod = () => {
  return (
    <div className="border-t border-b border-t-sky-primary/40 border-b-sky-primary/40 rounded mb-9">
    <div className="border--mask border--radial-blue  bg-gradient-radial from-blue-light-secondary/20 to-blue-accent-secondary/0 rounded text-sm p-5 xs:p-9 overflow-hidden relative">
        <div className="flex flex-wrap -mx-6 relative z-20">
            <div className="px-6 w-full md:w-2/5 flex flex-col">
                <div className="text-gray-primary font-bold text-lg mb-6">Roblox Methods</div>
                <div className="flex flex-wrap -mx-1.5 grow">
                    {methods.map(method => (
                        <MethodCard key={method.path} {...method} />
                    ))}
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default WithdrawMethod
