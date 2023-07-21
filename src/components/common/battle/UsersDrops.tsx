import clsx from 'clsx'
import { IItemCard } from '../../../types/ItemCard'
import DoubleRombIconSolid from '../../icons/DoubleRombIconSolid'
import ItemCard from '../Cards/ItemCard'

const UsersDrops = ({
  cards,
  amountGamePlates
}: {
  cards?: IItemCard[]
  amountGamePlates: number
}) => {
  const responsiveDropCards = clsx('mb-2 px-1 w-1/2 point-hidden group/item is-block', {
    'sm:w-1/2 md:w-1/3 lg:w-1/4': amountGamePlates === 2,
    'sm:w-full md:w-1/2 lg:w-1/3': amountGamePlates === 3,
    'sm:w-1/2 md:w-full ls:w-1/2 ': amountGamePlates === 4
  })
  return cards?.length && (
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
          {cards?.map((card) => (
            <ItemCard
              itemClasses={responsiveDropCards}
              key={card.id}
              id={card.id}
              name={card.name}
              price={card.price}
              image={card.image}
              color={card.color}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default UsersDrops
