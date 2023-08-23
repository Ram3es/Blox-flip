import { useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { Table } from '../../components/table/Table'
import { UserInfoCell } from '../../components/table/CellFormatters/UserInfoCell'
import { PlaceCell } from '../../components/table/CellFormatters/PlaceCell'
import CoinsWithDiamond from '../../components/common/CoinsWithDiamond'
import { getSortedUsersByFieldASC } from '../../helpers/leaderboardHelpers'
import { ILeaderboardUserData } from '../../types/Leaderboard'

export const LeaderboardTable = ({ data }: { data: ILeaderboardUserData[] }) => {
  const formatedData = getSortedUsersByFieldASC(data, 'place').slice(3)
  const [sorting, setSorting] = useState<SortingState>([])

  const columnHelper = createColumnHelper<ILeaderboardUserData>()
  const columns: Array<ColumnDef<ILeaderboardUserData, any>> = [
    columnHelper.accessor((row: ILeaderboardUserData) => row.id, {
      id: 'place',
      header: () => 'Place',
      cell: ({ row }) => <PlaceCell place={Number(row.index + 4)} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor((row: ILeaderboardUserData) => row.name, {
      id: 'username',
      header: () => 'User',
      cell: ({ row }) => <UserInfoCell user={row.original} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor((row: ILeaderboardUserData) => row.wager, {
      id: 'bet',
      header: () => 'Wagered',
      cell: ({ row }) => (
        <CoinsWithDiamond
          iconContainerSize="Small"
          typographyQuantity={row.original.wager}
          typographyFontColor="Green"
        />
      ),
      footer: (props) => props.column.id
    }),
    columnHelper.accessor((row: ILeaderboardUserData) => row.reward, {
      id: 'profit',
      header: 'Reward',
      cell: ({ row }) => (
        <CoinsWithDiamond
          iconContainerSize="Small"
          typographyQuantity={row.original.reward}
          typographyFontColor="Green"
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
      variant="Stats"
    />
  )
}
