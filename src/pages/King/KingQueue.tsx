import LabelList from '../../components/common/LabelList'
import Image from '../../components/base/Image'

import type { ISecondUser } from '../../types/User'

interface KingQueueProps {
  queue: ISecondUser[]
}

const KingQueue = ({ queue }: KingQueueProps) => {
  return (
    <div className='flex items-center justify-between gap-4'>
      <div className='hidden md:flex'>
        <LabelList>Queue</LabelList>
      </div>
      <div className='h-[1px] min-w-[100px] max-w-full bg-gradient-to-r from-white to-[#323A5B] opacity-10 flex-grow flex-shrink hidden md:flex'></div>
      <div className='flex items-center justify-end gap-2 flex-wrap'>
        <div className='md:hidden'>
          <LabelList>Queue</LabelList>
        </div>
        {queue.map((item) => (
          <div
            key={item.id}
            className='w-11 h-10 border border-blue-highlight rounded overflow-hidden radial--blue'
          >
            <Image />
          </div>
        ))}
      </div>
    </div>
  )
}

export default KingQueue
