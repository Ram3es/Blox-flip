import { ReactNode } from 'react'

const LabelList = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className='py-2 px-4 text-gray-primary text-15 font-bold w-max whitespace-nowrap'
      style={{
        background: 'rgba(12, 15, 31, 0.3)',
        border: '1px solid rgba(147, 155, 185, 0.25)',
        borderRadius: '3px'
      }}
    >
      {children}
    </div>
  )
}

export default LabelList
