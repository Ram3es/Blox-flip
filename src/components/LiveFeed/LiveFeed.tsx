import { ReactNode, useMemo, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

import { BetCell } from '../Table/BetCell'
import { MultiplierCell } from '../Table/MultiplierCell'
import { ProfitCell } from '../Table/ProfitCell'
import { Table } from '../Table/Table'
import { UserInfoCell } from '../Table/UserInfoCell'
import { GameCell } from '../Table/GameCell'
import { TimeCell } from '../Table/TimeCell'

import { users } from './users'

const FilterButton = ({
  children,
  isActive = false
}: {
  children?: ReactNode
  isActive?: boolean
}) => {
  return (
    <button
      className={
        isActive
          ? 'text-13 py-1.5 leading-2 px-2 w-28 text-center rounded bg-blue-accent mx-1 border border-blue-light text-white mb-1'
          : 'text-gray-primary text-13 py-1.5 leading-2 px-2 w-28 text-center rounded bg-blue-secondary hover:bg-blue-accent mx-1 border border-blue-secondary mb-1'
      }
    >
      {children}
    </button>
  )
}

export interface User {
  game: string
  date: string
  bet: number
  rate: number
  profit: number
  username: string
  avatar: string
  level: number
  id: string
}

export const LiveFeed = () => {
  const [data, setData] = useState([...users])
  const [filter, setFilter] = useState()
  
  const columnHelper = createColumnHelper<User>()
  const columns = useMemo<Array<ColumnDef<User, any>>>(
    () => [
      columnHelper.accessor((row: User) => row, {
        id: 'user',
        header: () => 'Username',
        cell: (props) => <UserInfoCell user={props.getValue()} />,
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('game', {
        header: () => 'Game',
        cell: (props) => <GameCell game={props.getValue()} />,
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('date', {
        header: () => 'Time',
        cell: (props) => <TimeCell date={props.getValue()} />,
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('bet', {
        header: () => 'Bet',
        cell: (props) => <BetCell bet={props.getValue()} />,
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('rate', {
        header: () => 'Multiplier',
        cell: (props) => <MultiplierCell rate={props.getValue()} />,
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('profit', {
        header: () => 'Profit',
        cell: (props: any) => <ProfitCell profit={props.getValue()} />,
        footer: (props) => props.column.id
      })
    ],
    []
  )

  return (
    <div className='bg-blue-primary rounded-2xl px-4 md:px-9 py-5'>
      <div className='flex flex-wrap justify-between border-b-2 border-blue-secondary mb-5 items-center'>
        <div className='text-17 whitespace-nowrap mb-5'>
          <span className='inline-block align-middle outline-green-primary/25 bg-green-primary outline outline-4 rounded-full mr-2.5 h-2 w-2'></span>
          Live feed
        </div>
        <div className='flex flex-wrap -ml-1 -mr-1 pb-4'>
          <FilterButton isActive={true}>All bets</FilterButton>
          <FilterButton>My bets</FilterButton>
          <FilterButton>Big bets</FilterButton>
          <FilterButton>Lucky bets</FilterButton>
        </div>
      </div>
      <Table
        {...{
          data,
          columns
        }}
      />
    </div>
  )
}
