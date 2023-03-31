import { ReactNode } from 'react'
import VerifyIcon from '../../icons/VerifyIcon'

interface BetActionsContainerInterface {
  isBlocked?: boolean
  children?: ReactNode
}

const BetActionsContainer = ({ children, isBlocked = false }: BetActionsContainerInterface) => {
  return (
    <div
      className={`${
        isBlocked ? 'pointer-events-none' : 'pointer-event-auto'
      } bg-blue-accent rounded-lg py-5 flex flex-col justify-between space-y-5 xxs:w-full`}
    >
      <div className='mx-4'>{children}</div>
      <div className='flex items-end justify-center text-blue-golf pb-4'>
        <span className='mr-2'>Verify Bets</span>
        <VerifyIcon />
      </div>
    </div>
  )
}

export default BetActionsContainer
