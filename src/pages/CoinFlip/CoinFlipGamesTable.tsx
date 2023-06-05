import { useEffect, useState } from 'react'
import { useSocketCtx } from '../../store/SocketStore'

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
import CoinsWithDiamond from '../../components/common/CoinsWithDiamond'

import { ICoinFlip } from '../../types/CoinFlip'
import { coinFlipGamesMock } from '../../mocks/coinFlipMock'
import { getCostByFieldName } from '../../helpers/numbers'

const CoinFlipGamesTable = () => {
  const [games, setGames] = useState<ICoinFlip[]>(coinFlipGamesMock)
  const { socket } = useSocketCtx()

  const removeGameById = (games: ICoinFlip[], gameId: string): ICoinFlip[] =>
    games.filter((game) => game.id !== gameId)

  const columnHelper = createColumnHelper<ICoinFlip>()
  const gameColumns: Array<ColumnDef<ICoinFlip, any>> = [
    columnHelper.accessor('creator.coin', {
      id: 'creator',
      header: () => 'Player',
      cell: (props) => (
        <CFUserInfoCell userAvatar={props.row.original.creator.avatar} coin={props.getValue()} />
      ),
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('creator.skins', {
      id: 'items',
      header: () => 'Items',
      cell: (props) => <ItemsListCell items={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('creator.skins', {
      id: 'total',
      header: () => 'Total',
      cell: ({ row }) => (
        <CoinsWithDiamond
          containerSize='Large'
          containerColor='GreenGradient'
          typographyQuantity={getCostByFieldName(row.original.creator.skins, 'price')}
          typographyFontSize='Size16'
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

  const table = useReactTable({
    data: games,
    columns: gameColumns,
    getCoreRowModel: getCoreRowModel()
  })

  useEffect(() => {
    socket.emit('coinflip_remove', {}, (response: { id: string }) => {
      if (!response.id) {
        return
      }
      if (response.id) {
        const filteredGames = removeGameById(games, response.id)
        setGames(filteredGames)
      }
    })
  }, [])

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
