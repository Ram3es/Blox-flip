import React, { useMemo } from 'react'
import { Button } from '../../../components/base/Button'
import DaggersIcons from '../../../components/icons/DaggersIcons'
import PreviewIcon from '../../../components/icons/PreviewIcon'
import SelectedIcon from '../../../components/icons/SelectedIcon'
import Spiner from '../../../components/icons/Spiner'
import { GameStatus } from '../../../types/enums'

const ButtonsCell = ({ status }: { status: string }) => {
  const activeButton = useMemo(() => {
    switch (status) {
      case GameStatus.Created:
        return (
          <Button
                onClick={() => { console.log('JOIN Battle') }}
                className='grow rounded px-3 py-2 leading-6 flex items-center justify-center bg-green-primary hover:bg-green-500 whitespace-nowrap'
              >
                  <DaggersIcons/>
                  <span className='ml-2'>Join Battle</span>
              </Button>
        )
      case GameStatus.Running:
        return (
          <Button
            onClick={() => { console.log('Stats') }}
            className='grow rounded px-4 py-2 leading-6 flex items-center justify-center bg-green-primary/30 border border-green-primary text-green-primary whitespace-nowrap'
              >
               <Spiner />
              <span className='ml-2'>Running</span>
              </Button>
        )
      case GameStatus.Ended:
        return (
          <Button
              onClick={() => { console.log('Stats') }}
              className='rounded px-3 py-2 leading-6 flex items-center justify-center border border-gray-secondary-darken bg-blue-highlight whitespace-nowrap text-gray-primary'
            >
                <SelectedIcon iconClasses='text-gray-primary'/>
                <span className='ml-2'>Ended</span>
            </Button>
        )
    }
  }, [status])

  return (
        <div className='flex items-center justify-end'>
            {activeButton}
            <Button className=' leading-10 ml-2 w-8 h-8 hidden xxs:flex xs:h-10 xs:w-10 shrink-0 rounded bg-blue-accent-secondary hover:bg-blue-accent text-gray-primary'>
                <PreviewIcon iconClasses='mx-auto my-auto' />
            </Button>
        </div>
  )
}

export default ButtonsCell
