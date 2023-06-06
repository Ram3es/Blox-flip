import { useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { ILeaderbordUser } from '../../types/User'
import { Table } from '../../components/table/Table'
import { UserInfoCell } from '../../components/table/CellFormatters/UserInfoCell'
import { PlaceCell } from '../../components/table/CellFormatters/PlaceCell'
import CoinsWithDiamond from '../../components/common/CoinsWithDiamond'
import { getSortedUsersByField } from '../../helpers/leaderboardHelpers'

export const LeaderboardTable = ({ data }: { data: ILeaderbordUser[] }) => {
  const formatedData = getSortedUsersByField(data, 'level').slice(3)
  const [sorting, setSorting] = useState<SortingState>([])

  const columnHelper = createColumnHelper<ILeaderbordUser>()
  const columns: Array<ColumnDef<ILeaderbordUser, any>> = [
    columnHelper.accessor((row: ILeaderbordUser) => row.id, {
      id: 'place',
      header: () => 'Place',
      cell: ({ row }) => <PlaceCell place={Number(row.index + 4)} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor((row: ILeaderbordUser) => row.name, {
      id: 'username',
      header: () => 'User',
      cell: ({ row }) => <UserInfoCell user={row.original} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor((row: ILeaderbordUser) => row.bet, {
      id: 'bet',
      header: () => 'Wagered',
      cell: ({ row }) => (
        <CoinsWithDiamond
          iconContainerSize='Small'
          typographyQuantity={row.original.bet}
          typographyFontColor='Green'
        />
      ),
      footer: (props) => props.column.id
    }),
    columnHelper.accessor((row: ILeaderbordUser) => row.profit, {
      id: 'profit',
      header: 'Reward',
      cell: ({ row }) => (
        <CoinsWithDiamond
          iconContainerSize='Small'
          typographyQuantity={row.original.profit}
          typographyFontColor='Green'
        />
      ),
      footer: (props) => props.column.id
    })
  ]

  return (
    <Table
      data={formatedData}
      columns={columns}
      sorting={sorting}
      setSorting={setSorting}
      variant='Stats'
    />
  )
}
