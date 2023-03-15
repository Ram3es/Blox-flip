import { ICaseItem } from '../types/cases'

export const getRandomCards = (count: number, availableCards: ICaseItem[]) => {
  const cards: ICaseItem[] = []

  for (let i = 0; i < count; i++) {
    const randomCardIndex = Math.floor(Math.random() * availableCards.length)
    const randomCard = availableCards[randomCardIndex]

    const card = {
      itemName: randomCard.itemName,
      rarity: randomCard.rarity,
      image: randomCard.image,
      id: `${i}`,
      color: randomCard.color,
      chance: randomCard.chance,
      price: randomCard.price
    }

    cards.push(card)
  }
  return cards
}
