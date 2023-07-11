import { useCallback, useMemo, useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import type { ColumnDef, SortingState } from '@tanstack/react-table'

import clsx from 'clsx'

import { Button } from '../../components/base/Button'
import { TablePagination } from '../../components/table/TablePagination'
import PreviewIcon from '../../components/icons/PreviewIcon'
import CaseModal from '../../components/containers/AdminModals/CaseModal'
import CoinsWithDiamond from '../../components/common/CoinsWithDiamond'

import { IMAGES } from '../../constants/images'

import { ICaseAdminItem } from '../../types/CaseAdmin'

import { caseAdminMock } from '../../mocks/caseAdmin'

interface ICaseModalState {
  state: boolean
  caseData: ICaseAdminItem | null
}

const caseModalInitialState: ICaseModalState = {
  state: true,
  caseData: null
}

const CaseAdmin = () => {
  const [data] = useState<ICaseAdminItem[]>([...caseAdminMock])
  const [sorting, setSorting] = useState<SortingState>([])
  const [caseModal, setCaseModal] = useState<ICaseModalState>(caseModalInitialState)

  const handleCreateCase = useCallback(() => {
    setCaseModal({ state: true, caseData: null })
  }, [])

  const handleEditCase = useCallback((caseData: ICaseAdminItem) => {
    setCaseModal({ state: true, caseData })
  }, [])

  const handleCloseCase = useCallback(() => {
    setCaseModal({ state: false, caseData: null })
  }, [])

  const columnHelper = createColumnHelper<ICaseAdminItem>()
  const columns: Array<ColumnDef<ICaseAdminItem, any>> = [
    columnHelper.accessor((row: ICaseAdminItem) => row, {
      id: 'case',
      header: () => 'Case',
      cell: ({ row }) => (
        <div className='flex items-center gap-3'>
          <div className='w-[47px] h-[53px] flex items-center justify-center'>
            <img src={IMAGES.greenBox} className='w-full h-full object-contain' alt='' />
          </div>
          <p className='font-bold text-white text-13'>{row.original.caseName}</p>
        </div>
      ),
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('isPublic', {
      id: 'public',
      header: () => 'Public',
      cell: (props) => (
        <span className='font-semibold'>{props.cell.getValue() ? 'Yes' : 'No'}</span>
      ),
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('category', {
      id: 'category',
      header: () => 'Category',
      cell: ({ cell }) => (
        <span className='capitalize font-bold text-white text-13'>{cell.getValue()}</span>
      ),
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('price', {
      id: 'price',
      header: 'Price',
      cell: ({ cell }) => (
        <CoinsWithDiamond
          iconContainerSize='Small'
          iconClasses='w-3.5'
          typographyFontColor='Green'
          typographyQuantity={cell.getValue()}
          typographyFontSize='Size13'
        />
      ),
      footer: (props) => props.column.id
    }),
    columnHelper.accessor((row: ICaseAdminItem) => row, {
      id: 'profit',
      header: 'Create new',
      cell: ({ row }) => (
        <Button
          onClick={() => handleEditCase(row.original)}
          className='flex items-center h-[33px] min-w-[76px] px-2 py-2 justify-between rounded bg-blue-accent-secondary hover:bg-blue-accent text-gray-primary'
        >
          <PreviewIcon iconClasses='mx-auto my-auto' />
          <span className='text-sm font-semibold'>View</span>
        </Button>
      ),
      footer: (props) => props.column.id
    })
  ]

  const memoizedData = useMemo(() => data, [data])
  const memoizedColumns = useMemo(() => columns, [columns])

  const table = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    enableFilters: true,
    enableColumnFilters: true,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  return (
    <>
      <div className='overflow-auto max-w-full py-4'>
        <table className='text-13 min-w-full border-separate border-spacing-y-1'>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index, array) => {
                  return array[index] === array.at(-1)
                    ? (
                    <th key={header.id} className='pb-4'>
                      <Button variant='GreenGradient' onClick={handleCreateCase}>
                        <span className='flex items-center justify-center min-w-[87px] min-h-[29px] text-xs'>
                          Create new
                        </span>
                      </Button>
                    </th>
                      )
                    : (
                    <th key={header.id} className='pb-4 font-medium'>
                      <div
                        onClick={header.column.getToggleSortingHandler()}
                        className={clsx('cursor-pointer leading-2 px-1 w-24 py-1 rounded', {
                          'text-green-primary bg-green-primary/15 border border-green-primary':
                            header.column.getIsSorted(),
                          'text-gray-primary bg-blue-secondary': !header.column.getIsSorted()
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
                    className={clsx('px-2 md:px-4 text-gray-primary bg-blue-secondary py-2', {
                      'rounded-l-md': index === 0,
                      'rounded-r-md': array[index] === array.at(-1)
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
      {caseModal.state && (
        <CaseModal
          handleClose={handleCloseCase}
          caseData={caseModal.caseData}
        />
      )}
    </>
  )
}

export default CaseAdmin
