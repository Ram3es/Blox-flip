import { useSocketCtx } from '../../store/SocketStore'
import { IUser } from '../../types/User'

interface UserProgressInterface {
  user: IUser | null
  isFullInfo?: boolean
}

const UserProgress = ({ user, isFullInfo = true }: UserProgressInterface) => {
  const { userLevel } = useSocketCtx()

  return (
        <>
          <div className="w-18 h-17 border border-blue-highlight rounded-lg radial--blue mb-2">
            <img src={ user?.avatar ?? 'https://img.fozzyshop.com.ua/kharkiv/57227-large_default/pomidor.jpg' } alt="avatar" width="73" height="68" loading="lazy" decoding="async" className="object-cover" />
          </div>
          {isFullInfo
            ? (
          <>
          <div className="flex justify-center items-center font-extrabold mb-6">
            <div className="text-11 border border-pink-primary rounded text-pink-primary px-2.5 py-1 leading-4 radial--blue">{userLevel ? userLevel.level : 0}</div>
            <div className="mx-6 text-center">{user ? user?.name : 'Guest'}</div>
            <div className="text-11 border border-pink-primary rounded text-pink-primary px-2.5 py-1 leading-4 radial--blue grayscale">{userLevel ? userLevel.level + 1 : 1}</div>
          </div>
          <div className="bg-orange-secondary/25 border border-orange-secondary/25 rounded-full py-2 px-2.5 w-full mb-6">
              <div className="bg-orange-secondary/25 rounded-full">
                <div style={{ width: `${userLevel?.exp && userLevel?.levelup ? Math.floor((userLevel.exp / userLevel.levelup) * 100).toString() : 100}%` }} className='bg-orange-primary h-2 rounded-full relative'>
                  <div className="text-10 leading-5 px-1.5 bg-orange-primary rounded-sm absolute left-full bottom-full whitespace-nowrap font-bold mb-2 before:border-transparent before:border-l-orange-primary before:border-8 before:absolute before:top-full before:left-0 before:-mt-2.5">
                    <span className="text-blue-highlight">
                      {userLevel?.exp ? userLevel.exp : 0} XP
                    </span>
                    <span>
                      / {userLevel?.levelup ? userLevel.levelup : 0}
                    </span>
                   </div>
                 </div>
              </div>
           </div>
          </>)
            : (
            <div className="flex justify-center items-center font-extrabold mb-6 gap-2">
                <div className=" text-center">{user ? user?.name : 'Guest'}</div>
                <div className="text-11 border border-pink-primary rounded text-pink-primary px-1 leading-4 radial--blue">{userLevel ? userLevel.level : 0}</div>
            </div>
              ) }

        </>
  )
}

export default UserProgress
