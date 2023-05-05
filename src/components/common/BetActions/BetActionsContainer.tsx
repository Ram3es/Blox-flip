import { ReactNode } from 'react'
import VerifyBets from '../VerifyBets'

interface BetActionsContainerInterface {
  isBlocked?: boolean
  children?: ReactNode
}

const BetActionsContainer = ({ children, isBlocked = false }: BetActionsContainerInterface) => {
  return (
    <div
      className={`${
        isBlocked ? 'pointer-events-none' : 'pointer-event-auto'
      } bg-blue-accent rounded-lg py-5 flex flex-col justify-between space-y-5 xxs:w-full 2xl:w-[298px]`}
    >
      <div className='mx-4'>{children}</div>
      <VerifyBets wrapClasses='flex items-end justify-center text-blue-golf pb-4' />
    </div>
  )
}

export default BetActionsContainer
