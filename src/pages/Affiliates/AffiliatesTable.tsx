import { useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { ISecondUser } from '../../types/User'
import { users } from '../../mocks/affiliatesMock'
import { Table } from '../../components/table/Table'
import { UserInfoCell } from '../../components/table/CellFormatters/UserInfoCell'
import { QuantityCoins } from '../../components/common/QuantityCoins/QuantityCoins'
import { TimeCell } from '../../components/table/CellFormatters/TimeCell'
import QuantityCoinsNewContainer from '../../components/common/QuantityCoinsNew/QuantityCoinsNewContainer'
import DiamondIcon from '../../components/icons/DiamondIcon'
import QuantityCoinsNew from '../../components/common/QuantityCoinsNew/QuantityCoinsNew'
import DiamondContainer from '../../components/common/QuantityCoinsNew/DiamondContainer'

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
        <QuantityCoinsNewContainer color='Transparent'>
          <DiamondContainer color='Green' size='Small'>
            <DiamondIcon />
          </DiamondContainer>
          <QuantityCoinsNew quantity={row.original.bet} />
        </QuantityCoinsNewContainer>
      ),
      footer: (props) => props.column.id
    }),
    columnHelper.accessor((row: ISecondUser) => row.profit, {
      id: 'profit',
      header: 'Earned',
      cell: ({ row }) => (
        <QuantityCoinsNewContainer color='Transparent'>
          <DiamondContainer color='Green' size='Small'>
            <DiamondIcon />
          </DiamondContainer>
          <QuantityCoinsNew quantity={row.original.profit} fontColor='Green' />
        </QuantityCoinsNewContainer>
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
