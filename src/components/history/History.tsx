import { useContext, useEffect, useState } from 'react'
import { ColumnFiltersState, createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { Table } from '../table/Table'

import type { FilterVariant } from '../../types/Table'
import { TimeCell } from '../table/CellFormatters/TimeCell'
import { FilterHeader } from '../table/FilterHeader'
import { ListIcon } from '../icons/ListIcon'
import { IHistory } from '../../types/History'
import { GameCell } from '../table/CellFormatters/GameCell'
import { handleFilterByValueHelper } from '../../helpers/tableHelpers'
import CoinsWithDiamond from '../common/CoinsWithDiamond'
import { useSocketCtx } from '../../store/SocketStore'
import { getToast } from '../../helpers/toast'
import { Context } from '../../store/Store'

export const History = () => {
  const [data, setData] = useState<IHistory[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [currentColum, setCurrentColumn] = useState('')
  const [searchValue, setSearchValue] = useState<string | string[]>('')

  const { socket, isAuthenticated } = useSocketCtx()

  const { state: { user } } = useContext(Context)

  const filterByValue = handleFilterByValueHelper(setCurrentColumn, setSearchValue)

  const filtersVariants: FilterVariant[] = [
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
      name: 'wheel',
      onClick: () => filterByValue('game', 'wheel')
    },
    {
      name: 'case',
      onClick: () => filterByValue('game', 'case')
    },
    {
      name: 'battle',
      onClick: () => filterByValue('game', 'battle')
    }
  ]

  useEffect(() => {
    if (user?.id && isAuthenticated) {
      socket.emit('load_history', { type: searchValue === 'case' ? 'cases' : searchValue === 'battle' ? 'cases battles' : searchValue || filtersVariants[0].name }, (err: boolean | string, data: IHistory[]) => {
        if (typeof err === 'string') {
          getToast(err)
        }
        setData(data)
      })
    }
  }, [searchValue, user, isAuthenticated])

  const columnHelper = createColumnHelper<IHistory>()
  const columns: Array<ColumnDef<IHistory, any>> = [
    columnHelper.accessor((row: IHistory) => row.id, {
      id: 'id',
      header: () => 'ID',
      cell: ({ row }) => (
        <div>{row.original.id}</div>
      ),
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('game', {
      id: 'game',
      header: () => 'Game',
      cell: (props) => <GameCell game={props.getValue()} />,
      footer: (props) => props.column.id,
      filterFn: 'equalsString'
    }),
    columnHelper.accessor('wager', {
      id: 'wager',
      header: () => 'Wager',
      cell: (props) => (
        <CoinsWithDiamond iconContainerSize='Small' typographyQuantity={props.getValue()} />
      ),
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('time', {
      id: 'time',
      header: () => 'Date',
      cell: (props) => <TimeCell date={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor((row: IHistory) => row.value, {
      id: 'profit',
      header: () => 'Profit',
      cell: ({ row }) => (
        <CoinsWithDiamond
          iconContainerColor={row.original.won ? 'GreenPrimary' : 'RedAccent'}
          iconContainerSize='Small'
          typographyQuantity={row.original.value}
          typographyFontColor={row.original.won ? 'Green' : 'Red'}
        />
      ),
      footer: (props) => props.column.id
    })
  ]
  return (
    <div className='py-5'>
      { data
        ? <Table
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
          <FilterHeader
            label={
              <span className='text-gray-primary'>
                <ListIcon />
              </span>
            }
            text='My history'
            textColor='text-gray-primary'
          />
        }
        variant='History'
      />
        : ''}
    </div>
  )
}
