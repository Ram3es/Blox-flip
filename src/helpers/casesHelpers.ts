import { ICaseItem } from '../types/cases'

export const getRandomCards = (count: number, availableCards: ICaseItem[]) => {
  const cards: ICaseItem[] = []

  for (let i = 0; i < count; i++) {
    const randomCardIndex = Math.floor(Math.random() * availableCards.length)
    const randomCard = availableCards[randomCardIndex]

    const card = {
      ...randomCard,
      id: `${i}`
    }

    cards.push(card)
  }
  return cards
}
