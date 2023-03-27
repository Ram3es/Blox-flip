import { PropsWithChildren } from 'react'
import VerifyIcon from '../../icons/VerifyIcon'

const BetActions = ({ children }: PropsWithChildren) => {
  return (
    <div className='bg-blue-accent rounded-lg py-6 flex flex-col'>
      <div className='mx-4'>{children}</div>
      <div className='flex items-end justify-center text-blue-golf pt-14'>
        <span className='mr-2'>Verify Bets</span>
        <VerifyIcon />
      </div>
    </div>
  )
}

export default BetActions
