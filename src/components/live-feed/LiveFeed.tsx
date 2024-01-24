import { useCallback, useContext, useState } from 'react'
import { ColumnFiltersState, createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { Table } from '../table/Table'

import { UserInfoCell } from '../table/CellFormatters/UserInfoCell'
import { GameCell } from '../table/CellFormatters/GameCell'
import { TimeCell } from '../table/CellFormatters/TimeCell'
import { FilterHeader } from '../table/FilterHeader'

import type { FilterVariant } from '../../types/Table'
import { resetColumnFilterHelper } from '../../helpers/tableHelpers'
import CoinsWithDiamond from '../common/CoinsWithDiamond'
import { Context } from '../../store/Store'
import { ILiveFeedUser } from '../../types/LiveFeed'
import { MultiplierCell } from '../table/CellFormatters/MultiplierCell'
import { useLiveFeed } from '../../store/LiveFeedStore'
import PulseGreenPoint from '../common/PulseGreenPoint'

export const LiveFeed = () => {
  const { state } = useContext(Context)
  const { bets } = useLiveFeed()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'time', desc: true }])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [currentColum, setCurrentColumn] = useState('')
  const [searchValue, setSearchValue] = useState<string | number | string[]>('')

  const resetFilter = resetColumnFilterHelper(setCurrentColumn, setSearchValue, setColumnFilters, columnFilters)

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
      onClick: () => handleFilterByValue('username', state.user?.name ?? '')
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

  const columnHelper = createColumnHelper<ILiveFeedUser>()
  const columns: Array<ColumnDef<ILiveFeedUser, any>> = [
    columnHelper.accessor((row: ILiveFeedUser) => row.username, {
      id: 'username',
      header: () => 'Username',
      cell: ({ row }) => {
        const { useravatar, username, level = 0 } = row.original
        return <UserInfoCell user={{ avatar: useravatar, name: username, level }} level={false} />
      },
      filterFn: 'equalsString',
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('game', {
      id: 'game',
      header: () => 'Game',
      cell: (props) => <GameCell game={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('time', {
      id: 'time',
      header: () => 'Time',
      cell: (props) => <TimeCell date={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor((row: ILiveFeedUser) => row.time, {
      id: 'bet',
      header: () => 'Bet',
      cell: ({ row }) => (
        <CoinsWithDiamond
          containerSize="Small"
          iconContainerSize="Small"
          iconClasses="w-3 h-3"
          typographyQuantity={row.original.amount}
          typographyFontSize="Size13"
        />
      ),
      filterFn: (row, _columnId, value) => {
        return row.original.amount > value
      },
      footer: (props) => props.column.id
    }),
    columnHelper.accessor((row: ILiveFeedUser) => row.profit, {
      id: 'multiplier',
      header: () => 'Multiplier',
      cell: (props) => <MultiplierCell multiplier={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor((row: ILiveFeedUser) => row.profit, {
      id: 'profit',
      header: 'Profit',
      cell: ({ row }) => {
        const profit = row.original.profit * row.original.amount
        const isWin = profit >= row.original.amount

        return (
          <CoinsWithDiamond
            containerSize="Small"
            iconContainerColor={isWin ? 'GreenPrimary' : 'RedAccent'}
            iconContainerSize="Small"
            iconClasses="w-3 h-3"
            typographyQuantity={Math.round(profit)}
            typographyFontSize="Size13"
            typographyFontColor={isWin ? 'Green' : 'White'}
          />
        )
      },
      filterFn: (row, _columnId, value) => {
        return row.original.profit > value
      },
      footer: (props) => props.column.id
    })
  ]

  return (
    <div className="bg-blue-primary rounded-2xl px-4 md:px-9 py-5">
      <Table
        data={bets}
        columns={columns}
        sorting={sorting}
        setSorting={setSorting}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        currentColum={currentColum}
        searchValue={searchValue}
        filtersVariants={filtersVariants}
        tableHeader={<FilterHeader label={<PulseGreenPoint />} text="Live feed" />}
        variant="Feed"
      />
    </div>
  )
}
