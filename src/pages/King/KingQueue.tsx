import LabelList from '../../components/common/LabelList'
import { UserAvatar } from '../../components/user/UserAvatar'

import { ISecondUser } from '../../types/User'

interface KingQueueProps {
  queue: ISecondUser[]
}

const KingQueue = ({ queue }: KingQueueProps) => {
  return (
    <div className='flex items-center justify-between gap-4'>
      <LabelList>Queue</LabelList>
      <div className='flex flex-grow flex-shrink-0 items-center justify-between gap-4'>
        <div className='h-[1px] min-w-[100px] max-w-full bg-gradient-to-r from-white to-[#323A5B] opacity-10 flex-grow flex-shrink'></div>
        <div className='flex items-center justify-end gap-2 flex-shrink-0 overflow-hidden'>
          {queue.map((item, index) => (
            <div
              key={index}
              className='w-11 h-10 border border-blue-highlight rounded overflow-hidden radial--blue'
            >
              <UserAvatar />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default KingQueue
