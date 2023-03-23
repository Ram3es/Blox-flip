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
