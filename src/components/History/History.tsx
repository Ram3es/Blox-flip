import { useState } from 'react'
import { ColumnFiltersState, createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { Table } from '../Table/Table'

import type { FilterVariant } from '../../types/table'
import { TimeCell } from '../Table/TimeCell'
import { FilterHeader } from '../Table/FilterHeader'
import { ListIcon } from '../ListIcon/ListIcon'
import { mockHistory } from './mock'
import { IHistory } from '../../types/history'
import { GameCell } from '../Table/GameCell'
import { MultiplierCell } from '../Table/MultiplierCell'
import { QuantityCoins } from '../common/QuantityCoins/QuantityCoins'
import { handleFilterByValueHelper, resetColumnFilterHelper } from '../../helpers/tableHelpers'

export const History = () => {
  const [data] = useState<IHistory[]>([...mockHistory])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [currentColum, setCurrentColumn] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const resetFilter = resetColumnFilterHelper(
    setCurrentColumn,
    setSearchValue,
    setColumnFilters,
    columnFilters
  )
  const filterByValue = handleFilterByValueHelper(setCurrentColumn, setSearchValue)

  const filtersVariants: FilterVariant[] = [
    {
      name: 'all',
      onClick: () => resetFilter()
    },
    {
      name: 'crash',
      onClick: () => filterByValue('game', 'crash')
    },
    {
      name: 'king',
      onClick: () => filterByValue('game', 'king')
    },
    {
      name: 'plinko',
      onClick: () => filterByValue('game', 'plinko')
    },
    {
      name: 'jackpot',
      onClick: () => filterByValue('game', 'jackpot')
    },
    {
      name: 'coinflip',
      onClick: () => filterByValue('game', 'coinflip')
    },
    {
      name: 'mines',
      onClick: () => filterByValue('game', 'mines')
    },
    {
      name: 'wheel',
      onClick: () => filterByValue('game', 'wheel')
    },
    {
      name: 'cases',
      onClick: () => filterByValue('game', 'cases')
    },
    {
      name: 'cases battles',
      onClick: () => filterByValue('game', 'cases battles')
    }
  ]

  const columnHelper = createColumnHelper<IHistory>()
  const columns: Array<ColumnDef<IHistory, any>> = [
    columnHelper.accessor('game', {
      id: 'game',
      header: () => 'Game',
      cell: (props) => <GameCell game={props.getValue()} />,
      footer: (props) => props.column.id,
      filterFn: 'equalsString'
    }),
    columnHelper.accessor('date', {
      id: 'date',
      header: () => 'Date',
      cell: (props) => <TimeCell date={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor((row: IHistory) => row.multiplier, {
      id: 'multiplier',
      header: () => 'Multiplier',
      cell: ({ row }) => (
        <MultiplierCell multiplier={row.original.multiplier} isWinner={row.original.isWinner} />
      ),
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('wager', {
      id: 'wager',
      header: () => 'Wager',
      cell: (props) => <QuantityCoins quantity={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor((row: IHistory) => row.profit, {
      id: 'profit',
      header: () => 'Profit',
      cell: ({ row }) => (
        <QuantityCoins
          quantity={row.original.profit}
          color={row.original.isWinner ? 'green' : 'red'}
        />
      ),
      footer: (props) => props.column.id
    })
  ]

  return (
    <div className='py-5'>
      <Table
        data={data}
        columns={columns}
        sorting={sorting}
        setSorting={setSorting}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        currentColum={currentColum}
        searchValue={searchValue}
        filtersVariants={filtersVariants}
        tableHeader={
          <FilterHeader label={<ListIcon />} text='My history' textColor='text-gray-primary' />
        }
        variant='History'
      />
    </div>
  )
}