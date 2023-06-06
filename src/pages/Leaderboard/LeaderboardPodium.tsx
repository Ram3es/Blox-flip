
import { getPlaceByIndex, getTopThreeUsers } from '../../helpers/leaderboardHelpers'
import { ILeaderbordUser } from '../../types/User'

// import { users } from '../../mocks/leaderboardMock'
import { PodiumItem } from './PodiumItem'

export const LeaderboardPodium = ({ users }: { users: ILeaderbordUser[] }) => {
  const topThreeUsers = getTopThreeUsers(users, 'level')
  return (
    <div className='flex flex-wrap items-end'>
      {topThreeUsers.map((user, index) => (
        <PodiumItem key={user.id} user={user} place={getPlaceByIndex(index)} />
      ))}
    </div>
  )
}
