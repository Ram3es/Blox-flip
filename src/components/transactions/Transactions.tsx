import { useState, useEffect, useContext } from 'react'
import { ColumnFiltersState, createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { Table } from '../table/Table'

import type { FilterVariant } from '../../types/Table'
import { ITransaction } from '../../types/Transaction'
import { TimeCell } from '../table/CellFormatters/TimeCell'
import { FilterHeader } from '../table/FilterHeader'
import { ListIcon } from '../icons/ListIcon'
import { handleFilterByValueHelper, resetColumnFilterHelper } from '../../helpers/tableHelpers'
import { TransactionTypeCell } from '../table/CellFormatters/TransactionTypeCell'
import { PaymentMethodCell } from '../table/PaymentMethodCell'
import { StatusCell } from '../table/CellFormatters/StatusCell'
import CoinsWithDiamond from '../common/CoinsWithDiamond'
import { useSocketCtx } from '../../store/SocketStore'
import { getToast } from '../../helpers/toast'
import { Context } from '../../store/Store'

export const Transactions = () => {
  const [data, setData] = useState<ITransaction[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [currentColum, setCurrentColumn] = useState('')
  const [searchValue, setSearchValue] = useState<string[] | string >([])

  const { socket } = useSocketCtx()
  const { state: { user } } = useContext(Context)

  const resetFilter = resetColumnFilterHelper(
    setCurrentColumn,
    setSearchValue,
    setColumnFilters,
    columnFilters
  )

  useEffect(() => {
    if (user?.id) {
      socket.emit('load_history', { type: 'transactions' }, (err: boolean | string, data: ITransaction[]) => {
        if (typeof err === 'string') {
          getToast(err)
        }
        setData(data)
      })
    }
  }, [user])
  const filterByValue = handleFilterByValueHelper(setCurrentColumn, setSearchValue)

  const filtersVariants: FilterVariant[] = [
    {
      name: 'all',
      onClick: () => resetFilter()
    },
    {
      name: 'crypto',
      onClick: () => filterByValue('currency', ['BTC', 'LTC', 'Eth'])
    },
    {
      name: 'roblox',
      onClick: () => filterByValue('currency', ['robux', 'skins'])
    }
  ]

  const columnHelper = createColumnHelper<ITransaction>()
  const columns: Array<ColumnDef<ITransaction, any>> = [
    columnHelper.accessor('id', {
      id: 'id',
      header: () => 'ID',
      cell: (props) => <div>{props.getValue()}</div>,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('type', {
      id: 'type',
      header: () => 'Type',
      cell: (props) => <TransactionTypeCell type={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('currency', {
      id: 'currency',
      header: () => 'Currency',
      cell: (props) => <PaymentMethodCell paymentMethod={props.getValue()} />,
      footer: (props) => props.column.id,
      filterFn: (row, _columnId, value) => {
        return value.map((item: string) => item.toLowerCase()).includes(row.original.currency.toLowerCase())
      }
    }),
    columnHelper.accessor((row: ITransaction) => row.amount, {
      id: 'amount',
      header: () => 'Amount',
      cell: ({ row }) => (
        <CoinsWithDiamond
          iconContainerColor={row.original.type === 'Withdraw' ? 'Gray' : 'GreenPrimary'}
          iconContainerSize='Small'
          iconClasses='w-3 h-3'
          typographyQuantity={row.original.amount}
        />
      ),
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('time', {
      id: 'time',
      header: () => 'Date',
      cell: (props) => <TimeCell date={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: () => 'Status',
      cell: (props) => <StatusCell status={props.getValue()} />,
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
            text='My transactions'
            textColor='text-gray-primary'
          />
        }
        variant='History'
      />
    </div>
  )
}
