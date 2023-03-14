import { ICaseItem } from '../types/cases'

export const imageVariants = ['helmet', 'redCrown', 'horns']

export const randomItems = (count: number) => {
  const randomItems: ICaseItem[] = []
  for (let i = 0; i < 100; i++) {
    const object = {
      itemName: `item ${i + 1}`,
      rarity: '100',
      image: imageVariants[Math.floor(Math.random() * imageVariants.length)],
      id: i
    }
    randomItems.push(object)
  }
  return randomItems
}
