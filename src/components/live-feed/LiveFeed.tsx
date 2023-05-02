import { useCallback, useState } from 'react'
import { ColumnFiltersState, createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { Table } from '../table/Table'

import { MultiplierCell } from '../table/CellFormatters/MultiplierCell'
import { UserInfoCell } from '../table/CellFormatters/UserInfoCell'
import { GameCell } from '../table/CellFormatters/GameCell'
import { TimeCell } from '../table/CellFormatters/TimeCell'
import { FilterHeader } from '../table/FilterHeader'

import { users } from '../../mocks/liveFeedUsers'
import type { ISecondUser } from '../../types/User'
import type { FilterVariant } from '../../types/Table'
import { resetColumnFilterHelper } from '../../helpers/tableHelpers'
import CoinsTypography from '../common/Coins/CoinsTypography'
import CoinsContainer from '../common/Coins/CoinsContainer'
import IconContainer from '../common/Coins/IconContainer'
import DiamondIcon from '../icons/DiamondIcon'

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
  const [searchValue, setSearchValue] = useState<string | number>('')

  const resetFilter = resetColumnFilterHelper(
    setCurrentColumn,
    setSearchValue,
    setColumnFilters,
    columnFilters
  )

  const handleFilterByValue = useCallback(
    (column: string, value: typeof searchValue) => {
      setCurrentColumn(column)
      setSearchValue(value)
      setColumnFilters([{ id: column, value }])
    },
    [currentColum, searchValue]
  )

  const filtersVariants: FilterVariant[] = [
    {
      name: 'all bets',
      onClick: () => resetFilter()
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
      filterFn: 'equalsString',
      footer: (props) => props.column.id
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
    columnHelper.accessor((row: ISecondUser) => row.bet, {
      id: 'bet',
      header: () => 'Bet',
      cell: ({ row }) => (
        <CoinsContainer color='Transparent' size='Small'>
          <IconContainer color='GreenPrimary' size='Small'>
            <DiamondIcon />
          </IconContainer>
          <CoinsTypography quantity={row.original.bet} />
        </CoinsContainer>
      ),
      filterFn: (row, _columnId, value) => {
        return row.original.bet > value
      },
      footer: (props) => props.column.id
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
        <CoinsContainer color='Transparent' size='Small'>
          <IconContainer color={row.original.isWinner ? 'GreenPrimary' : 'RedAccent'} size='Small'>
            <DiamondIcon />
          </IconContainer>
          <CoinsTypography quantity={row.original.profit} fontColor='Green' />
        </CoinsContainer>
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
