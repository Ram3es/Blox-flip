import ItemCard from '../../../components/common/Cards/ItemCard'

import { IRootCasePotentialItem } from '../../../types/Cases'

import { DoubleRombIcon } from '../../../components/icons/DoubleRombIcon'
import { getRandomId } from '../../../helpers/casesHelpers'

export const PotentialDrops = ({ cards }: { cards: IRootCasePotentialItem[] }) => {
  return (
    <>
      <div className="flex justify-center items-center mb-6">
        <div className="h-px grow mr-2.5 bg-gradient-to-r from-blue-highlight to-blue-light-secondary/0"></div>
        <div className="min-w-fit">
          <DoubleRombIcon />
        </div>
        <span className="text-lg font-extrabold bg-clip-text text-transparent gradient-violet-text mx-2">
          POTENTIAL DROPS
        </span>
        <div className="min-w-fit rotate-180">
          <DoubleRombIcon />
        </div>
        <div className="h-px grow mr-2.5 bg-gradient-to-l from-blue-highlight to-blue-light-secondary/0"></div>
      </div>
      <div className="flex flex-wrap -mx-1 mb-8 md:mb-12 text-xs">
        {cards.length > 0 &&
          cards.map((card) => (
            <ItemCard
              key={card.name}
              id={getRandomId()}
              price={card.price}
              image={card.image}
              chance={card.chance / 1000}
              variant="CaseOpening"
              name={card.name}
              color={'Red'} // change after sended data
            />
          ))}
      </div>
    </>
  )
}
