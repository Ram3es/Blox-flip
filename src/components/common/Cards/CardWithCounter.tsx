import clsx from 'clsx'
import { IMAGES } from '../../../constants/images'
import Counter from '../../base/Counter'
import CoinsWithDiamond from '../CoinsWithDiamond'

enum CardEnumVariant {
  Default = 'Default',
  Gift = 'Gift'
}

interface CardWithCounterProps {
  name: string
  price: number
  count: number
  image?: string
  increment: () => void
  decrement: () => void
  variant?: keyof typeof CardEnumVariant
  handleClick?: () => void
}

const CardWithCounter = ({
  name,
  price,
  count,
  image,
  increment,
  decrement,
  variant = CardEnumVariant.Default,
  handleClick
}: CardWithCounterProps) => {
  return (
    <div onClick={handleClick} className="p-1.5 w-full xxxs:w-1/2 xxs:w-1/3 xs:w-1/4 md:w-1/5 lg:w-1/6 shrink-0">
      <div className="border--mask border--radial-blue overflow-hidden text-sm bg-gradient-radial-80 from-blue-light-secondary/30 to-blue-accent-secondary/0 rounded h-full text-center relative z-20">
        <div className="grid grid-cols-1 place-items-center rounded h-full py-4 px-2 relative z-20 border-y border-y-sky-primary/30">
          <div
            className={clsx(
              'min-h-[42px] px-2 w-10/12 py-1 leading-4 font-semibold text-gray-primary',
              {
                'bg-blue-accent-secondary/50 border border-blue-highlight rounded':
                  variant === CardEnumVariant.Default
              }
            )}
          >
            {name}
          </div>
          <div
            className={clsx('flex items-center justify-center', {
              'row-start-4': variant === CardEnumVariant.Gift && count === 0,
              hidden: variant === CardEnumVariant.Gift && count > 0
            })}
          >
            <CoinsWithDiamond typographyQuantity={price} />
          </div>
          <div className="w-full pb-60% h-0 relative mb-4 mt-3">
            <img
              src={image ?? IMAGES.greenBox}
              alt="greenbox"
              width="93"
              height="101"
              loading="lazy"
              decoding="async"
              className="absolute object-contain w-full h-full"
            />
          </div>
          <div
            className={clsx('', {
              hidden: variant === CardEnumVariant.Gift && count <= 0
            })}
          >
            <Counter count={count} increment={increment} decrement={decrement} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardWithCounter
