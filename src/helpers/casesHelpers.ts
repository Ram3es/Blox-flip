export const getRandomCards = <T extends object>(count: number, availableCards: T[]): T[] => {
  const cards: T[] = []

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
