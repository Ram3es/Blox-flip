import { useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef, SortingState } from '@tanstack/react-table'

import { ISecondUser } from '../../types/User'
import { users } from './mock'

import { Table } from '../../components/Table/Table'
import { UserInfoCell } from '../../components/Table/UserInfoCell'
import { QuantityCoins } from '../../components/common/QuantityCoins/QuantityCoins'
import { PlaceCell } from '../../components/Table/PlaceCell'

export const LeaderboardTable = () => {
  const [data] = useState<ISecondUser[]>([...users])
  const [sorting, setSorting] = useState<SortingState>([])

  const columnHelper = createColumnHelper<ISecondUser>()
  const columns: Array<ColumnDef<ISecondUser, any>> = [
    columnHelper.accessor((row: ISecondUser) => row.id, {
      id: 'place',
      header: () => 'Place',
      cell: ({ row }) => <PlaceCell place={Number(row.original.id)} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor((row: ISecondUser) => row.username, {
      id: 'username',
      header: () => 'User',
      cell: ({ row }) => <UserInfoCell user={row.original} />,
      filterFn: 'equalsString',
      footer: (props) => props.column.id
    }),
    columnHelper.accessor((row: ISecondUser) => row.bet, {
      id: 'bet',
      header: () => 'Wagered',
      cell: ({ row }) => <QuantityCoins quantity={row.original.bet} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor((row: ISecondUser) => row.profit, {
      id: 'profit',
      header: 'Reward',
      cell: ({ row }) => <QuantityCoins quantity={row.original.profit} color='green' />,
      footer: (props) => props.column.id
    })
  ]

  return (
    <Table
      data={data}
      columns={columns}
      sorting={sorting}
      setSorting={setSorting}
      variant='Stats'
    />
  )
}
