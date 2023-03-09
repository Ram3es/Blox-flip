import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table'
import clsx from 'clsx'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { QuantityCoins } from '../../components/common/QuantityCoins/QuantityCoins'
import { IBattlesInfo } from '../../mocks/battle'
import BattleModeCell from './Table/BattleModeCell'
import ButtonsCell from './Table/ButtonsCell'
import CasesCell from './Table/CasesCell'
import RoundCell from './Table/RoundCell'

const columnHelper = createColumnHelper<IBattlesInfo>()
const columnsMemo = [
  columnHelper.accessor('round', {
    id: 'round',
    header: () => 'Rounds',
    cell: ({ row }) => <RoundCell round={row.original.round} mode={row.original.mode} isActive={row.original.active.isRunning} />,
    footer: (props) => props.column.id
  }),
  columnHelper.accessor('cases', {
    id: 'cases',
    header: () => 'Cases',
    cell: ({ row }) => <CasesCell isActive ={row.original.active.isRunning} currentRound={row.original.active?.currentRound} isFinished={row.original.active.finished}/>,
    footer: (props) => props.column.id
  }),
  columnHelper.accessor('mode', {
    id: 'mode',
    header: () => 'Mode',
    cell: ({ row }) => <BattleModeCell mode={row.original.mode} isFinished={row.original.active.finished} />,
    footer: (props) => props.column.id
  }),
  columnHelper.accessor('price', {
    id: 'price',
    header: () => 'Price',
    cell: ({ row }) => <QuantityCoins quantity={row.original.price} iconHeight='12' iconWidth='15' iconBgHeight='5' iconBgWidth='5' textSize='text-sm' />,
    footer: (props) => props.column.id
  }),
  columnHelper.accessor('active', {
    id: 'active',
    header: () => 'Active',
    cell: ({ row }) => <ButtonsCell isActive ={row.original.active.isRunning} isFinished={row.original.active.finished} />,
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
    state: {
      sorting
    },
    data: memoizedData,
    columns: columnsMemo,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  useEffect(() => {
    sortBy && setSorting([{ id: sortBy, desc: false }])
  }, [sortBy])

  return (
    <>
    <table className="w-full border-separate border-spacing-y-2">
        <thead className="">
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="text-13 uppercase text-gray-primary text-left">
                {headerGroup.headers.map((header, i, a) => {
                  return (
                        <th key={header.id} className='pb-5'>
                            <div className={`${(a.length - 1) === i ? 'text-right ' : 'text-left'}`}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </div>
                        </th>)
                })}
            </tr>
            ))}
        </thead>
        <tbody>
            {table.getRowModel().rows.map(row => (
               <tr
                 key={row.id}
                 className={clsx('', {
                   'battle_td--radial-green overflow-hidden relative': !row.original.active.finished,
                   'battle_td--radial-gray overflow-hidden relative': row.original.active.finished
                 })}
                 >
                {row.getVisibleCells().map((cell, i, a) => {
                  const isActive = cell.row.original.active.isRunning
                  return (
                    <td
                      className={clsx('border py-2.5 px-2', {
                        'border-r-0 rounded-l pl-5 pr-3': i === 0,
                        'border-l-0 rounded-r pr-5': i === (a.length - 1),
                        'border-l-0 border-r-0 ': i !== 0 && i !== (a.length - 1),
                        'relative overflow-hidden': i === 2,
                        'border-green-primary/40': isActive,
                        'border-blue-highlight': !isActive
                      })}
                      key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  )
                }
                )}
               </tr>
            )
            )}
        </tbody>
    </table>
    </>)
}

export default TableBattleLobby
