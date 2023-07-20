export interface IRootMarketItem {
  color: string
  id: number
  name: string
  pic: string
  price: number
  type: string
}

export interface IRootCasePotentialItem extends Pick<IRootMarketItem, 'id' | 'name' | 'color'> {
  odds: number
  cost: number
  image: string
}

export interface IRootCaseItem {
  name: string
  short: string
  img: string
  cost: number
  items: IRootCasePotentialItem[]
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

export interface IRootCaseItemWithAmount extends IRootCaseItem {
  amount: number
}
