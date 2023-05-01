import { FC } from 'react'
import ArrowThinIcon from '../icons/ArrowThinIcon'
import { Button } from '../base/Button'

interface TablePaginationProps {
  nextPage: () => void
  previousPage: () => void
  getCanNextPage: boolean
  getCanPreviousPage: boolean
  currentPage: number
  pageCount: number
}

export const TablePagination: FC<TablePaginationProps> = ({
  nextPage,
  previousPage,
  getCanNextPage,
  getCanPreviousPage,
  currentPage,
  pageCount
}) => {
  return (
    <div className='mt-5 flex items-center justify-between'>
      <Button color='BlueAccent' onClick={previousPage} disabled={getCanPreviousPage}>
        <span
          className={`flex items-center justify-center w-9 h-9 ${
            getCanPreviousPage ? 'text-gray-500' : 'text-white'
          }`}
        >
          <ArrowThinIcon />
        </span>
      </Button>
      <div className='flex-grow border-blue-highlight border-t'></div>
      <span className='text-13 flex-shrink mx-6 text-gray-primary'>
        Page <span className='text-white'>{currentPage}</span> / {pageCount}
      </span>
      <div className='flex-grow border-blue-highlight border-t'></div>
      <Button color='BlueAccent' onClick={nextPage} disabled={getCanNextPage}>
        <span
          className={`flex items-center justify-center w-9 h-9 rotate-180 ${
            getCanNextPage ? 'text-gray-500' : 'text-white'
          }`}
        >
          <ArrowThinIcon />
        </span>
      </Button>
    </div>
  )
}
