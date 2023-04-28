import React from 'react'
import { IJackpotPlayer } from '../../../mocks/jackpotPlayer'
import { UserAvatar } from '../../user/UserAvatar'
import { UserLevel } from '../../user/UserLevel'
import { QuantityCoinsWithChildren } from '../QuantityCoins/QuantityWithChildren'

const JoinedUserRow = ({ user, userChance }: { user: IJackpotPlayer, userChance: number }) => {
  return (
        <div
          className='w-full flex items-center justify-between rounded  relative bg-[#252942]'
          >
           <div
             style={{ background: 'linear-gradient(90.51deg, rgb(40, 49, 100) 9.7%, rgba(0, 0, 0, 0) 56.16%)' }}
             className='rounded-lg absolute -left-[1px] -top-[1px] w-[calc(100%+2px)] h-[calc(100%+2px)] -z-10'
            />
            <div className='flex items-center gap-3 py-3.5'>
              <div
                style={{ background: ' linear-gradient(269.59deg, rgba(44, 221, 104, 0.19) 9.99%, rgba(41, 48, 77, 0) 181.7%)' }}
                className=' w-fit px-2.5 py-0.5 text-green-primary text-11'>
                  JOINED
              </div>
              <div className='w-9 h-8 shrink-0 border border-blue-highlight rounded my-1 overflow-hidden radial--blue '>
                <UserAvatar image={user.avatar} />
              </div>
              <div className='max-w-[120px] truncate'>{user.userName}</div>
              <div className='flex  mx-1'>
                <UserLevel level={user.level} />
              </div>
            </div>
            <div className='h-full flex rounded-r overflow-hidden gap-5 ml-2'>
                 <QuantityCoinsWithChildren quantity={user.deposit} />
                <div
                 style={{ background: ' linear-gradient(90deg, rgba(44, 221, 104, 0.19) 9.99%, rgba(41, 48, 77, 0) 171.7%)' }}
                 className=' h-full flex flex-col items-center justify-center grow  px-3 py-[20px] text-10 font-semibold'>
                    <div className='text-green-primary text-13 min-w-[50px] text-center'>{userChance} %</div>
                    <div className='leading-none'>CHANCE</div>
                </div>
            </div>
        </div>
  )
}

export default JoinedUserRow
