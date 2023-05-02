import { useState } from 'react'
import { ColumnFiltersState, createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { Table } from '../table/Table'

import type { FilterVariant } from '../../types/Table'
import { TimeCell } from '../table/CellFormatters/TimeCell'
import { FilterHeader } from '../table/FilterHeader'
import { ListIcon } from '../icons/ListIcon'
import { mockHistory } from '../../mocks/gameHistoryMock'
import { IHistory } from '../../types/History'
import { GameCell } from '../table/CellFormatters/GameCell'
import { MultiplierCell } from '../table/CellFormatters/MultiplierCell'
import { QuantityCoins } from '../common/QuantityCoins/QuantityCoins'
import { handleFilterByValueHelper, resetColumnFilterHelper } from '../../helpers/tableHelpers'
import CoinsTypography from '../common/Coins/CoinsTypography'
import CoinsContainer from '../common/Coins/CoinsContainer'
import IconContainer from '../common/Coins/IconContainer'
import DiamondIcon from '../icons/DiamondIcon'

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
      cell: (props) => (
        <CoinsContainer color='Transparent'>
          <IconContainer color='GreenPrimary' size='Small'>
            <DiamondIcon />
          </IconContainer>
          <CoinsTypography quantity={props.getValue()} />
        </CoinsContainer>
      ),
      footer: (props) => props.column.id
    }),
    columnHelper.accessor((row: IHistory) => row.profit, {
      id: 'profit',
      header: () => 'Profit',
      cell: ({ row }) => (
        <CoinsContainer color='Transparent'>
          <IconContainer color={row.original.isWinner ? 'GreenPrimary' : 'RedAccent'} size='Small'>
            <DiamondIcon />
          </IconContainer>
          <CoinsTypography
            quantity={row.original.profit}
            fontColor={row.original.isWinner ? 'Green' : 'Red'}
          />
        </CoinsContainer>
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
