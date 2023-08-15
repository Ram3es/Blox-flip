import { IMAGES } from '../constants/images'

export const getIconByPathName = (pathname: string): string => {
  if (pathname === 'ethereum') {
    return IMAGES.ethereum
  }
  if (pathname === 'bitcoin') {
    return IMAGES.bitcoin
  }
  if (pathname === 'litecoin') {
    return IMAGES.litecoin
  }
  return ''
}

export const getImagePathByUrl = (url: string) => {
  const splitted = url.split('/')

  return `/assets/${splitted.at(-1) ?? ''}`
}
