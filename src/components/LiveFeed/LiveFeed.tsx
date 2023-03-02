import { useCallback, useState } from 'react'
import { ColumnFiltersState, createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { Table } from '../Table/Table'

import { MultiplierCell } from '../Table/MultiplierCell'
import { UserInfoCell } from '../Table/UserInfoCell'
import { GameCell } from '../Table/GameCell'
import { TimeCell } from '../Table/TimeCell'
import { FilterHeader } from '../Table/FilterHeader'

import { users } from './users'
import type { ISecondUser } from '../../types/User'
import type { FilterVariant } from '../../types/table'
import { QuantityCoins } from '../common/QuantityCoins/QuantityCoins'

const RedDotIcon = () => {
  return (
    <span className='inline-block align-middle outline-green-primary/25 bg-green-primary outline outline-4 rounded-full mr-2.5 h-2 w-2'></span>
  )
}

export const LiveFeed = () => {
  const [data] = useState<ISecondUser[]>([...users])
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
      name: 'all bets',
      onClick: () => handleFilterByValue('', '')
    },
    {
      name: 'my bets',
      onClick: () => handleFilterByValue('username', 'Mark_Maggio')
    },
    {
      name: 'big bets',
      onClick: () => handleFilterByValue('bet', '90')
    },
    {
      name: 'lucky bets',
      onClick: () => handleFilterByValue('profit', '50')
    }
  ]

  const columnHelper = createColumnHelper<ISecondUser>()
  const columns: Array<ColumnDef<ISecondUser, any>> = [
    columnHelper.accessor((row: ISecondUser) => row.username, {
      id: 'username',
      header: () => 'Username',
      cell: ({ row }) => <UserInfoCell user={row.original} />,
      footer: (props) => props.column.id,
      filterFn: (row, _columnId, value) => {
        return row.original.username === value
      }
    }),
    columnHelper.accessor('game', {
      id: 'game',
      header: () => 'Game',
      cell: (props) => <GameCell game={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('date', {
      id: 'date',
      header: () => 'Time',
      cell: (props) => <TimeCell date={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('bet', {
      id: 'bet',
      header: () => 'Bet',
      cell: (props) => <QuantityCoins quantity={props.getValue()} />,
      footer: (props) => props.column.id,
      filterFn: (row, _columnId, value) => {
        return row.original.bet > value
      }
    }),
    columnHelper.accessor('rate', {
      id: 'rate',
      header: () => 'Multiplier',
      cell: (props) => <MultiplierCell multiplier={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor((row: ISecondUser) => row.profit, {
      id: 'profit',
      header: 'Profit',
      cell: ({ row }) => (
        <QuantityCoins
          quantity={row.original.profit}
          color={row.original.isWinner ? 'green' : 'red'}
        />
      ),
      filterFn: (row, _columnId, value) => {
        return row.original.profit > value
      },
      footer: (props) => props.column.id
    })
  ]

  return (
    <div className='bg-blue-primary rounded-2xl px-4 md:px-9 py-5'>
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
        tableHeader={<FilterHeader label={<RedDotIcon />} text='Live feed' />}
        variant='Feed'
      />
    </div>
  )
}
