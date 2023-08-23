import { useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { Table } from '../../components/table/Table'
import { UserInfoCell } from '../../components/table/CellFormatters/UserInfoCell'
import { TimeCell } from '../../components/table/CellFormatters/TimeCell'
import CoinsWithDiamond from '../../components/common/CoinsWithDiamond'
import { IAffiliateDeposit } from '../../types/Affiliates'

export const AffiliatesTable = ({ users }: { users: IAffiliateDeposit[] }) => {
  const [sorting, setSorting] = useState<SortingState>([])

  const columnHelper = createColumnHelper<IAffiliateDeposit>()
  const columns: Array<ColumnDef<IAffiliateDeposit, any>> = [
    columnHelper.accessor((row: IAffiliateDeposit) => row.user, {
      id: 'user',
      header: () => 'User',
      cell: ({ row }) => <UserInfoCell user={{ ...row.original.user }} />,
      filterFn: 'equalsString',
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('date', {
      id: 'date',
      header: () => 'Date referred',
      cell: (props) => <TimeCell date={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor((row: IAffiliateDeposit) => row.deposited, {
      id: 'deposited',
      header: () => 'Deposited',
      cell: ({ row }) => (
        <CoinsWithDiamond
          iconContainerSize='Small'
          iconClasses='w-3 h-3'
          typographyQuantity={row.original.deposited}
          typographyFontSize='Size13'
        />
      ),
      footer: (props) => props.column.id
    })
  ]

  return (
    <Table
      data={users}
      columns={columns}
      sorting={sorting}
      setSorting={setSorting}
      variant='Stats'
    />
  )
}
