import { FC } from 'react'
import defaultAvatar from '../../assets/img/avatar_img.png'

interface UserAvatarProps {
  image?: string
  width?: string // px
  height?: string // px
  className?: string
}

export const UserAvatar: FC<UserAvatarProps> = ({
  image = defaultAvatar,
  width = '40',
  height = '37',
  className = 'object-cover w-full h-full'
}) => {
  return (
    <img
      src={image === null || image === '' ? defaultAvatar : image}
      alt=''
      width={width}
      height={height}
      loading='lazy'
      decoding='async'
      className={className}
    />
  )
}
