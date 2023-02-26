import { useState } from 'react'
import { ColumnFiltersState, createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef, SortingState } from '@tanstack/react-table'

import { MultiplierCell } from '../Table/MultiplierCell'
import { Table } from '../Table/Table'
import { UserInfoCell } from '../Table/UserInfoCell'
import { GameCell } from '../Table/GameCell'
import { TimeCell } from '../Table/TimeCell'

import { users } from './users'
import { ISecondUser } from '../../types/User'
import { QuantityCoins } from '../common/QuantityCoins/QuantityCoins'
import { FilterVariant } from '../../types/table'

export const LiveFeed = () => {
  const [data, setData] = useState<ISecondUser[]>([...users])
  const [sorting, setSorting] = useState<SortingState>([])
  
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [currentColum, setCurrentColumn] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const handleFilterByColumn = (column: string) => {
    setColumnFilters([])
    setSearchValue('')
    setCurrentColumn(column)
  }

  const filtersVariants: FilterVariant[] = [
    {
      name: 'all bets',
      onClick: () => {
        handleFilterByColumn('')
        setSearchValue('')
        console.log('all bets')
      }
    },
    {
      name: 'my bets',
      onClick: () => {
        handleFilterByColumn('username')
        setSearchValue('Heather_Wiza54')
        console.log('my bets')
      }
    },
    {
      name: 'big bets',
      onClick: () => {
        handleFilterByColumn('bet')
        setSearchValue('10000')
        console.log('big bets')
      }
    },
    {
      name: 'lucky bets',
      onClick: () => {
        handleFilterByColumn('profit')
        setSearchValue('90000')
        console.log('profit bets')
      }
    }
  ]

  const columnHelper = createColumnHelper<ISecondUser>()
  const columns: Array<ColumnDef<ISecondUser, any>> = [
    columnHelper.accessor((row: ISecondUser) => row, {
      id: 'username',
      header: () => 'Username',
      cell: (props) => <UserInfoCell user={props.getValue()} />,
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
        return row.original.bet > 40000
      }
    }),
    columnHelper.accessor('rate', {
      id: 'rate',
      header: () => 'Multiplier',
      cell: (props) => <MultiplierCell multiplier={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('profit', {
      id: 'profit',
      header: () => 'Profit',
      cell: (props: any) => <QuantityCoins quantity={props.getValue()} isActive={true} />,
      filterFn: (row, _columnId, value) => {
        return row.original.profit > 89853
      },
      footer: (props) => props.column.id
    })
  ]

  return (
    <div className='bg-blue-primary rounded-2xl px-4 md:px-9 py-5'>
      <Table
        {...{
          data,
          columns,
          sorting,
          setSorting,
          columnFilters,
          setColumnFilters,
          currentColum,
          searchValue,
          filtersVariants
        }}
      />
    </div>
  )
}
