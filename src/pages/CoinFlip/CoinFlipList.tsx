import { useState } from 'react'
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'

import clsx from 'clsx'
import { coinFlipMock } from '../../mocks/coinFlipMock'
import { CoinFlipGame } from '../../types/CoinFlip'
import CFUserInfoCell from '../../components/table/CellFormaters/CFUserInfoCell'
import ItemsListCell from '../../components/table/CellFormaters/ItemsListCell'
import { QuantityCoins } from '../../components/common/QuantityCoins/QuantityCoins'

const CoinFlipList = () => {
  const [games, setGames] = useState<CoinFlipGame[]>(coinFlipMock)

  const columnHelper = createColumnHelper<CoinFlipGame>()
  const gameColumns: Array<ColumnDef<CoinFlipGame, any>> = [
    columnHelper.accessor('firstPlayer.coin', {
      id: 'firstPlayer',
      header: () => 'Player',
      cell: (props) => <CFUserInfoCell coin={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('firstPlayer.items', {
      id: 'items',
      header: () => 'Items',
      cell: (props) => <ItemsListCell items={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('firstPlayer.coin', {
      id: 'total',
      header: () => 'Total',
      cell: (props) => (
        <div className='border border-green-primary gradient-green-secondary shadow-green-primary-20 rounded p-2.5 max-w-[120px]'>
          <QuantityCoins quantity={props.getValue()} />
        </div>
      ),
      footer: (props) => props.column.id
    })
  ]

  const table = useReactTable({
    data: games,
    columns: gameColumns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className='overflow-auto max-w-full py-4'>
      <table className='min-w-full border-separate border-spacing-y-1'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index, array) => {
                return (
                  <th key={header.id} className='pb-4'>
                    <div className='text-gray-primary font-semibold text-base'>
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
                  className={clsx('bg-blue-accent', {
                    'rounded-l-md': index === 0,
                    'rounded-r-md': array[index] === array.at(-1)
                  })}
                >
                  <div className={clsx('', {})}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CoinFlipList
