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

import { FilterVariant, TableVariant } from '../../types/Table'
import { TablePagination } from './TablePagination'
import { FilterButton } from './FilterButton'

interface ReactTableProps<T extends object> {
  data: T[]
  columns: Array<ColumnDef<T>>
  sorting?: SortingState
  setSorting?: OnChangeFn<SortingState>
  columnFilters?: ColumnFilter[]
  setColumnFilters?: OnChangeFn<ColumnFiltersState>
  currentColum?: string
  searchValue?: string | number | string []
  filtersVariants?: FilterVariant[]
  tableHeader?: ReactNode
  variant: keyof typeof TableVariant
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
  tableHeader,
  variant
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
      <div
        className={clsx('flex flex-wrap justify-between border-blue-secondary mb-5 items-center', {
          'border-b-2': variant === TableVariant.Feed
        })}
      >
        {columnFilters && setColumnFilters && filtersVariants && (
          <>
            {tableHeader}
            <RadioGroup value={currentFilter} onChange={setCurrentFilter}>
              <div className='flex flex-wrap -ml-1 -mr-1 pb-4'>
                {filtersVariants?.map((filter: FilterVariant) => (
                  <RadioGroup.Option key={filter.name} value={filter.name}>
                    {({ checked }) => (
                      <>
                        <FilterButton onClick={filter.onClick} variant={variant} isActive={checked}>
                          {filter.name}
                        </FilterButton>
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </>
        )}
      </div>
      <div
        className={clsx(' overflow-auto max-w-full', {
          'bg-blue-primary rounded-2xl px-4 md:px-6 py-4': variant === TableVariant.History,
          'bg-blue-primary': variant === TableVariant.Feed
        })}
      >
        <table
          className={clsx('text-13 min-w-full', {
            'table--even': variant === TableVariant.History || variant === TableVariant.Feed,
            'border-separate border-spacing-y-1': variant === TableVariant.Stats
          })}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index, array) => {
                  return (
                    <th key={header.id} className='pb-4 font-medium'>
                      <div
                        onClick={header.column.getToggleSortingHandler()}
                        className={clsx('cursor-pointer leading-2 px-1 w-24 py-1 rounded', {
                          'text-green-primary bg-green-primary/15 border border-green-primary':
                            header.column.getIsSorted(),
                          'text-gray-primary bg-blue-secondary': !header.column.getIsSorted(),
                          '': index !== 0 && index !== array.length - 1,
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
                    className={clsx('px-2 md:px-4', {
                      'rounded-l-md': index === 0,
                      'rounded-r-md': array[index] === array.at(-1),
                      'py-2': variant === TableVariant.Feed,
                      'py-4': variant === TableVariant.History,
                      'text-gray-primary bg-blue-secondary py-2': variant === TableVariant.Stats
                    })}
                  >
                    <div
                      className={clsx('', {
                        'w-36': index !== 0 && index !== array.length - 1
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
        {data.length > 10 && (
          <TablePagination
            nextPage={() => table.nextPage()}
            previousPage={() => table.previousPage()}
            getCanNextPage={!table.getCanNextPage()}
            getCanPreviousPage={!table.getCanPreviousPage()}
            currentPage={table.getState().pagination.pageIndex + 1}
            pageCount={table.getPageCount()}
          />
        )}
      </div>
    </>
  )
}
