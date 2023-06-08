import { IKingWeaponKey, KingWeaponEnum } from '../types/King'

export const getPercentByDamage = (damage: number, maxHealthPoints: number) => {
  return ((damage * 100) / maxHealthPoints).toFixed(2)
}
export const getFightDuration = (roundDuration: number, fightRounds: number): number => {
  return roundDuration * fightRounds
}

export const getAnimationByWeaponKey = (weaponKey: IKingWeaponKey): KingWeaponEnum => {
  switch (weaponKey) {
    case 1:
      return KingWeaponEnum.SWORD
    case 2:
      return KingWeaponEnum.KNIFE
    case 3:
      return KingWeaponEnum.FLAMING_SWORD
    case 4:
      return KingWeaponEnum.PISTOL
    case 5:
      return KingWeaponEnum.AUTOMATIC_WEAPON
  }
}
