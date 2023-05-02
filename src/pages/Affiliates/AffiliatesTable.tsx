import { useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { ISecondUser } from '../../types/User'
import { users } from '../../mocks/affiliatesMock'
import { Table } from '../../components/table/Table'
import { UserInfoCell } from '../../components/table/CellFormatters/UserInfoCell'
import { TimeCell } from '../../components/table/CellFormatters/TimeCell'
import DiamondIcon from '../../components/icons/DiamondIcon'
import CoinsTypography from '../../components/common/Coins/CoinsTypography'
import CoinsContainer from '../../components/common/Coins/CoinsContainer'
import IconContainer from '../../components/common/Coins/IconContainer'

export const AffiliatesTable = () => {
  const [data] = useState<ISecondUser[]>([...users.slice(0, 10)])
  const [sorting, setSorting] = useState<SortingState>([])

  const columnHelper = createColumnHelper<ISecondUser>()
  const columns: Array<ColumnDef<ISecondUser, any>> = [
    columnHelper.accessor((row: ISecondUser) => row.username, {
      id: 'username',
      header: () => 'User',
      cell: ({ row }) => <UserInfoCell user={row.original} />,
      filterFn: 'equalsString',
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('date', {
      id: 'date',
      header: () => 'Date referred',
      cell: (props) => <TimeCell date={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor((row: ISecondUser) => row.bet, {
      id: 'bet',
      header: () => 'Wagered',
      cell: ({ row }) => (
        <CoinsContainer color='Transparent'>
          <IconContainer color='GreenPrimary' size='Small'>
            <DiamondIcon />
          </IconContainer>
          <CoinsTypography quantity={row.original.bet} />
        </CoinsContainer>
      ),
      footer: (props) => props.column.id
    }),
    columnHelper.accessor((row: ISecondUser) => row.profit, {
      id: 'profit',
      header: 'Earned',
      cell: ({ row }) => (
        <CoinsContainer color='Transparent'>
          <IconContainer color='GreenPrimary' size='Small'>
            <DiamondIcon />
          </IconContainer>
          <CoinsTypography quantity={row.original.profit} fontColor='Green' />
        </CoinsContainer>
      ),
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
