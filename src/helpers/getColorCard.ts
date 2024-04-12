import { BorderColorEnum } from '../components/common/Cards/ItemCard'

export const getColorCardbyPrice = (price: number): BorderColorEnum => {
  if (price <= 50) return BorderColorEnum.Blue
  if (price > 50 && price <= 100) return BorderColorEnum.Green
  if (price > 100 && price <= 500) return BorderColorEnum.Orange
  if (price > 500 && price <= 1200) return BorderColorEnum.Orange
  return BorderColorEnum.Pink
}
