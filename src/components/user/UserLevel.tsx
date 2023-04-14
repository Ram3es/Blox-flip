import { FC } from 'react'
import { IUser } from '../../types/User'

export const UserLevel: FC<Pick<IUser, 'level'>> = ({ level = 0 }) => {
  return (
    <div className='border border-pink-primary text-xs text-pink-primary font-extrabold rounded leading-5 px-2 radial--pink'>
      {level}
    </div>
  )
}
