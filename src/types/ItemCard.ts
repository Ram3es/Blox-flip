export interface IItemCard {
  id: string
  name: string
  price: number
  image: string
  sold?: boolean
  active?: boolean
  color: string
  isSelected?: boolean
  hot?: boolean
}
export interface IUnboxCard extends IItemCard {
  status?: string
}

export interface IUnboxCardCounter extends IItemCard {
  amount: number
}
