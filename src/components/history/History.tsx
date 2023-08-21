import { useEffect, useState } from 'react'
import { ColumnFiltersState, createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { Table } from '../table/Table'

import type { FilterVariant } from '../../types/Table'
import { TimeCell } from '../table/CellFormatters/TimeCell'
import { FilterHeader } from '../table/FilterHeader'
import { ListIcon } from '../icons/ListIcon'
import { IHistory } from '../../types/History'
import { GameCell } from '../table/CellFormatters/GameCell'
import { MultiplierCell } from '../table/CellFormatters/MultiplierCell'
import { handleFilterByValueHelper } from '../../helpers/tableHelpers'
import CoinsWithDiamond from '../common/CoinsWithDiamond'
import { useSocketCtx } from '../../store/SocketStore'
import { getToast } from '../../helpers/toast'

interface ILoadHistory extends Pick<IHistory, 'id' | 'game' | 'wager'> {
  won: boolean
  time: Date
  value: number
}

export const History = () => {
  const [data, setData] = useState<IHistory[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [currentColum, setCurrentColumn] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const { socket } = useSocketCtx()

  // const resetFilter = resetColumnFilterHelper(
  //   setCurrentColumn,
  //   setSearchValue,
  //   setColumnFilters,
  //   columnFilters
  // )
  const filterByValue = handleFilterByValueHelper(setCurrentColumn, setSearchValue)

  const filtersVariants: FilterVariant[] = [
    // {
    //   name: 'all',
    //   onClick: () => resetFilter()
    // },
    // {
    //   name: 'crash',
    //   onClick: () => filterByValue('game', 'crash')
    // },
    // {
    //   name: 'champion',
    //   onClick: () => filterByValue('game', 'champion')
    // },
    // {
    //   name: 'mines',
    //   onClick: () => filterByValue('game', 'mines')
    // },
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
      name: 'cases',
      onClick: () => filterByValue('game', 'cases')
    },
    {
      name: 'cases battles',
      onClick: () => filterByValue('game', 'cases battles')
    }
  ]

  useEffect(() => {
    socket.emit('load_history', { type: searchValue || filtersVariants[0].name }, (err: boolean | string, data: ILoadHistory[]) => {
      if (typeof err === 'string') {
        getToast(err)
      }
      setData(() => data.map(game => ({
        ...game,
        isWinner: game.won,
        profit: game.value,
        date: game.time.toDateString()
      })))
    })
  }, [searchValue])

  const columnHelper = createColumnHelper<IHistory>()
  const columns: Array<ColumnDef<IHistory, any>> = [
    columnHelper.accessor((row: IHistory) => row.id, {
      id: 'id',
      header: () => 'ID',
      cell: ({ row }) => (
        <MultiplierCell gameID={row.original.id} />
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
    columnHelper.accessor('date', {
      id: 'date',
      header: () => 'Date',
      cell: (props) => <TimeCell date={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor((row: IHistory) => row.profit, {
      id: 'profit',
      header: () => 'Profit',
      cell: ({ row }) => (
        <CoinsWithDiamond
          iconContainerColor={row.original.isWinner ? 'GreenPrimary' : 'RedAccent'}
          iconContainerSize='Small'
          typographyQuantity={row.original.profit}
          typographyFontColor={row.original.isWinner ? 'Green' : 'Red'}
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
    </div>
  )
}
