import { IKingAnimationType, IKingWeaponKey } from '../types/King'

export const getPercentByDamage = (damage: number, maxHealthPoints: number) => {
  return ((damage * 100) / maxHealthPoints).toFixed(2)
}
export const getFightDuration = (roundDuration: number, fightRounds: number): number => {
  return roundDuration * fightRounds
}

export const getAnimationByWeaponKey = (weaponKey: IKingWeaponKey): IKingAnimationType => {
  switch (weaponKey) {
    case 1:
      return 'sword'
    case 2:
      return 'knife'
    case 3:
      return 'flaming_sword'
    case 4:
      return 'pistol'
    case 5:
      return 'automatic_weapon'
  }
}