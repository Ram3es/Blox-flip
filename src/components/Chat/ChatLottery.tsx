import { Popover } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import { Button } from '../base/Button'
import { DiamondIcon } from '../DiamondIcon/DiamondIcon'
import { ChatLotteryInput } from './ChatLotteryInput'

export const ChatLottery = () => {
  const { t } = useTranslation()
  return (
    <div className='mr-2 rounded border bg-green-primary/15 hover:bg-green-primary/30 cursor-pointer border-green-primary flex grow items-center justify-between p-1.5'>
      <span className='w-5 h-5 shrink-0 text-center leading-6 bg-green-primary/20 rounded relative mr-2 text-green-primary'>
        <DiamondIcon className='-inset-full absolute m-auto' />
      </span>
      <span className='font-bold text-13 mr-2 whitespace-nowrap'>
        25, 500<span className='text-white/50'>.00</span>
      </span>
      <Popover>
        <Popover.Button as={Button} color='GreenPrimary' variant='Gradient'>
          <span className='px-1.5 leading-7 text-11'>{t('chat.tip')}</span>
        </Popover.Button>
        <Popover.Panel>
          <div className='pt-2 5 absolute z-20 left-0 right-0 top-full'>
            <div className='relative p-2 border border-green-primary rounded popup--bg-green popup--corner-tl'>
              <div className='mb-3 text-center'>{t('chat.tipTitle')}</div>
              <ChatLotteryInput />
            </div>
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  )
}
