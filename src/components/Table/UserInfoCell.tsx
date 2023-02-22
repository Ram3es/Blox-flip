import { FC } from 'react'
import { User } from '../LiveFeed/LiveFeed2'

interface UserInfoCellProps {
  user: User
}

export const UserInfoCell: FC<UserInfoCellProps> = ({ user }) => {
  return (
    <>
      <div className='flex items-center justify-between text-left'>
        <div className='w-8 h-8 shrink-0 border border-blue-highlight rounded-full overflow-hidden radial--gray mr-2.5'>
          <img
            src={user.avatar}
            alt=''
            width='40'
            height='37'
            loading='lazy'
            decoding='async'
            className='object-cover w-full h-full'
          />
        </div>
        <div className='flex grow items-center'>
          <span className='font-bold grow relative py-1 mr-2 text-white'>{user.username}</span>
          <span className='border border-pink-primary text-pink-primary font-extrabold rounded leading-5 px-2 radial--pink text-11'>
            {user.level}
          </span>
        </div>
      </div>
    </>
  )
}
