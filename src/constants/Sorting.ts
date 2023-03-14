import { ISortOptions } from '../types/sortOptions'

export const sortingVariants: ISortOptions [] = [
  { title: 'A - Z', value: 'name', direction: 'ASC' },
  { title: 'High to low', value: 'price', direction: 'DESC' },
  { title: 'Low to high', value: 'price', direction: 'ASC' }

]

export const selectItem = [
  { title: 'All', value: { from: -1, to: Infinity } },
  { title: '< 1k', value: { from: 0, to: 999 } },
  { title: '1k - 5k', value: { from: 1000, to: 5000 } },
  { title: '5k - 10k', value: { from: 5001, to: 10000 } },
  { title: '10k - 25k', value: { from: 10001, to: 25000 } }
]
