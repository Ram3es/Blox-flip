import clsx from 'clsx'
import DoubleRombIconSolid from '../../icons/DoubleRombIconSolid'
import ItemCard from '../Cards/ItemCard'

import { IRootBattle } from '../../../types/CaseBattles'

import { getRandomId } from '../../../helpers/casesHelpers'

const UsersDrops = ({ game }: { game: IRootBattle }) => {
  const dropCardClasses = clsx('mb-2 px-1 w-1/2 point-hidden group/item is-block', {
    'sm:w-1/2 md:w-1/3 lg:w-1/4': game.max === 2,
    'sm:w-full md:w-1/2 lg:w-1/3': game.max === 3,
    'sm:w-1/2 md:w-full ls:w-1/2 ': game.max === 4
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
      <div className="p-4 pb-2 rounded-xl gradient-blue-dark">
        <div className="flex flex-wrap -mx-1 ">
          {game.caselist.map((card) => (
            <ItemCard
              itemClasses={dropCardClasses}
              // key={card.id}
              // id={card.id}
              key={getRandomId()}
              id={getRandomId()}
              name={card.name}
              price={card.price}
              image={card.image}
              // color={card.color}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default UsersDrops
