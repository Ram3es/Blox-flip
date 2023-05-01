export const getPercentByDamage = (damage: number, maxHealthPoints: number) => {
  return ((damage * 100) / maxHealthPoints).toFixed(2)
}
export const getFightDuration = (roundDuration: number, fightRounds: number): number => {
  return roundDuration * fightRounds
}
