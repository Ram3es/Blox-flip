import { useEffect, useMemo } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import type { ColumnDef, SortingState, OnChangeFn } from '@tanstack/react-table'
import clsx from 'clsx'
import { Button } from '../common/Button/Button'
import { ArrowLeftIcon } from '../ArrowLeftIcon/ArrowLeftIcon'
import { RadioGroup } from '@headlessui/react'

interface ReactTableProps<T extends object> {
  data: T[]
  columns: Array<ColumnDef<T>>
  sorting?: SortingState
  setSorting?: OnChangeFn<SortingState>
  columnFilters: any
  setColumnFilters: any
  field: any
  setField: any
  searchValue: string
  setSearchValue: any
  filter: string
  setFilter: (params: string) => void
  handleSelectChange: any
  filtersVariants: any
}

export const Table = <T extends object>({
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
}: ReactTableProps<T>) => {
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
    return table.getAllColumns().filter((col) => col.id === field)[0]
  }, [field, table])

  useEffect(() => {
    if (filteringColumn) {
      filteringColumn.setFilterValue(searchValue)
    }
  }, [filteringColumn, searchValue])

  return (
    <>
      <div className='flex flex-wrap justify-between border-b-2 border-blue-secondary mb-5 items-center'>
        <div className='text-17 whitespace-nowrap mb-5'>
          <span className='inline-block align-middle outline-green-primary/25 bg-green-primary outline outline-4 rounded-full mr-2.5 h-2 w-2'></span>
          Live feed
        </div>
        <RadioGroup value={filter} onChange={setFilter}>
          <div className='flex flex-wrap -ml-1 -mr-1 pb-4'>
            {filtersVariants.map((filter: any) => (
              <RadioGroup.Option key={filter.name} value={filter.name}>
                {({ checked }) => (
                  <button
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
                  </button>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      <div className='overflow-auto max-w-full'>
        <table className='text-13 text-center table--even min-w-full'>
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
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className='py-2 px-2 md:px-4'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className='mt-5 flex items-center justify-between'>
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            size='XL'
            variant='STANDARD'
            color='BLUE'
          >
            <ArrowLeftIcon color={!table.getCanPreviousPage() ? 'gray' : 'white'} />
          </Button>
          <div className='flex-grow border-blue-highlight border-t'></div>
          <span className='text-13 flex-shrink mx-6 text-gray-primary'>
            Page <span className='text-white'>{table.getState().pagination.pageIndex + 1}</span> /{' '}
            {table.getPageCount()}
          </span>
          <div className='flex-grow border-blue-highlight border-t'></div>
          <Button
            size='XL'
            variant='STANDARD'
            color='BLUE'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <p className='rotate-180'>
              <ArrowLeftIcon color={!table.getCanNextPage() ? 'gray' : 'white'} />
            </p>
          </Button>
        </div>
      </div>
    </>
  )
}
