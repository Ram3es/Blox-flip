
import React, { FC } from 'react'
import { IUser } from '../../types/User'
import UserProgress from '../user/UserProgress'

interface IWelcomeCardProps {
  user: IUser
}

const WelcomeCard: FC<IWelcomeCardProps> = ({ user }) => {
  return (
        <div className="px-3 mb-6 xs:mb-10 sm:mb-18 w-full xs:w-2/3 lg:w-4/6">
            <div className="border border-orange-secondary/25 welcome--radial rounded-2xl flex justify-between pt-4 overflow-hidden relative h-full">
                <img src="/src/assets/img/welcome_line.svg" alt="" width="1006" height="201" loading="lazy" decoding="async" className="absolute z-10 -inset-full m-auto" />
                <div className="relative z-20 self-end w-1/3 pt-6">
                    <img src="/src/assets/img/welcome_l.png" alt="" width="191" height="200" loading="lazy" decoding="async" className="relative z-30" />
                    <img src="/src/assets/img/welcome_l.svg" alt="" width="177" height="123" loading="lazy" decoding="async" className="absolute z-20 left-36 top-12" />
                </div>
                <div className="relative z-30 flex flex-col items-center w-1/3">
                   <UserProgress user={user} />
                    <a href="#" className="font-xs text-orange-accent leading-4 py-2 px-10 rounded-full bg-orange-secondary/15 mb-4 text-center">Welcome Back</a>
                </div>
                <div className="relative z-20 self-end -right-1.5 w-1/3 pt-6">
                    <img src="/src/assets/img/welcome_r.png" alt="" width="164" height="192" loading="lazy" decoding="async" className="relative z-30 float-right" />
                    <img src="/src/assets/img/welcome_r.svg" alt="" width="177" height="123" loading="lazy" decoding="async" className="absolute z-20 right-10 top-4" />
                </div>
            </div>
        </div>
  )
}

export default WelcomeCard
