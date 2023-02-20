import { FC } from 'react'
import clsx from 'clsx'

interface ChatFabProps {
  onClick: () => void
  active: boolean
}

export const ChatFab: FC<ChatFabProps> = ({ onClick, active }) => {
  const fabClasses = clsx(
    'ease-out duration-300 fixed z-50 right-0 top-1/2 w-32 -mt-24 text-xs text-center leading-8 -rotate-90 font-bold gradient-green rounded shadow-green-20 origin-bottom-right block sm:hidden',
    {
      '': !active,
      'right-72': active
    }
  )

  return (
    <div onClick={onClick} className={fabClasses}>
      {active ? 'Close X' : 'Chat'}
    </div>
  )
}
