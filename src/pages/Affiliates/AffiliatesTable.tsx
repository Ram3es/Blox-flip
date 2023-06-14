import { useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { Table } from '../../components/table/Table'
import { UserInfoCell } from '../../components/table/CellFormatters/UserInfoCell'
import { TimeCell } from '../../components/table/CellFormatters/TimeCell'
import CoinsWithDiamond from '../../components/common/CoinsWithDiamond'
import { IAffilateDeposit } from '../../types/Affilates'

export const AffiliatesTable = ({ data }: { data: IAffilateDeposit[] }) => {
  const [sorting, setSorting] = useState<SortingState>([])

  const columnHelper = createColumnHelper<IAffilateDeposit>()
  const columns: Array<ColumnDef<IAffilateDeposit, any>> = [
    columnHelper.accessor((row: IAffilateDeposit) => row.user, {
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
    columnHelper.accessor((row: IAffilateDeposit) => row.deposited, {
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
      data={data}
      columns={columns}
      sorting={sorting}
      setSorting={setSorting}
      variant='Stats'
    />
  )
}
