import { useMemo } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import type { ColumnDef, SortingState, OnChangeFn } from '@tanstack/react-table'
import clsx from 'clsx'
import { Button } from '../common/Button/Button'
import { ArrowLeftIcon } from '../ArrowLeftIcon/ArrowLeftIcon'
import { ArrowRightIcon } from '../ArrowRightIcon/ArrowRightIcon'

interface ReactTableProps<T extends object> {
  data: T[]
  columns: Array<ColumnDef<T>>
  sorting?: SortingState
  setSorting?: OnChangeFn<SortingState>
}

export const Table = <T extends object>({
  data,
  columns,
  sorting,
  setSorting
}: ReactTableProps<T>) => {
  const memoizedData = useMemo(() => data, [data])
  const memoizedColumns = useMemo(() => columns, [columns])

  const table = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    state: {
      sorting
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting
  })

  return (
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
          <ArrowRightIcon color={!table.getCanNextPage() ? 'gray' : 'white'} />
        </Button>
      </div>
    </div>
  )
}
