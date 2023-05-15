import { FC } from 'react'
import { IMAGES } from '../../../constants/images'
import CoinsWithDiamond from '../CoinsWithDiamond'

interface IUnboxingCardProps {
  id: string
  name: string
  price: number
  onSelect: Function
}

const UnboxingCard: FC<IUnboxingCardProps> = ({ id, name, price, onSelect }) => {
  return (
    <div className='px-2 w-1/2 xxs:w-1/3 xs:w-1/4 md:w-1/6 shrink-0 lg:w-1/6 mb-4'>
      <div
        onClick={() => onSelect()}
        className='border--mask-hover border--radial-blue rounded h-full overflow-hidden text-sm group cursor-pointer'
      >
        <div className='bg-blue-accent-secondary/30 hover:bg-transparent hover:bg-gradient-radial-80 from-blue-light-secondary/30 to-blue-accent-secondary/0 rounded h-full text-center relative z-20'>
          <div className='flex flex-col items-center justify-between rounded h-full py-4 px-2'>
            <div className='bg-blue-accent-secondary/50 border border-blue-highlight rounded px-2 w-10/12 py-1 leading-4 font-semibold text-gray-primary mb-5 grow flex flex-col justify-center'>
              {name}
            </div>
            <div className='w-full pb-60% h-0 relative mb-5'>
              <img
                src={IMAGES.greenBox}
                alt='greenbox'
                width='93'
                height='101'
                loading='lazy'
                decoding='async'
                className='absolute object-contain w-full h-full'
              />
            </div>
            <CoinsWithDiamond typographyQuantity={price} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnboxingCard
