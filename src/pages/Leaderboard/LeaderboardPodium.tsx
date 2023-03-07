import { useState } from 'react'
import { ISecondUser } from '../../types/User'
import { users } from './mock'
import { PodiumItem } from './PodiumItem'

const getTopThreeUsers = (users: ISecondUser[]): ISecondUser[] => {
  return users.sort((a, b) => b.level - a.level).slice(0, 3)
}
const getPlaceByIndex = (index: number): 1 | 2 | 3 => {
  return index === 0 ? 1 : index === 1 ? 2 : 3
}

export const LeaderboardPodium = () => {
  const [topThreeUsers] = useState<ISecondUser[]>([...getTopThreeUsers(users)])
  console.log(topThreeUsers)

  return (
    <div className='flex flex-wrap items-end'>
      {topThreeUsers.map((user, index) => (
        <PodiumItem key={user.id} user={user} place={getPlaceByIndex(index)} />
      ))}
    </div>
  )
}
