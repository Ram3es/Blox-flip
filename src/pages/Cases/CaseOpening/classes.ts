/* eslint-disable @typescript-eslint/prefer-readonly */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Ref } from 'react'

export interface itemAttributes {
  itemName: string
  rarity: string
  image: string
  id: number
}

// КЛАСС ОРУЖИЯ
export class Item {
  id: number
  itemName: string
  rarity: string
  image: string

  constructor(id: number, attrs: itemAttributes) {
    this.id = id

    // атрибуты с сервера
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

// КЛАСС РУЛЕТКИ
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
    // атрибуты для генерации массива weapons
    this.winner = attrs.winner
    this.allItems = attrs.items

    // тут будет всё оружие (оружие-приз + оружие-актёры)
    this.items = []

    // родительский DOM-элемент для рулетки
    this.rouletteWrapper = attrs.itemsRef

    // родительский DOM-элемент для DOM-элементов оружия (он вращается)
    this.itemWrapper = attrs.itemsRef

    // общее количество оружия
    this.itemsCount = attrs.itemsCount ?? 50

    // id приза
    // this.weaponPrizeId = this.randomRange(this.weaponsCount / 2, this.weaponsCount - 5)
    this.itemPrizeId = 87

    this.transitionDuration = attrs.transitionDuration ?? 10

    this.itemWidth = attrs.itemWidth ?? 200
  }

  private shuffle = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  }

  set_items = () => {
    let items: Item[] = [] // объявляем массив оружия
    let weapon_actors_len = this.allItems.length // количество оружия пришедшее с бд

    const set_weapon_actors = (from_i: number, to_i: number) => {
      let j = 0
      const createdItems: Item[] = []
      for (let i = from_i; i <= to_i; i += 1) {
        // создаем оружие с индексом i и атрибутами j
        createdItems.push(new Item(i, this.allItems[j]))
        j = j === weapon_actors_len - 1 ? 0 : j + 1
      }
      this.shuffle(createdItems)
      return createdItems
    }

    // нет оружия с бд - ошибка
    if (weapon_actors_len === 0) {
      throw new Error('Ошибка! Нет актёров.')
    }

    /**
     * сетаем оружия в размере количества
     *  оружия в рулетке с 0 до id приза
     */
    items = items.concat(set_weapon_actors(0, this.itemPrizeId - 1))

    // создаем оружие приз
    items[this.itemPrizeId] = new Item(this.itemPrizeId, this.winner)

    /** сетаем оружия в id приза до конца */
    items = items.concat(set_weapon_actors(this.itemPrizeId + 1, this.itemsCount - 1))
    this.items = items
  }

  // ВРАЩЕНИЕ РУЛЕТКИ
  spin = () => {
    // рандомная координата остановки
    // анимация теперь через 'transition', а не через 'animation'
    // 'ease-out' -- это плавное замедление рулетки
    // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
    // @ts-ignore
    this.itemWrapper.current.style.transition = `left ${this.transitionDuration}s ease-out`

    // немного отложенный старт
    // (ибо нельзя сразу установить css-свойство 'left')
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
      // @ts-ignore
      this.itemWrapper!.current.style.left = `-${516}rem`
    }, 100)

    return this.itemPrizeId
  }
}
