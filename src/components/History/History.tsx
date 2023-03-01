import { useCallback, useState } from 'react'
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
import { BetCell } from '../Table/BetCell'
import { ProfitCell } from '../Table/ProfitCell'

export const History = () => {
  const [data] = useState<IHistory[]>([...mockHistory])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [currentColum, setCurrentColumn] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const handleFilterByColumn = useCallback(
    (column: string) => {
      setColumnFilters([])
      setSearchValue('')
      setCurrentColumn(column)
    },
    [columnFilters, currentColum]
  )

  const handleFilterByValue = useCallback(
    (column: string, value: string) => {
      handleFilterByColumn(column)
      setSearchValue(value)
    },
    [columnFilters, currentColum, searchValue]
  )

  const filtersVariants: FilterVariant[] = [
    {
      name: 'all',
      onClick: () => handleFilterByValue('', '')
    },
    {
      name: 'crash',
      onClick: () => handleFilterByValue('game', 'crash')
    },
    {
      name: 'king',
      onClick: () => handleFilterByValue('game', 'king')
    },
    {
      name: 'plinko',
      onClick: () => handleFilterByValue('game', 'plinko')
    },
    {
      name: 'jackpot',
      onClick: () => handleFilterByValue('game', 'jackpot')
    },
    {
      name: 'coinflip',
      onClick: () => handleFilterByValue('game', 'coinflip')
    },
    {
      name: 'mines',
      onClick: () => handleFilterByValue('game', 'mines')
    },
    {
      name: 'wheel',
      onClick: () => handleFilterByValue('game', 'wheel')
    },
    {
      name: 'cases',
      onClick: () => handleFilterByValue('game', 'cases')
    },
    {
      name: 'cases battles',
      onClick: () => handleFilterByValue('game', 'cases battles')
    }
  ]

  const columnHelper = createColumnHelper<IHistory>()
  const columns: Array<ColumnDef<IHistory, any>> = [
    columnHelper.accessor('game', {
      id: 'game',
      header: () => 'Game',
      cell: (props) => <GameCell game={props.getValue()} />,
      footer: (props) => props.column.id,
      filterFn: (row, _columnId, value) => {
        return row.original.game.toLowerCase() === value.toLowerCase()
      }
    }),
    columnHelper.accessor('date', {
      id: 'date',
      header: () => 'Date',
      cell: (props) => <TimeCell date={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('multiplier', {
      id: 'multiplier',
      header: () => 'Multiplier',
      cell: (props) => <MultiplierCell multiplier={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('wager', {
      id: 'wager',
      header: () => 'Wager',
      cell: (props) => <BetCell quantity={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor((row: IHistory) => row, {
      id: 'profit',
      header: () => 'Profit',
      cell: (props) => <ProfitCell data={props.getValue()} />,
      footer: (props) => props.column.id
    })
  ]

  return (
    <div className='px-4 md:px-9 py-5'>
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
