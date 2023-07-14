import { getPlaceByIndex } from '../../helpers/leaderboardHelpers'
import { ILeaderboardUser } from '../../types/User'

import { PodiumItem } from './PodiumItem'

export const LeaderboardPodium = ({ users }: { users: ILeaderboardUser[] }) => {
  return (
    <div className="flex flex-wrap items-end">
      {users.map((user, index) => (
        <PodiumItem key={user.id} user={user} place={getPlaceByIndex(index)} />
      ))}
    </div>
  )
}
