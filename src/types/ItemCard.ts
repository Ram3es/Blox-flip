export interface IItemCard {
  id: number
  name: string
  price: number
  image: string
  color: string
  chance?: number
  sold?: boolean
  active?: boolean
  isSelected?: boolean
  pic?: string
  hot?: boolean
}
export interface IUnboxCard extends IItemCard {
  status?: string
}

export interface IUnboxCardCounter extends IItemCard {
  amount: number
}

export interface TRobloxCard extends Pick<IItemCard, 'id' | 'name' | 'price' | 'color' | 'isSelected'> {
  pic: string
}

export interface IRobloxCard {
  assetId: number
  assetType: string
  created: string
  assetName: string
  rap: number
  value: number
}
