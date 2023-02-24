import { useEffect, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { RadioGroup } from '@headlessui/react'
import clsx from 'clsx'

import { MultiplierCell } from '../Table/MultiplierCell'
import { Table } from '../Table/Table'
import { UserInfoCell } from '../Table/UserInfoCell'
import { GameCell } from '../Table/GameCell'
import { TimeCell } from '../Table/TimeCell'

import { users } from './users'
import { ISecondUser } from '../../types/User'
import { QuantityCoins } from '../common/QuantityCoins/QuantityCoins'

const filtersVariants = {
  'all bets': '/',
  'my bets': '/username',
  'big bets': '/gte=5000',
  'lucky bets': '/bets=lucky'
}

export const LiveFeed = () => {
  const [data, setData] = useState([...users])
  const [filter, setFilter] = useState(Object.keys(filtersVariants)[0])
  const [sorting, setSorting] = useState<SortingState>([])

  useEffect(() => {
    console.log(filter, '<<< Current filter')
    setData([...users])
  }, [filter])

  const columnHelper = createColumnHelper<ISecondUser>()
  const columns: Array<ColumnDef<ISecondUser, any>> = [
    columnHelper.accessor((row: ISecondUser) => row, {
      id: 'username',
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
      cell: (props) => <QuantityCoins quantity={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('rate', {
      header: () => 'Multiplier',
      cell: (props) => <MultiplierCell multiplier={props.getValue()} />,
      footer: (props) => props.column.id
    }),
    columnHelper.accessor('profit', {
      header: () => 'Profit',
      cell: (props: any) => <QuantityCoins quantity={props.getValue()} isActive={true} />,
      footer: (props) => props.column.id
    })
  ]

  return (
    <div className='bg-blue-primary rounded-2xl px-4 md:px-9 py-5'>
      <div className='flex flex-wrap justify-between border-b-2 border-blue-secondary mb-5 items-center'>
        <div className='text-17 whitespace-nowrap mb-5'>
          <span className='inline-block align-middle outline-green-primary/25 bg-green-primary outline outline-4 rounded-full mr-2.5 h-2 w-2'></span>
          Live feed
        </div>
        <RadioGroup value={filter} onChange={setFilter}>
          <div className='flex flex-wrap -ml-1 -mr-1 pb-4'>
            {Object.keys(filtersVariants).map((item) => (
              <RadioGroup.Option value={item} key={item}>
                {({ checked }) => (
                  <button
                    className={clsx(
                      'capitalize text-13 py-1.5 leading-2 px-2 w-28 text-center rounded mx-1 border',
                      {
                        'bg-blue-accent border-blue-light text-white mb-1': checked,
                        'text-gray-primary  bg-blue-secondary hover:bg-blue-accent border-blue-secondary mb-1':
                          !checked
                      }
                    )}
                  >
                    {item}
                  </button>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      <Table
        {...{
          data,
          columns,
          sorting,
          setSorting
        }}
      />
    </div>
  )
}
