import { FC, PropsWithChildren } from 'react'
import CountUp from 'react-countup'

import { Button } from '../base/Button'
import Image from '../base/Image'

interface LabelWithTimerProps {
  userAvatar: string
  timer: number
}

const LabelWithTimer: FC<PropsWithChildren<LabelWithTimerProps>> = ({
  userAvatar,
  timer,
  children
}) => {
  return (
    <Button variant='GreenOutlined'>
      <div className='flex items-center justify-center w-[9.5rem] h-10'>
        <div className='w-6 h-6 border border-blue-highlight rounded overflow-hidden radial--blue'>
          <Image image={userAvatar} />
        </div>
        <p className='font-bold text-sm text-green-primary pl-2'>
          {children}{' '}
          <span className='text-white'>
            <CountUp start={30} end={1} duration={30} useEasing={false} />s
          </span>
        </p>
      </div>
    </Button>
  )
}

export default LabelWithTimer
