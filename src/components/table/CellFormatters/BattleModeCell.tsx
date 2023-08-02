/* eslint-disable multiline-ternary */
import React, { useMemo } from 'react'
import DaggersGreenGradient from '../../icons/DaggersGreenGradient'
import DaggersIcons from '../../icons/DaggersIcons'
import GreenLineLeftBattleLeft from '../../icons/GreenLineBattleLeft'
import GreenLineBattleRight from '../../icons/GreenLineBattleRight'
import Image from '../../base/Image'
import question from '../../../assets/img/question-mark-circle-1.svg'
import YellowLine from '../../icons/YellowLine'
import BlueLine from '../../icons/BlueLine'
import { IRootBattle, RootBattleStateEnum } from '../../../types/CaseBattles'
import { getDisplayedModeByGame } from '../../../helpers/caseBattleHelpers'

const BattleModeCell = ({ game }: { game: IRootBattle }) => {
  const isFinished = game.state === RootBattleStateEnum.done
  console.log(game, 'players[0]')
  const getCell = (game: IRootBattle) => {
    switch (getDisplayedModeByGame(game)) {
      case '1v1':
        return (
          <div className="flex items-center">
            <div className="w-6 shrink-0 mr-4">
              <GreenLineLeftBattleLeft className={isFinished ? 'grayscale ' : ''} />
            </div>
            <div className=" w-12 h-12 shrink-0 border border-blue-accent rounded-full overflow-hidden radial--blue">
              <Image image={game.players[0]?.avatar ?? question} />
            </div>
            <div
              className={`${
                isFinished ? 'gradient--battle-tr-grayscale' : 'gradient--battle-tr'
              } w-11 shrink-0 py-2 mx-1 h-fit`}
            >
              {isFinished ? (
                <DaggersIcons iconClasses="w-6 h-6 mx-auto text-gray-primary" />
              ) : (
                <DaggersGreenGradient iconClasses=" w-6 h-6 mx-auto" />
              )}
            </div>
            <div className="w-12 h-12 shrink-0 border border-blue-accent rounded-full overflow-hidden radial--blue">
              <Image image={game.players?.[1]?.avatar ?? question} />
            </div>
            <div className="w-6 shrink-0 ml-4">
              <GreenLineBattleRight className={isFinished ? 'grayscale ' : ''} />
            </div>
          </div>
        )
      case '1v1v1':
        return (
          <div className="flex items-center">
            {Array.from(Array(game.max)).map((_, i) => (
              <React.Fragment key={i}>
                <div className="w-10 h-10 shrink-0 border border-blue-accent rounded-full overflow-hidden radial--blue">
                  <Image image={game.players?.[i]?.avatar ?? question} />
                </div>
                {i === game.max - 1 ? null : (
                  <div
                    className={`${
                      isFinished ? 'gradient--battle-tr-grayscale' : 'gradient--battle-tr'
                    } w-11 shrink-0 py-2 mx-1 h-fit`}
                  >
                    {isFinished ? (
                      <DaggersIcons iconClasses="w-5 h-[26px] mx-auto text-gray-primary" />
                    ) : (
                      <DaggersGreenGradient iconClasses="w-5 h-[26px] mx-auto" />
                    )}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )
      case 'group':
        return (
          <div className="flex items-center">
            <div
              className={`${
                isFinished ? 'gradient--battle-tr-grayscale' : 'gradient--battle-tr'
              } w-11 shrink-0 py-2 mx-1 h-fit`}
            >
              {isFinished ? (
                <DaggersIcons iconClasses="w-5 h-[26px] mx-auto text-gray-primary" />
              ) : (
                <DaggersGreenGradient iconClasses="w-5 h-[26px] mx-auto" />
              )}
            </div>
            {Array.from(Array(game.max)).map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 shrink-0 border border-blue-accent rounded-full overflow-hidden radial--blue mx-0.5"
              >
                <Image image={game.players?.[i]?.avatar ?? question} />
              </div>
            ))}
            <div
              className={`${
                isFinished ? 'gradient--battle-tr-grayscale' : 'gradient--battle-tr'
              } w-11 shrink-0 py-2 mx-1 h-fit`}
            >
              {isFinished ? (
                <DaggersIcons iconClasses="w-5 h-[26px] mx-auto text-gray-primary" />
              ) : (
                <DaggersGreenGradient iconClasses="w-5 h-[26px] mx-auto" />
              )}
            </div>
          </div>
        )
      case '1v1v1v1':
        return (
          <div className="flex items-center">
            {Array.from(Array(game.max)).map((_, i) => (
              <React.Fragment key={i}>
                <div className="w-8 h-8 shrink-0 border border-blue-accent rounded-full overflow-hidden radial--blue">
                  <Image image={game.players?.[i]?.avatar ?? question} />
                </div>
                {i === game.max - 1 ? null : (
                  <div
                    className={`${
                      isFinished ? 'gradient--battle-tr-grayscale' : 'gradient--battle-tr'
                    } w-8 shrink-0 py-2 mx-1 h-fit`}
                  >
                    {isFinished ? (
                      <DaggersIcons iconClasses="w-4 h-[20px] mx-auto text-gray-primary" />
                    ) : (
                      <DaggersGreenGradient iconClasses="w-4 h-[20px] mx-auto" />
                    )}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )
      case '2v2':
        return (
          <>
            <div className="flex flex-col items-end">
              <div className="mb-3 mr-3 w-8 h-8 shrink-0 border border-[#ffb84d] rounded-full overflow-hidden radial--blue">
                <Image image={game.players?.[0]?.avatar ?? question} />
              </div>
              <YellowLine className={isFinished ? 'grayscale ' : ''} />
              <div className="mt-3 mr-3 w-8 h-8 shrink-0 border border-[#ffb84d] rounded-full overflow-hidden radial--blue">
                <Image image={game.players?.[1]?.avatar ?? question} />
              </div>
            </div>
            <div
              className={`${
                isFinished ? 'gradient--battle-tr-grayscale' : 'gradient--battle-tr'
              } w-11 shrink-0 py-2 mx-1 h-fit`}
            >
              {isFinished ? (
                <DaggersIcons iconClasses="w-6 h-6 mx-auto text-gray-primary" />
              ) : (
                <DaggersGreenGradient iconClasses="w-6 h-6 mx-auto" />
              )}
            </div>
            <div className="flex flex-col items-start">
              <div className="mb-3 ml-3 w-8 h-8 shrink-0 border border-[#6389ff] rounded-full overflow-hidden radial--blue">
                <Image image={game.players?.[2]?.avatar ?? question} />
              </div>
              <BlueLine className={isFinished ? 'grayscale ' : ''} />
              <div className="mt-3 ml-3 w-8 h-8 shrink-0 border border-[#6389ff] rounded-full overflow-hidden radial--blue">
                <Image image={game.players?.[3]?.avatar ?? question} />
              </div>
            </div>
          </>
        )
    }
  }

  const renderCell = useMemo(() => getCell(game), [game])
  return <div className="flex items-center">{renderCell}</div>
}

export default BattleModeCell
