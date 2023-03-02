import clsx from 'clsx'
import React, { FC } from 'react'
import { IMAGES } from '../../constants/Images'
import { QuantityCoinsWithChildren } from '../common/QuantityCoins/QuantityWithChildren'
import SelectedIcon from '../icons/SelectedIcon'

enum BorderColorEnum {
  Red = 'Red',
  Pink = 'Pink',
  Orange = 'Orange',
  Blue = 'Blue',
  Green = 'Green'
}

interface IItemCardProps {
  id: string
  name: string
  price: number
  image: string
  onSelect: Function
  isSelected?: boolean
  color?: string

}

const ItemCard: FC<IItemCardProps> = ({ id, image, name, price, onSelect, isSelected, color }) => {
  const borderRadial = clsx('', {
    'border--radial-orange': color === BorderColorEnum.Orange,
    'border--radial-blue': color === BorderColorEnum.Blue,
    'border--radial-green': color === BorderColorEnum.Green,
    'border--radial-pink': color === BorderColorEnum.Pink,
    'border--radial-red': color === BorderColorEnum.Red
  })

  const gradient = clsx('', {
    'from-orange-primary-light/20 to-dark/0': color === BorderColorEnum.Orange,
    'radial--blue-light': color === BorderColorEnum.Blue,
    'from-green-primary-light/20 to-dark/0': color === BorderColorEnum.Green,
    'from-pink-primary-darken/20 to-dark/0': color === BorderColorEnum.Pink,
    'from-red-secondary/20 to-dark/0': color === BorderColorEnum.Red
  })

  console.log(borderRadial)
  return (
    <div className={`${isSelected ? ' is-selected' : ''} px-1 w-1/2 xxs:w-1/4 xs:w-1/5 md:w-1/6 shrink-0 lg:w-1/7 mb-2 group/item`}>
      <div onClick={() => onSelect(id)} className={`border--mask ${borderRadial} rounded h-full overflow-hidden relative z-20 group-[.is-selected]/item:border-0 group-[.is-selected]/item:before:hidden cursor-pointer`}>
        <div className="gradient-blue-secondary rounded h-full text-center relative z-20 group-[.is-selected]/item:border-0">
          <div className="absolute inset-0 rounded bg-dark/40 z-30 hidden group-[.is-selected]/item:block">
            <div className="flex items-center justify-center text-xs m-auto absolute w-full h-5 leading-5 -inset-full">
              <div className="w-4 shrink-0 mr-1.5 text-green-secondary">
                <SelectedIcon />
              </div>SELECTED
            </div>
            <div className="absolute flex justify-center z-40 bottom-4 w-full left-0">
              <div className="flex bg-green-primary/15 items-center px-1.5 py-1 rounded">
                <QuantityCoinsWithChildren quantity={price} />
              </div>
            </div>
          </div>
          <div className={`bg-gradient-radial-60 ${gradient} flex flex-col group-[.is-added]/item:block items-center justify-between rounded h-full py-2.5 px-2 group-[.is-added]/item:px-5 group-[.is-selected]/item:blur-3xl`}>
            <div className="mb-2 hidden group-[.is-percent]/item:block">1.5%</div>
            <div className="w-2 h-2 outline outline-4 rounded-full bg-green-primary outline-green-primary/25 shadow-green-primary-10 mb-2 group-[.is-added]/item:hidden group-[.is-percent]/item:hidden"></div>
            <div className="text-gray-primary mb-2.5 grow flex flex-col justify-center group-[.is-added]/item:text-left"><span>{name}</span></div>
            <div className="w-full group-[.is-added]/item:flex group-[.is-added]/item:items-start">
              <div className="w-full shrink-0 pb-60% h-0 relative mb-2.5 group-[.is-added]/item:mr-3 group-[.is-added]/item:mb-0 group-[.is-added]/item:w-2/5">
                <img src={IMAGES[image]} alt="@T" className="absolute object-contain w-full h-full" />
              </div>
              <div className="flex items-center justify-center relative z-40">
                <QuantityCoinsWithChildren quantity={price} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemCard
