import { ICaseItem } from '../types/cases'

export const randomItems = (count: number) => {
  const randomItems: ICaseItem[] = []
  for (let i = 0; i < 100; i++) {
    const object = {
      itemName: `Random item, index${i}`,
      rarity: '100',
      image: '',
      id: i
    }
    randomItems.push(object)
  }
  return randomItems
}
