import React, { useMemo } from 'react'
import DaggersGreenGradient from '../../../components/icons/DaggersGreenGradient'
import DaggersIcons from '../../../components/icons/DaggersIcons'
import GreenLineLeftBattleLeft from '../../../components/icons/GreenLineBattleLeft'
import GreenLineBattleRight from '../../../components/icons/GreenLineBattleRight'
import { IMAGES } from '../../../constants/Images'

const BattleModeCell = ({ mode, isFinished }: { mode: number, isFinished: boolean }) => {
  const getCell = (value: number) => {
    switch (value) {
      case 1:
        return (
          <div className="flex items-center">
            <div className="w-6 shrink-0 mr-4">
                <GreenLineLeftBattleLeft />
            </div>
            <div className=" w-12 h-12 shrink-0 border border-blue-accent rounded-full overflow-hidden radial--blue">
              <img src={IMAGES.avatar} alt="" width="50" height="46" loading="lazy" decoding="async" className="object-cover w-full h-full" />
            </div>
            <div className={`${isFinished ? 'gradient--battle-tr-grayscale' : 'gradient--battle-tr'} w-11 shrink-0 py-2 mx-1 h-fit`}>
              <DaggersGreenGradient iconClasses='w-6 h-6 mx-auto'/>
            </div>
            <div className="w-12 h-12 shrink-0 border border-blue-accent rounded-full overflow-hidden radial--blue">
              <img src={IMAGES.avatar} alt="" width="50" height="46" loading="lazy" decoding="async" className="object-cover w-full h-full" />
            </div>
            <div className="w-6 shrink-0 ml-4">
                <GreenLineBattleRight />
            </div>
          </div>)
      case 2:
        return (
          <div className="flex items-center">
            <div className="w-10 h-10 shrink-0 border border-blue-accent rounded-full overflow-hidden radial--blue">
              <img src={IMAGES.avatar} alt="avatar" width="50" height="46" loading="lazy" decoding="async" className="object-cover w-full h-full"/>
            </div>
            <div className="gradient--battle-tr w-11 shrink-0 py-2 mx-1 h-fit">
              <DaggersGreenGradient iconClasses='w-5 h-[26px] mx-auto'/>
            </div>
            <div className="shrink-0 w-10 h-10 border border-blue-accent rounded-full overflow-hidden radial--blue">
              <img src={IMAGES.avatar} alt="avatar" width="50" height="46" loading="lazy" decoding="async" className="object-cover w-full h-full"/>
            </div>
            <div className="gradient--battle-tr w-11 shrink-0 py-2 mx-1 h-fit">
              <DaggersGreenGradient iconClasses='w-5 h-[26px] mx-auto'/>
            </div>
            <div className="shrink-0 w-10 h-10 border border-blue-accent rounded-full overflow-hidden radial--blue">
              <img src={IMAGES.avatar} alt="avatar" width="50" height="46" loading="lazy" decoding="async" className="object-cover w-full h-full"/>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="flex items-center">
            <div className={`${isFinished ? 'gradient--battle-tr-grayscale' : 'gradient--battle-tr'} w-11 shrink-0 py-2 mx-1 h-fit`}>
              {isFinished
                ? <DaggersIcons iconClasses='w-5 h-[26px] mx-auto text-gray-primary' />
                : <DaggersGreenGradient iconClasses='w-5 h-[26px] mx-auto'/>}
            </div>
            {Array.from(Array(4)).map((_, i) => (
                <div key={i} className="w-8 h-8 shrink-0 border border-blue-accent rounded-full overflow-hidden radial--blue mx-0.5">
                  <img src={IMAGES.avatar} alt="avatar" width="50" height="46" loading="lazy" decoding="async" className="object-cover w-full h-full"/>
                </div>))}
                <div className={`${isFinished ? 'gradient--battle-tr-grayscale' : 'gradient--battle-tr'} w-11 shrink-0 py-2 mx-1 h-fit`}>
                  {isFinished
                    ? <DaggersIcons iconClasses='w-5 h-[26px] mx-auto text-gray-primary' />
                    : <DaggersGreenGradient iconClasses='w-5 h-[26px] mx-auto'/>}
            </div>
          </div>
        )
    }
  }

  const renderCell = useMemo(() => getCell(mode), [mode, isFinished])
  return (
    <div className="flex items-center">
        {renderCell}
    </div>
  )
}

export default BattleModeCell
