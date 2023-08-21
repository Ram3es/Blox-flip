import { ISortOptions } from '../types/SortOptions'

export const sortingVariants: ISortOptions[] = [
  { title: 'A - Z', sortBy: 'name', direction: 'ASC' },
  { title: 'High to low', sortBy: 'price', direction: 'DESC' },
  { title: 'Low to high', sortBy: 'price', direction: 'ASC' }
]

export const selectItem = [
  { title: 'All', value: { from: -1, to: Infinity } },
  { title: '< 1k', value: { from: 0, to: 999 } },
  { title: '1k - 5k', value: { from: 1000, to: 5000 } },
  { title: '5k - 10k', value: { from: 5001, to: 10000 } },
  { title: '10k - 25k', value: { from: 10001, to: 25000 } }
]

export const CHALLENGE_SORT_VARIANTS = [
  { title: 'All games', value: 'all' },
  { title: 'Wheel', value: 'wheel' },
  { title: 'Plinko', value: 'plinko' },
  { title: 'Coinflip', value: 'coinflip' },
  { title: 'Jackpot', value: 'jackpot' },
  { title: 'Cases', value: 'cases' },
  { title: 'Case Battles', value: 'case-battles' }
]

export const SORT_REGION_VARIANTS = [
  {
    title: 'NA',
    value: 'na'
  },
  {
    title: 'EU',
    value: 'eu'
  },
  {
    title: 'UK',
    value: 'uk'
  },
  {
    title: 'GB',
    value: 'gb'
  }
]
