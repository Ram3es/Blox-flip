import { FC } from 'react'
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon'
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
      <Button
        variant='Standard'
        color='BlueAccent'
        onClick={previousPage}
        disabled={getCanPreviousPage}
      >
        <span className='flex items-center justify-center w-9 h-9'>
          <ArrowLeftIcon color={getCanPreviousPage ? 'gray' : 'white'} />
        </span>
      </Button>
      <div className='flex-grow border-blue-highlight border-t'></div>
      <span className='text-13 flex-shrink mx-6 text-gray-primary'>
        Page <span className='text-white'>{currentPage}</span> / {pageCount}
      </span>
      <div className='flex-grow border-blue-highlight border-t'></div>
      <Button variant='Standard' color='BlueAccent' onClick={nextPage} disabled={getCanNextPage}>
        <span className='flex items-center justify-center w-9 h-9 rotate-180'>
          <ArrowLeftIcon color={getCanNextPage ? 'gray' : 'white'} />
        </span>
      </Button>
    </div>
  )
}
