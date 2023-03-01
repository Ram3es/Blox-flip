import { ReactNode, useEffect, useMemo, useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import type {
  ColumnDef,
  SortingState,
  OnChangeFn,
  ColumnFilter,
  ColumnFiltersState
} from '@tanstack/react-table'
import clsx from 'clsx'
import { RadioGroup } from '@headlessui/react'

import { ArrowLeftIcon } from '../ArrowLeftIcon/ArrowLeftIcon'
import type { FilterVariant } from '../../types/table'
import { Button } from '../base/Button'

interface ReactTableProps<T extends object> {
  data: T[]
  columns: Array<ColumnDef<T>>
  sorting?: SortingState
  setSorting?: OnChangeFn<SortingState>
  columnFilters?: ColumnFilter[]
  setColumnFilters?: OnChangeFn<ColumnFiltersState>
  currentColum?: string
  searchValue?: string
  filtersVariants?: FilterVariant[]
  tableHeader?: ReactNode
}

export const Table = <T extends object>({
  data,
  columns,
  sorting,
  setSorting,
  columnFilters,
  setColumnFilters,
  currentColum,
  searchValue,
  filtersVariants,
  tableHeader
}: ReactTableProps<T>) => {
  const [currentFilter, setCurrentFilter] = useState<string | null>(null)
  const memoizedData = useMemo(() => data, [data])
  const memoizedColumns = useMemo(() => columns, [columns])
  const table = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    enableFilters: true,
    enableColumnFilters: true,
    state: {
      sorting,
      columnFilters
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  })

  const filteringColumn = useMemo(() => {
    return table.getAllColumns().filter((col) => col.id === currentColum)[0]
  }, [currentColum, table])

  useEffect(() => {
    if (filtersVariants) {
      setCurrentFilter(filtersVariants[0].name)
    }
  }, [])

  useEffect(() => {
    if (filteringColumn) {
      filteringColumn.setFilterValue(searchValue)
    }
  }, [filteringColumn, searchValue])

  return (
    <>
      <div className='flex flex-wrap justify-between border-b-2 border-blue-secondary mb-5 items-center'>
        {columnFilters && setColumnFilters && filtersVariants && (
          <>
            {tableHeader}
            <RadioGroup value={currentFilter} onChange={setCurrentFilter}>
              <div className='flex flex-wrap -ml-1 -mr-1 pb-4'>
                {filtersVariants?.map((filter: FilterVariant) => (
                  <RadioGroup.Option key={filter.name} value={filter.name}>
                    {({ checked }) => (
                      <Button
                        onClick={filter.onClick}
                        className={clsx(
                          'capitalize text-13 py-1.5 leading-2 px-2 w-28 text-center rounded mx-1 border',
                          {
                            'bg-blue-accent border-blue-light text-white mb-1': checked,
                            'text-gray-primary  bg-blue-secondary hover:bg-blue-accent border-blue-secondary mb-1':
                              !checked
                          }
                        )}
                      >
                        {filter.name}
                      </Button>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </>
        )}
      </div>
      <div className='overflow-auto max-w-full'>
        <table className='text-13 table--even min-w-full'>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index, array) => {
                  return (
                    <th key={header.id} className='pb-4 font-medium'>
                      <div
                        onClick={header.column.getToggleSortingHandler()}
                        className={clsx('cursor-pointer leading-2 px-1 w-21 py-1 rounded', {
                          'text-green-primary bg-green-primary/15 border border-green-primary':
                            header.column.getIsSorted(),
                          'text-gray-primary bg-blue-secondary': !header.column.getIsSorted(),
                          'mx-auto': index !== 0 && index !== array.length - 1,
                          'ml-0': index === 0,
                          'ml-auto': array[index] === array.at(-1)
                        })}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell, index, array) => (
                  <td
                    key={cell.id}
                    className={clsx('py-2 px-2 md:px-4', {
                      '': index !== 0 && index !== array.length - 1,
                      'rounded-l-md': index === 0,
                      'rounded-r-md': array[index] === array.at(-1)
                    })}
                  >
                    <div
                      className={clsx('', {
                        'w-36': index !== 0 && index !== array.length - 1,
                        'w-64': index === 0
                      })}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className='mt-5 flex items-center justify-between'>
          <Button
            variant='Standard'
            color='BlueAccent'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='flex items-center justify-center w-9 h-9'>
              <ArrowLeftIcon color={!table.getCanPreviousPage() ? 'gray' : 'white'} />
            </span>
          </Button>
          <div className='flex-grow border-blue-highlight border-t'></div>
          <span className='text-13 flex-shrink mx-6 text-gray-primary'>
            Page <span className='text-white'>{table.getState().pagination.pageIndex + 1}</span> /{' '}
            {table.getPageCount()}
          </span>
          <div className='flex-grow border-blue-highlight border-t'></div>
          <Button
            variant='Standard'
            color='BlueAccent'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className='flex items-center justify-center w-9 h-9 rotate-180'>
              <ArrowLeftIcon color={!table.getCanNextPage() ? 'gray' : 'white'} />
            </span>
          </Button>
        </div>
      </div>
    </>
  )
}
