import { useEffect, useState } from 'react'
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

export const LiveFeed = () => {
  const [data, setData] = useState([...users])
  const [sorting, setSorting] = useState<SortingState>([])

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [field, setField] = useState()
  const [searchValue, setSearchValue] = useState<string | number>('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    setData([...users])
  }, [])

  const handleSelectChange = (str: any) => {
    setColumnFilters([])
    setSearchValue('')
    setField(str)
  }

  const filtersVariants = [
    {
      name: 'all bets',
      onClick: () => {
        handleSelectChange('')
        setSearchValue('')
        console.log('all bets')
      }
    },
    {
      name: 'my bets',
      onClick: () => {
        handleSelectChange('username')
        setSearchValue('Heather_Wiza54')
        console.log('my bets')
      }
    },
    {
      name: 'big bets',
      onClick: () => {
        handleSelectChange('bet')
        setSearchValue('10000')
        console.log('big bets')
      }
    },
    {
      name: 'lucky bets',
      onClick: () => {
        handleSelectChange('profit')
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
          field,
          setField,
          searchValue,
          setSearchValue,
          filter,
          setFilter,
          handleSelectChange,
          filtersVariants
        }}
      />
    </div>
  )
}
