import { Ref } from 'react'

export interface itemAttributes {
  itemName: string
  rarity: string
  image: string
  id: number
}
export class Item {
  id: number
  itemName: string
  rarity: string
  image: string

  constructor(id: number, attrs: itemAttributes) {
    this.id = id
    this.itemName = attrs.itemName
    this.rarity = attrs.rarity
    this.image = attrs.image
  }
}

export interface rouletteAttributes {
  winner: itemAttributes
  items: itemAttributes[]

  rouletteContainerRef: Ref<HTMLElement>
  itemsRef: Ref<HTMLElement>

  itemsCount?: number
  transitionDuration?: number
  itemWidth?: number
}

export class Roulette {
  winner: itemAttributes
  allItems: itemAttributes[]

  rouletteWrapper: Ref<HTMLElement>
  itemWrapper: Ref<HTMLElement>

  items: Item[]

  itemsCount: number
  itemPrizeId: number

  transitionDuration: number

  itemWidth: number

  constructor (attrs: rouletteAttributes) {
    this.winner = attrs.winner
    this.allItems = attrs.items
    this.items = []
    this.rouletteWrapper = attrs.itemsRef
    this.itemWrapper = attrs.itemsRef
    this.itemsCount = attrs.itemsCount ?? 50
    this.itemPrizeId = 87
    this.transitionDuration = attrs.transitionDuration ?? 10
    this.itemWidth = attrs.itemWidth ?? 200
  }

  set_items = () => {
    let items: Item[] = []

    const setItemActors = (fromIndex: number, toIndex: number) => {
      let j = 0
      const createdItems: Item[] = []
      for (let i = fromIndex; i <= toIndex; i += 1) {
        createdItems.push(new Item(i, this.allItems[j]))
        j = j === this.allItems.length - 1 ? 0 : j + 1
      }
      return createdItems
    }

    if (this.allItems.length === 0) {
      throw new Error('No items in case, sorry.')
    }

    items = items.concat(setItemActors(0, this.itemPrizeId - 1))

    items[this.itemPrizeId] = new Item(this.itemPrizeId, this.winner)

    items = items.concat(setItemActors(this.itemPrizeId + 1, this.itemsCount - 1))
    console.log(items)
    this.items = items
  }

  spin = () => {
    this.itemWrapper.current.style.transition = `left ${this.transitionDuration}s ease-out`

    setTimeout(() => {
      this.itemWrapper!.current.style.left = `-${556}rem`
    }, 1000)

    return this.itemPrizeId
  }
}
