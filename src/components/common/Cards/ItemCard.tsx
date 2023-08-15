import { FC } from 'react'
import clsx from 'clsx'
// import { IMAGES } from '../../../constants/images'
import SelectedIcon from '../../icons/SelectedIcon'
import Image from '../../base/Image'
import CoinsWithDiamond from '../CoinsWithDiamond'
import { TypographySizeEnum } from '../../../types/enums'

enum BorderColorEnum {
  Red = 'Red',
  Pink = 'Pink',
  Orange = 'Orange',
  Blue = 'Blue',
  Green = 'Green'
}

enum ItemCardVariantEnum {
  Standard = 'Standard',
  CaseOpening = 'CaseOpening',
  FourByFour = 'FourByFour',
  CoinFlip = 'CoinFlip',
  KingList = 'KingList',
  CaseAdminItem = 'CaseAdminItem',
}

export interface IItemCardProps {
  id: string | number
  name: string
  price: number
  image: string
  chance?: number
  onSelect?: Function
  isSelected?: boolean
  color?: string
  itemClasses?: string
  variant?: keyof typeof ItemCardVariantEnum
  userAvatar?: string
}

const ItemCard: FC<IItemCardProps> = ({
  id,
  image,
  name,
  price,
  chance,
  onSelect,
  isSelected,
  color,
  itemClasses,
  variant = ItemCardVariantEnum.Standard,
  userAvatar
}) => {
  const borderRadial = clsx('', {
    'border--radial-orange': color === BorderColorEnum.Orange,
    'border--radial-blue': color === BorderColorEnum.Blue,
    'border--radial-green': color === BorderColorEnum.Green,
    'border--radial-pink': color === BorderColorEnum.Pink,
    'border--radial-red': color === BorderColorEnum.Red
  })

  const gradient = clsx('', {
    'from-orange-primary-light/20 to-dark/0': color === BorderColorEnum.Orange,
    'from-sky-primary/20 to-dark/0': color === BorderColorEnum.Blue,
    'from-green-primary-light/20 to-dark/0': color === BorderColorEnum.Green,
    'from-pink-primary-darken/20 to-dark/0': color === BorderColorEnum.Pink,
    'from-red-secondary/20 to-dark/0': color === BorderColorEnum.Red
  })

  const variantClasses = clsx(
    `${isSelected ? 'is-selected' : ''} px-1 w-1/2 shrink-0 mb-2 group/item`,
    {
      'xxs:w-1/4 xs:w-1/5 md:w-1/6 lg:w-1/7': variant === ItemCardVariantEnum.Standard,
      'xxs:w-1/4 xs:w-1/5 md:w-1/7 lg:w-1/9 is-percent': variant === ItemCardVariantEnum.CaseOpening,
      'xxs:w-1/4 xs:w-1/5 lg:w-3/9 md:min-h-40 point-hidden': variant === ItemCardVariantEnum.CoinFlip,
      'w-full xxs:w-2/3 xs:w-1/2 x sm:w-1/3 lg:w-1/4 min-h-[160px] text-xs point-hidden ':
        variant === ItemCardVariantEnum.FourByFour,
      'xxs:w-1/4 max-w-[121px] max-h-[160px] text-xs point-hidden': variant === ItemCardVariantEnum.KingList,
      'w-32 h-48 text-xs point-hidden': variant === ItemCardVariantEnum.CaseAdminItem
    }
  )

  return (
    <div className={itemClasses ?? variantClasses}>
      <div
        onClick={() => (onSelect ? onSelect(id) : '')}
        className={`border--mask ${borderRadial} rounded h-full overflow-hidden relative z-20 group-[.is-selected]/item:border-0 group-[.is-selected]/item:before:hidden cursor-pointer`}
      >
        <div className='gradient-blue-secondary rounded h-full text-center relative z-20 group-[.is-selected]/item:border-0'>
          <div className='absolute inset-0 rounded bg-dark/40 z-30 hidden group-[.is-selected]/item:block'>
            <div className='flex items-center justify-center text-xs m-auto absolute w-full h-5 leading-5 -inset-full'>
              <div className='w-4 shrink-0 mr-1.5 text-green-secondary'>
                <SelectedIcon />
              </div>
              SELECTED
            </div>
            <div className='absolute flex justify-center z-40 bottom-4 w-full left-0'>
              <CoinsWithDiamond
                iconContainerSize='Small'
                iconClasses='w-3 h-3'
                typographyQuantity={price}
              />
            </div>
          </div>
          <div
            className={`bg-gradient-radial-60 ${gradient} flex flex-col group-[.is-added]/item:block items-center justify-between rounded h-full py-2.5 px-2 group-[.is-added]/item:px-5 group-[.is-selected]/item:blur-3xl group-[.is-user]/item:pl-0`}
          >
            <div className='mb-2 hidden group-[.is-percent]/item:block'>
              {chance ? <>{chance / 1000}%</> : <>1.5%</>}
            </div>
            <div className='w-2 h-2 outline outline-4 rounded-full bg-green-primary outline-green-primary/25 shadow-green-primary-10 mb-2 group-[.point-hidden]/item:hidden group-[.is-added]/item:hidden group-[.is-percent]/item:hidden'></div>
            <div className='text-gray-primary mb-2.5 grow flex flex-col justify-center group-[.is-added]/item:text-left group-[.is-user]/item:hidden'>
              <span className='inline-block group-[.is-block]/item:min-h-[60px]'>{name}</span>
            </div>
            <div className='w-full group-[.is-added]/item:flex group-[.is-added]/item:items-start group-[.is-user]/item:items-center'>
              <div className='w-full shrink-0 pb-60% h-0 relative mb-2.5 group-[.is-added]/item:mr-3 group-[.is-added]/item:mb-0 group-[.is-added]/item:pb-[34%] group-[.is-added]/item:w-2/5 group-[.is-user]/item:w-[120px] group-[.is-user]/item:pb-[28%] '>
                <img
                  src={image}
                  alt='@T'
                  className='absolute object-contain w-full h-full'
                />
              </div>
              <div>
                <div className='hidden group-[.is-user]/item:block w-[120px] text-gray-primary mb-2 text-left'>
                  <span>{name}</span>
                </div>
                <div className='flex items-center justify-center relative z-40 group-[.is-user]/item:justify-start'>
                  <CoinsWithDiamond
                    iconContainerSize='Small'
                    iconClasses='w-[13px] h-[11px]'
                    typographyQuantity={price}
                    typographyFontSize={
                      variant === ItemCardVariantEnum.CoinFlip
                        ? TypographySizeEnum.Size12
                        : TypographySizeEnum.Size14
                    }
                  />
                </div>
              </div>
              <div className='hidden group-[.is-user]/item:block mx-auto'>
                <div className='w-14 h-[50px] shrink-0 border border-blue-highlight rounded my-1 overflow-hidden radial--blue ml-4 '>
                  <Image image={userAvatar} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemCard
