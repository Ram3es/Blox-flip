export interface IRootMarketItem {
  color: string
  id: number
  name: string
  image: string
  price: number
  type: string
}

export interface IRootCasePotentialItem {
  chance: number
  image: string
  price: number
  name: string
  id?: string | number
}

export interface IRootCaseItem {
  name: string
  short: string
  image: string
  price: number
  items: IRootCasePotentialItem[]
}

export interface IRootCaseDrop {
  case: string
  cost: number
  odds: number
  skin_image: string
  skin_name: string
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
