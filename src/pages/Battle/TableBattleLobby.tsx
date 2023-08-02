import { FC, useEffect, useMemo, useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table'
import clsx from 'clsx'

import BattleModeCell from '../../components/table/CellFormatters/BattleModeCell'
import ButtonsCell from '../../components/table/CellFormatters/ButtonsCell'
import CasesCell from '../../components/table/CellFormatters/CasesCell'
import RoundCell from '../../components/table/CellFormatters/RoundCell'
import CoinsWithDiamond from '../../components/common/CoinsWithDiamond'
import { IRootBattle, RootBattleStateEnum } from '../../types/CaseBattles'
import { getDisplayedModeByGame } from '../../helpers/caseBattleHelpers'

interface TableBattleLobbyProps {
  data: IRootBattle[]
  sortBy: string
}

const TableBattleLobby: FC<TableBattleLobbyProps> = ({ data, sortBy }) => {
  const [sorting, setSorting] = useState<SortingState>([{ id: sortBy, desc: false }])

  const columnHelper = createColumnHelper<IRootBattle>()
  const columns = [
    columnHelper.accessor((row) => row.caselist, {
      id: 'rounds',
      header: () => 'Rounds',
      cell: ({ row: { original } }) => (
        <RoundCell
          // round={original.caselist.length}
          round={1}
          mode={getDisplayedModeByGame(original)}
          status={original.state}
        />
      ),
      footer: (props) => props.column.id
    }),
    columnHelper.accessor((row) => row.caselist, {
      id: 'cases',
      header: () => 'Cases',
      cell: ({ row: { original } }) => (
        <CasesCell
          status={original.state}
          totalRounds={original.caselist.length}
          // currentRound={original.gameSetting?.currentRound}
          currentRound={1}
        />
      ),
      footer: (props) => props.column.id
    }),
    columnHelper.accessor((row) => row.team, {
      id: 'mode',
      header: () => 'Mode',
      cell: ({ row }) => (
        <BattleModeCell
          game={row.original}
        />
      ),
      footer: (props) => props.column.id
    }),
    columnHelper.accessor((row) => row.cost, {
      id: 'price',
      header: () => 'Price',
      cell: ({ row: { original } }) => <CoinsWithDiamond typographyQuantity={original.cost} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor((row) => row, {
      id: 'date',
      header: () => '',
      cell: () => '',
      enableHiding: true,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor((row) => row, {
      id: 'active',
      header: () => 'Active',
      cell: ({ row: { original } }) => <ButtonsCell game={original} />,
      footer: (props) => props.column.id
    })
  ]

  const memoizedData = useMemo(() => data, [data])

  const table = useReactTable({
    enableHiding: true,
    data: memoizedData,
    columns,
    state: {
      sorting,
      columnVisibility: { date: false }
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  useEffect(() => {
    sortBy && setSorting([{ id: sortBy, desc: true }])
  }, [sortBy])

  return (
    <table className="w-full border-separate border-spacing-y-2">
      <thead className="">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="text-13 uppercase text-gray-primary text-left">
            {headerGroup.headers.map((header, i, a) => {
              return (
                <th key={header.id} className="pb-5">
                  <div className={`${a.length - 1 === i ? 'text-right ' : 'text-left'}`}>
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
          <tr
            key={row.id}
            className={clsx('', {
              'battle_td--radial-green overflow-hidden relative': Boolean(
                row.original.state !== RootBattleStateEnum.done
              ),
              'battle_td--radial-gray overflow-hidden relative': Boolean(
                row.original.state === RootBattleStateEnum.done
              )
            })}
          >
            {row.getVisibleCells().map((cell, i, a) => {
              const isActive = cell.row.original.state === RootBattleStateEnum.playing
              return (
                <td
                  className={clsx('border py-2.5 px-2', {
                    'border-r-0 rounded-l pl-5 pr-3': i === 0,
                    'border-l-0 rounded-r pr-5': i === a.length - 1,
                    'border-l-0 border-r-0 ': i !== 0 && i !== a.length - 1,
                    'relative overflow-hidden': i === 2,
                    'border-green-primary/40': isActive,
                    'border-blue-highlight': !isActive
                  })}
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TableBattleLobby
