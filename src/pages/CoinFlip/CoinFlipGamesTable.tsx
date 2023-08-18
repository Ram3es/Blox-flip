import { useMemo } from 'react'

import { ColumnDef, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import clsx from 'clsx'

import CFUserInfoCell from '../../components/table/CellFormatters/CFUserInfoCell'
import CFStatusCell from '../../components/table/CellFormatters/CFStatusCell'
import CoinsWithDiamond from '../../components/common/CoinsWithDiamond'

import { ICoinFlip } from '../../types/CoinFlip'

import { useCoinFlip } from '../../store/CoinFlipStore'

const CoinFlipGamesTable = () => {
  const { games } = useCoinFlip()

  const columnHelper = createColumnHelper<ICoinFlip>()
  const gameColumns: Array<ColumnDef<ICoinFlip, any>> = [
    columnHelper.accessor('creator.coin', {
      id: 'creator',
      header: () => 'Player',
      cell: ({ row: { original } }) => (
        <CFUserInfoCell
          userAvatar={original.winner ? original.winner?.avatar : original.creator?.avatar}
          coin={original.winner ? original.winner?.coin : original.creator?.coin}
        />
      ),
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('creator.value', {
      id: 'total',
      header: () => 'Total',
      cell: ({ row }) => (
        <CoinsWithDiamond
          containerSize="Large"
          containerColor="GreenGradient"
          typographyQuantity={row.original.creator.value}
          typographyFontSize="Size16"
        />
      ),
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('state', {
      id: 'status',
      header: () => 'Status',
      cell: ({ row }) => <CFStatusCell game={row.original} />,
      footer: (props) => props.column.id
    })
  ]

  const memoizedData = useMemo(() => games, [games])

  const table = useReactTable({
    data: memoizedData,
    columns: gameColumns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className="overflow-auto scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full max-w-full py-4">
      <table className="min-w-full border-separate border-spacing-y-2.5">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index, array) => {
                return (
                  <th key={header.id} className="pb-4 border-blue-highlight/50 border-b">
                    <div
                      className={clsx('text-left text-gray-primary font-semibold text-base', {
                        'text-right': array[index] === array.at(-1)
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
        <tbody className='before:content-["@"] before:text-transparent'>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell, index, array) => (
                <td
                  key={cell.id}
                  className={clsx('bg-blue-accent h-28', {
                    'rounded-l-md pl-4': index === 0,
                    'w-[200px]': index === 1,
                    'rounded-r-md pr-4': array[index] === array.at(-1)
                  })}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CoinFlipGamesTable
