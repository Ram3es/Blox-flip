import { useState } from 'react'
import { getPlaceByIndex, getTopThreeUsers } from '../../helpers/leaderboardHelpers'
import { ISecondUser } from '../../types/User'
import { users } from './mock'
import { PodiumItem } from './PodiumItem'

export const LeaderboardPodium = () => {
  const [topThreeUsers] = useState<ISecondUser[]>([...getTopThreeUsers(users, 'level')])

  return (
    <div className='flex flex-wrap items-end'>
      {topThreeUsers.map((user, index) => (
        <PodiumItem key={user.id} user={user} place={getPlaceByIndex(index)} />
      ))}
    </div>
  )
}
