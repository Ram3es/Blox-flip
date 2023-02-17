import { FC } from 'react'

import defaultAvatar from '../../assets/img/avatar_img.png'
import { BaseSizes } from '../../types/sizes'

enum UserAvatarVariantEnum {
  ROUNDED = 'ROUNDED',
  CIRCLE = 'CIRCLE'
}

interface UserAvatarProps {
  image?: string
  size?: keyof typeof BaseSizes
  variant?: keyof typeof UserAvatarVariantEnum
}

export const UserAvatar: FC<UserAvatarProps> = ({
  size = BaseSizes.MEDIUM,
  variant = UserAvatarVariantEnum.ROUNDED,
  image = defaultAvatar
}) => {
  return (
    <>
      <img
        src={image}
        alt=''
        width='40'
        height='37'
        loading='lazy'
        decoding='async'
        className='object-cover w-full h-full'
      />
    </>
  )
}
