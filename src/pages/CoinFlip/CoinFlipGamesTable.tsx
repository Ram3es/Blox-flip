import { useState } from 'react'
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'

import clsx from 'clsx'

import CFUserInfoCell from '../../components/table/CellFormatters/CFUserInfoCell'
import ItemsListCell from '../../components/table/CellFormatters/ItemsListCell'
import CFStatusCell from '../../components/table/CellFormatters/CFStatusCell'

import type { CoinFlipGame } from '../../types/CoinFlip'
import { coinFlipMock } from '../../mocks/coinFlipMock'
import CoinsContainer from '../../components/common/Coins/CoinsContainer'
import IconContainer from '../../components/common/Coins/IconContainer'
import DiamondIcon from '../../components/icons/DiamondIcon'
import CoinsTypography from '../../components/common/Coins/CoinsTypography'

const CoinFlipGamesTable = () => {
  const [games] = useState<CoinFlipGame[]>(coinFlipMock)

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
        <CoinsContainer color='GreenGradient' size='ExtraLarge'>
          <IconContainer color='GreenPrimary' size='Medium'>
            <DiamondIcon />
          </IconContainer>
          <CoinsTypography quantity={14214.51} fontSize='Size14' />
        </CoinsContainer>
      ),
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: () => 'Status',
      cell: ({ row }) => (
        <CFStatusCell
          gameId='rqwsrqwsrq2'
          status={row.original.status}
          coin={row.original.winCoin}
        />
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
    <div className='overflow-auto scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full max-w-full py-4'>
      <table className='min-w-full border-separate border-spacing-y-2.5'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index, array) => {
                return (
                  <th key={header.id} className='pb-4 border-blue-highlight/50 border-b'>
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
                  className={clsx('bg-blue-accent', {
                    'rounded-l-md pl-4': index === 0,
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
