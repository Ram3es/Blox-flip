import { Popover } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import { Button } from '../base/Button'
import DiamondIcon from '../icons/DiamondIcon'
import { ChatLotteryInput } from './ChatLotteryInput'
import CoinsContainer from '../common/Coins/CoinsContainer'
import IconContainer from '../common/Coins/IconContainer'
import CoinsTypography from '../common/Coins/CoinsTypography'

export const ChatLottery = () => {
  const { t } = useTranslation()
  return (
    <div className='mr-2 rounded border bg-green-primary/15 hover:bg-green-primary/30 cursor-pointer border-green-primary flex grow items-center justify-between p-1.5'>
      <CoinsContainer color='Transparent' size='Small'>
        <IconContainer color='GreenPrimary' size='Small'>
          <DiamondIcon className='w-3 h-3' />
        </IconContainer>
        <CoinsTypography quantity={25500} />
      </CoinsContainer>
      <Popover>
        <Popover.Button as={Button} color='GreenPrimary' variant='GreenGradient'>
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
