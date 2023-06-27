import { IUser } from '../../types/User'

const UserProgress = ({ user, isFullInfo = true }: { user: IUser, isFullInfo?: boolean }) => {
  const progress = Math.floor((user?.progress?.current / user?.progress?.required) * 100).toString()
  return (
        <>
          <div className="w-18 h-17 border border-blue-highlight rounded-lg radial--blue mb-2">
            <img src={ user.avatar } alt="avatar" width="73" height="68" loading="lazy" decoding="async" className="object-cover" />
          </div>
          {isFullInfo
            ? (
          <>
          <div className="flex justify-center items-center font-extrabold mb-6">
            <div className="text-11 border border-pink-primary rounded text-pink-primary px-1 leading-4 radial--blue">{user?.level}</div>
            <div className="mx-6 text-center">{user?.name}</div>
            <div className="text-11 border border-pink-primary rounded text-pink-primary px-1 leading-4 radial--blue opacity-75 mix-blend-luminosity">{user?.level && user.level + 1 }</div>
          </div>
          <div className="bg-orange-secondary/25 border border-orange-secondary/25 rounded-full py-2 px-2.5 w-full mb-6">
              <div className="bg-orange-secondary/25 rounded-full">
                <div style={{ width: `${progress}%` }} className='bg-orange-primary h-2 rounded-full relative'>
                  <div className="text-10 leading-5 px-1.5 bg-orange-primary rounded-sm absolute left-full bottom-full whitespace-nowrap font-bold mb-2 before:border-transparent before:border-l-orange-primary before:border-8 before:absolute before:top-full before:left-0 before:-mt-2.5">
                    <span className="text-blue-highlight">
                      {user.progress.current} XP
                    </span>
                    <span>
                      / {user.progress.required}
                    </span>
                   </div>
                 </div>
              </div>
           </div>
          </>)
            : (
            <div className="flex justify-center items-center font-extrabold mb-6 gap-2">
                <div className=" text-center">{user?.name}</div>
                <div className="text-11 border border-pink-primary rounded text-pink-primary px-1 leading-4 radial--blue">{user?.level}</div>
            </div>
              ) }

        </>
  )
}

export default UserProgress
