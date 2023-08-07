import clsx from 'clsx'
import DoubleRombIconSolid from '../../icons/DoubleRombIconSolid'
import ItemCard from '../Cards/ItemCard'

import { IRootBattleRoundItem } from '../../../types/CaseBattles'

import { getRandomId } from '../../../helpers/casesHelpers'

interface UserDropsProps {
  slots: number
  playerHistoryRounds: IRootBattleRoundItem[]
}

const UsersDrops = ({ slots, playerHistoryRounds }: UserDropsProps) => {
  const dropCardClasses = clsx('mb-2 px-1 w-1/2 point-hidden group/item is-block', {
    'sm:w-1/2 md:w-1/3 lg:w-1/4': slots === 2,
    'sm:w-full md:w-1/2 lg:w-1/3': slots === 3,
    'sm:w-1/2 md:w-full ls:w-1/2 ': slots === 4
  })

  return (
    <>
      <div className="gradient-blue-secondary rounded-t-lg w-fit flex justify-center items-center mx-auto py-2 px-6 font-bold text-base text-gray-primary">
        <span className="w-5 shrink-0 mr-2">
          <DoubleRombIconSolid />
        </span>
        <span className="leading-5 text-center">Your drops</span>
        <span className="w-5 shrink-0 ml-2">
          <DoubleRombIconSolid iconClasses="rotate-180" />
        </span>
      </div>
      <div className="p-4 pb-2 rounded-xl min-h-[250px] gradient-blue-dark">
        <div className="flex items-center flex-wrap -mx-1 h-full">
          {playerHistoryRounds.map((item) => (
            <ItemCard
              itemClasses={dropCardClasses}
              key={getRandomId()}
              id={getRandomId()}
              name={item.skin_name}
              price={item.cost}
              image={item.skin_image}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default UsersDrops
