import { useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import { BetCell } from '../Table/BetCell'
import { MultiplierCell } from '../Table/MultiplierCell'
import { ProfitCell } from '../Table/ProfitCell'
import { Table } from '../Table/Table'
import { UserInfoCell } from '../Table/UserInfoCell'
import { GameCell } from '../Table/GameCell'
import { TimeCell } from '../Table/TimeCell'

import { users } from './users'

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
  const columnHelper = createColumnHelper<User>()

  const columns = [
    columnHelper.accessor((row) => row, {
      id: 'user',
      header: () => 'Username',
      cell: (props: any) => <UserInfoCell user={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('game', {
      header: () => 'Game',
      cell: (props: any) => <GameCell game={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('date', {
      header: () => 'Time',
      cell: (props: any) => <TimeCell date={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('bet', {
      header: () => 'Bet',
      cell: (props: any) => <BetCell bet={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('rate', {
      header: () => 'Multiplier',
      cell: (props: any) => <MultiplierCell rate={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('profit', {
      header: () => 'Profit',
      cell: (props: any) => <ProfitCell profit={props.getValue()} />,
      footer: (props) => props.column.id
    })
  ]

  const [data, setData] = useState([...users])

  return (
    <div className='bg-blue-primary rounded-2xl px-4 md:px-9 py-5'>
      <div className='flex flex-wrap justify-between border-b-2 border-blue-secondary mb-5 items-center'>
        <div className='text-17 whitespace-nowrap mb-5'>
          <span className='inline-block align-middle outline-green-primary/25 bg-green-primary outline outline-4 rounded-full mr-2.5 h-2 w-2'></span>
          Live feed
        </div>
        <div className='flex flex-wrap -ml-1 -mr-1 pb-4'>
          <a
            href='#'
            className='text-13 py-1.5 leading-2 px-2 w-28 text-center rounded bg-blue-accent mx-1 border border-blue-light text-white mb-1'
          >
            All bets
          </a>
          <a
            href='#'
            className='text-gray-primary text-13 py-1.5 leading-2 px-2 w-28 text-center rounded bg-blue-secondary hover:bg-blue-accent mx-1 border border-blue-secondary mb-1'
          >
            My bets
          </a>
          <a
            href='#'
            className='text-gray-primary text-13 py-1.5 leading-2 px-2 w-28 text-center rounded bg-blue-secondary hover:bg-blue-accent mx-1 border border-blue-secondary mb-1'
          >
            Big bets
          </a>
          <a
            href='#'
            className='text-gray-primary text-13 py-1.5 leading-2 px-2 w-28 text-center rounded bg-blue-secondary hover:bg-blue-accent mx-1 border border-blue-secondary mb-1'
          >
            Lucky bets
          </a>
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
