import { ISortOptions } from '../types/sortOptions'

export const sortingVariants: ISortOptions [] = [
  { title: 'A - Z', value: 'name', direction: 'ASC' },
  { title: 'High to low', value: 'price', direction: 'DESC' },
  { title: 'Low to high', value: 'price', direction: 'ASC' }

]
