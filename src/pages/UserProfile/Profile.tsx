import { useContext } from 'react'
import UserProgress from '../../components/user/UserProgress'
import CoinsWithDiamond from '../../components/common/CoinsWithDiamond'
import Preferences from './Preferences'
import { Context } from '../../store/Store'

const actions = [
  { name: 'wagered' },
  { name: 'withdrawn' },
  { name: 'deposited' },
  { name: 'profit' }
]

const Profile = ({ isOwnProfile }: { isOwnProfile: boolean }) => {
  const { state } = useContext(Context)

  return (
    <div className='h-fit'>
      <div className='profile--box border border-blue-highlight rounded-lg mb-12 mt-18 md:mt-12 relative '>
        <div className='flex flex-col justify-center items-center mx-auto relative z-20 -mt-9 w-3/4 xs:w-3/5 md:w-1/3'>
          <UserProgress isFullInfo={isOwnProfile} user={state?.user ?? null} />
        </div>
        {!isOwnProfile && <Preferences />}
        <div className='flex flex-wrap pt-6 pb-2 px-2 border-t border-blue-highlight'>
          {actions.map((action, idx) => (
            <div
              key={action.name}
              className={`${
                idx === actions.length - 1 ? 'is-green text-green-secondary' : 'text-gray-primary'
              } group px-2 w-full xxs:w-1/2 md:w-auto grow shrink-0 mb-4 flex flex-col`}
            >
              <div className='text-sm font-extrabold  mb-1.5 uppercase'>{action.name}</div>
              <div className='gradient-blue-secondary flex items-center justify-center py-8 px-5 rounded-lg grow  border border-transparent group-[.is-green]:bg-green-primary/15 group-[.is-green]:border-green-primary'>
                <CoinsWithDiamond
                  iconContainerSize='Large'
                  iconClasses='w-[18.5px] h-[15.5px]'
                  typographyQuantity={4200}
                  typographyFontSize={'Size18'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
