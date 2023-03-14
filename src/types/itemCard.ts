export interface IItemCard {
  id: string
  name: string
  price: number
  image: string
  sold: boolean
  active?: boolean
  color: string
  isSelected?: boolean
  hot?: boolean
}
