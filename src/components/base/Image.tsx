import { FC } from 'react'
import defaultAvatar from '../../assets/img/avatar_img.png'

interface ImageProps {
  image?: string
  defaultImage?: string
  className?: string
}

const Image: FC<ImageProps> = ({
  image = defaultAvatar,
  defaultImage = defaultAvatar,
  className = 'object-cover w-full h-full'
}) => {
  return (
    <img
      src={image === null || image === '' ? defaultImage : image}
      alt=''
      loading='lazy'
      decoding='async'
      className={className}
    />
  )
}

export default Image
