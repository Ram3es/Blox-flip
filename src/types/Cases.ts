export interface ICaseUnboxingPotentialItem {
  name: string
  odds: number
  cost: number
  image: string
  color: string
}

export interface ICaseUnboxingItem {
  name: string
  short: string
  img: string
  cost: number
  items: ICaseUnboxingPotentialItem[]
}

export interface ICaseUnboxingPotentialItemWithIds extends ICaseUnboxingPotentialItem {
  id: string
}

export interface ICaseItem {
  itemName: string
  rarity: string
  image: string
  id: string
  color: string
  chance: number
  price: number
}
