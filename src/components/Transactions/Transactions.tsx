import { useCallback, useState } from 'react'
import { ColumnFiltersState, createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { Table } from '../Table/Table'

import type { FilterVariant } from '../../types/table'
import { ITransaction } from '../../types/transaction'
import { mockTransactions } from './mock'
import { TransactionTypeCell } from '../Table/TransactionTypeCell'
import { TimeCell } from '../Table/TimeCell'
import { PaymentMethodCell } from '../Table/PaymentMethodCell'
import { StatusCell } from '../Table/StatusCell'
import { FilterHeader } from '../Table/FilterHeader'
import { ListIcon } from '../ListIcon/ListIcon'
import { QuantityCoins } from '../common/QuantityCoins/QuantityCoins'

export const Transactions = () => {
  const [data] = useState<ITransaction[]>([...mockTransactions])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [currentColum, setCurrentColumn] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const resetColumnFilters = useCallback(() => {
    setColumnFilters([])
  }, [columnFilters])

  const handleFilterByValue = useCallback(
    (column: string, value: string) => {
      setCurrentColumn(column)
      setSearchValue(value)
    },
    [currentColum, searchValue]
  )

  const filtersVariants: FilterVariant[] = [
    {
      name: 'all',
      onClick: () => resetColumnFilters()
    },
    {
      name: 'crypto',
      onClick: () => handleFilterByValue('method', 'crypto')
    },
    {
      name: 'roblox',
      onClick: () => handleFilterByValue('method', 'robux')
    }
  ]

  const columnHelper = createColumnHelper<ITransaction>()
  const columns: Array<ColumnDef<ITransaction, any>> = [
    columnHelper.accessor('type', {
      id: 'type',
      header: () => 'Type',
      cell: (props) => <TransactionTypeCell type={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('date', {
      id: 'date',
      header: () => 'Date',
      cell: (props) => <TimeCell date={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('paymentMethod', {
      id: 'method',
      header: () => 'Method',
      cell: (props) => <PaymentMethodCell paymentMethod={props.getValue()} />,
      footer: (props) => props.column.id,
      filterFn: (row, _columnId, value) => {
        return row.original.paymentMethod.toLowerCase() === value.toLowerCase()
      }
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: () => 'Status',
      cell: (props) => <StatusCell status={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor((row: ITransaction) => row.amount, {
      id: 'amount',
      header: () => 'Amount',
      cell: ({ row }) => (
        <QuantityCoins quantity={row.original.amount} isFailed={row.original.isError} />
      ),
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
          <FilterHeader label={<ListIcon />} text='My transactions' textColor='text-gray-primary' />
        }
        variant='History'
      />
    </div>
  )
}
