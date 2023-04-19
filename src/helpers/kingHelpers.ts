import type { IItemCard } from '../types/ItemCard'

export const getPercentByDamage = (damage: number, maxHealthPoints: number) => {
  return ((damage * 100) / maxHealthPoints).toFixed(2)
}
export const getFightDuration = (roundDuration: number, fightRounds: number): number => {
  return roundDuration * fightRounds
}
export const getSumPriceBySkins = (skins: IItemCard[]) => {
  return skins.reduce((a: number, b: IItemCard) => a + b.price, 0)
}
