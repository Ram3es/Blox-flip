import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from '../../components/base/Button'
import ButtonsToggle from '../../components/base/ButtonToggle'
import DaggersGreenGradient from '../../components/icons/DaggersGreenGradient'
import TableBattleLobby from './TableBattleLobby'
import { useBattleCase } from '../../store/BattleCaseStore'
import { RootBattleStateEnum } from '../../types/CaseBattles'

const GreenLink = ({ to, title, amount }: { to: string, title: string, amount: number }) => (
  <NavLink
    to={to}
    className="relative hover:z-50 rounded text-green-primary border bg-green-primary/15 hover:bg-green-primary/30 border-green-primary whitespace-nowrap px-2 py-1 leading-6 mr-3 cursor-pointer mb-4"
  >
    <span className="text-white mr-1">{amount}</span>
    <span>{title}</span>
  </NavLink>
)

const filterOptions = [{ variant: 'Date' }, { variant: 'Price' }]

const BattleLobby = () => {
  const { games } = useBattleCase()
  const [currentFilterOptions, setOptions] = useState(filterOptions[0])
  const navigate = useNavigate()

  const activeBattle = games.filter((battle) => battle.state === RootBattleStateEnum.playing).length
  const joinableBattle = games.filter((battle) => battle.state === RootBattleStateEnum.open).length

  return (
    <div className="h-full">
      <div className="max-w-1190 w-full m-auto">
        <div className="flex flex-wrap justify-between border-b border-blue-highlight mb-5">
          <div className="flex flex-wrap items-center">
            <div className="w-10 shrink-0 mr-6 mb-4">
              <DaggersGreenGradient />
            </div>
            <GreenLink to={''} title="Active battles" amount={activeBattle} />
            <GreenLink to={''} title="Joinable battles" amount={joinableBattle} />
          </div>
          <div className="flex flex-wrap items-center">
            <div className="flex flex-wrap items-center mb-4 mr-5">
              <span className="shrink-0 text-gray-primary mr-2">Filter by:</span>
              <ButtonsToggle
                options={filterOptions}
                currentSelect={currentFilterOptions}
                peakFunction={setOptions}
              />
            </div>
            <Button
              onClick={() => navigate('/create-battle')}
              className="bg-green-primary hover:bg-green-500  border border-green-primary py-2 px-4 leading-4 rounded mb-4"
            >
              Create Battle
            </Button>
          </div>
        </div>
        <div className="pl-2.5 overflow-auto scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full py-3">
          <TableBattleLobby data={games} sortBy={currentFilterOptions.variant.toLowerCase()} />
        </div>
      </div>
    </div>
  )
}

export default BattleLobby
