import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import clsx from 'clsx'
import React from 'react'
import RoundCell from './Table/RoundCell'

interface IBattlesInfo {
  round: number
  cases: number
  mode: number
  price: number
  active: string

}

const dataTable = [
  { round: 5, cases: 3, mode: 1, price: 25000, active: 'dcdvvd' },
  { round: 3, cases: 2, mode: 3, price: 25000, active: 'dcdvvd' },
  { round: 6, cases: 4, mode: 2, price: 25000, active: 'dcdvvd' },
  { round: 6, cases: 7, mode: 2, price: 25000, active: 'dcdvvd' }
]

const columnHelper = createColumnHelper<IBattlesInfo>()
const columnsMemo = [
  columnHelper.accessor('round', {
    id: 'rounds',
    header: () => 'Rounds',
    cell: ({ row }) => <RoundCell round={row.original.round} mode={row.original.mode} />,
    footer: (props) => props.column.id
  }),
  columnHelper.accessor('cases', {
    id: 'cases',
    header: () => 'Cases',
    cell: () => '',
    footer: (props) => props.column.id
  }),
  columnHelper.accessor('mode', {
    id: 'mode',
    header: () => 'Mode',
    cell: () => '',
    footer: (props) => props.column.id
  }),
  columnHelper.accessor('price', {
    id: 'price',
    header: () => 'Price',
    cell: () => '',
    footer: (props) => props.column.id
  }),
  columnHelper.accessor('active', {
    id: 'active',
    header: () => 'Active',
    cell: () => '',
    footer: (props) => props.column.id
  })

]

const TableBattleLobby = () => {
  const table = useReactTable({
    enableFilters: true,
    data: dataTable,
    columns: columnsMemo,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <>
    <table className="w-full border-separate border-spacing-y-2">
        <thead className="">
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="text-13 uppercase text-gray-primary text-left">
                {headerGroup.headers.map((header, i, a) => {
                  return (
                        <th key={header.id} className='pb-5'>
                            <div className={`${(a.length - 1) === i ? 'text-right' : 'text-left'}`}>
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
                 className='battle_td--radial-green overflow-hidden relative'
                 >
                {row.getVisibleCells().map((cell, i, a) => (
                    <td
                      className={clsx('border border-blue-highlight py-6 pl-5 pr-5', {
                        'border-r-0 rounded-l': i === 0,
                        'border-l-0 rounded-r': i === (a.length - 1),
                        'border-l-0 border-r-0 ': i !== 0 && i !== (a.length - 1)
                      })}
                      key={cell.id}>
                        <div>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                    </td>
                ))}
               </tr>
            ))}
        </tbody>
    </table>
    </>)
}

export default TableBattleLobby
