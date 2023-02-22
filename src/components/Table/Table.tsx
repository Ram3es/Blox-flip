import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import clsx from 'clsx'

export const Table = <T extends unknown> ({ data, columns }: { data: T[], columns: Array<ColumnDef<T>> }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true
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
                      {{
                        asc: '🔼',
                        desc: '🔽'
                      }[header.column.getIsSorted() as string] ?? null}
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
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className='bg-blue-highlight w-9 h-9 rounded flex items-center justify-center'
        >
          <svg
            width='10'
            height='8'
            viewBox='0 0 10 8'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M0.159838 3.62638L3.77119 0.153545C3.87428 0.0544132 4.01168 0 4.15818 0C4.30484 0 4.44216 0.0544914 4.54525 0.153545L4.87313 0.468923C4.97614 0.567899 5.03289 0.700102 5.03289 0.84106C5.03289 0.98194 4.97614 1.1186 4.87313 1.21757L2.76632 3.24799H9.45976C9.76155 3.24799 10 3.47518 10 3.76546V4.21132C10 4.5016 9.76155 4.7517 9.45976 4.7517H2.74242L4.87305 6.79345C4.97606 6.89258 5.03281 7.02119 5.03281 7.16215C5.03281 7.30295 4.97606 7.43343 4.87305 7.53248L4.54517 7.84685C4.44208 7.94598 4.30476 8 4.1581 8C4.01159 8 3.8742 7.94527 3.77111 7.84614L0.159756 4.37339C0.0564232 4.27394 -0.000405312 4.14119 1.90735e-06 4.00008C-0.000323296 3.85849 0.0564232 3.72567 0.159838 3.62638Z'
              fill='white'
            />
          </svg>
        </button>
        <div className='flex-grow border-blue-highlight border-t'></div>
        <span className='text-13 flex-shrink mx-6'>
          {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
        </span>
        <div className='flex-grow border-blue-highlight border-t'></div>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className='bg-blue-highlight w-9 h-9 rounded flex items-center justify-center'
        >
          <svg
            width='10'
            height='8'
            viewBox='0 0 10 8'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M9.84016 3.62638L6.22881 0.153545C6.12572 0.0544132 5.98832 0 5.84182 0C5.69516 0 5.55784 0.0544914 5.45475 0.153545L5.12687 0.468923C5.02386 0.567899 4.96711 0.700102 4.96711 0.84106C4.96711 0.98194 5.02386 1.1186 5.12687 1.21757L7.23368 3.24799H0.540239C0.238453 3.24799 0 3.47518 0 3.76546V4.21132C0 4.5016 0.238453 4.7517 0.540239 4.7517H7.25758L5.12695 6.79345C5.02394 6.89258 4.96719 7.02119 4.96719 7.16215C4.96719 7.30295 5.02394 7.43343 5.12695 7.53248L5.45483 7.84685C5.55792 7.94598 5.69524 8 5.8419 8C5.98841 8 6.1258 7.94527 6.22889 7.84614L9.84024 4.37339C9.94358 4.27394 10.0004 4.14119 10 4.00008C10.0003 3.85849 9.94358 3.72567 9.84016 3.62638Z'
              fill='white'
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
