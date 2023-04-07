import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table'
import clsx from 'clsx'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { QuantityCoins } from '../../components/common/QuantityCoins/QuantityCoins'
import { IBattlesInfo } from '../../mocks/battle'
import { GameStatus } from '../../types/enums'

import BattleModeCell from '../../components/table/CellFormatters/BattleModeCell'
import ButtonsCell from '../../components/table/CellFormatters/ButtonsCell'
import CasesCell from '../../components/table/CellFormatters/CasesCell'
import RoundCell from '../../components/table/CellFormatters/RoundCell'

const columnHelper = createColumnHelper<Pick<IBattlesInfo, 'id' | 'status' | 'date' | 'gameSetting' | 'players' >>()
const columnsMemo = [
  columnHelper.accessor(({ gameSetting }) => gameSetting.rounds, {
    id: 'rounds',
    header: () => 'Rounds',
    cell: ({ row: { original } }) => (
      <RoundCell
        round={original.gameSetting.rounds}
        mode={original.gameSetting.mode}
        status={original.status}
      />
    ),
    footer: (props) => props.column.id
  }),
  columnHelper.accessor(({ gameSetting }) => gameSetting.rounds, {
    id: 'cases',
    header: () => 'Cases',
    cell: ({ row: { original } }) => (
      <CasesCell
        status={original.status}
        totalRounds={original.gameSetting.rounds}
        currentRound={original.gameSetting?.currentRound}
      />
    ),
    footer: (props) => props.column.id
  }),
  columnHelper.accessor(({ gameSetting }) => gameSetting.mode, {
    id: 'mode',
    header: () => 'Mode',
    cell: ({ row: { original } }) => (
      <BattleModeCell
        status={original.status}
        mode={original.gameSetting.mode}
        users={original.players}
      />
    ),
    footer: (props) => props.column.id
  }),
  columnHelper.accessor(({ gameSetting }) => gameSetting.price, {
    id: 'price',
    header: () => 'Price',
    cell: ({ row: { original } }) => (
      <QuantityCoins
        quantity={original.gameSetting.price}
        iconHeight='12'
        iconWidth='15'
        iconBgHeight='5'
        iconBgWidth='5'
        textSize='text-sm'
      />
    ),
    footer: (props) => props.column.id
  }),
  columnHelper.accessor('date', {
    id: 'date',
    header: () => '',
    cell: () => '',
    enableHiding: true,
    footer: (props) => props.column.id
  }),
  columnHelper.accessor(({ gameSetting }) => gameSetting, {
    id: 'active',
    header: () => 'Active',
    cell: ({ row: { original } }) => <ButtonsCell id={original.id} status={ original.status} />,
    footer: (props) => props.column.id
  })
]

interface ITableProps {
  data: IBattlesInfo[]
  sortBy: string
}

const TableBattleLobby: FC<ITableProps> = ({ data, sortBy }) => {
  const [sorting, setSorting] = useState<SortingState>([{ id: sortBy, desc: false }])
  const memoizedData = useMemo(() => data, [data])
  const table = useReactTable({
    enableHiding: true,
    data: memoizedData,
    columns: columnsMemo,
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
    <>
      <table className='w-full border-separate border-spacing-y-2'>
        <thead className=''>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className='text-13 uppercase text-gray-primary text-left'>
              {headerGroup.headers.map((header, i, a) => {
                return (
                  <th key={header.id} className='pb-5'>
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
                  row.original.status !== GameStatus.Ended
                ),
                'battle_td--radial-gray overflow-hidden relative': Boolean(
                  row.original.status === GameStatus.Ended
                )
              })}
            >
              {row.getVisibleCells().map((cell, i, a) => {
                const isActive = cell.row.original.status === GameStatus.Running
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
    </>
  )
}

export default TableBattleLobby
