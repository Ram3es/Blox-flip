import { FC, useState } from 'react'
import { Listbox } from '@headlessui/react'

import { ArrowGrayIcon } from '../ArrowGrayIcon/ArrowGrayIcon'

import EnglandIcon from '../../assets/img/flag_en.svg'
import SpainIcon from '../../assets/img/flag_spain.svg'
import TurkishIcon from '../../assets/img/flag_turkish.svg'

interface countryItem {
  name: string
  icon: string
  usersOnline: number
}

const languageVariants: countryItem[] = [
  { name: 'England', icon: EnglandIcon, usersOnline: 11 },
  { name: 'Spanish', icon: SpainIcon, usersOnline: 17 },
  { name: 'Turkish', icon: TurkishIcon, usersOnline: 31 }
]

interface ButtonChangeLangProps {
  icon: string
}

const ButtonChangeLang: FC<ButtonChangeLangProps> = ({ icon = EnglandIcon }) => {
  return (
    <>
      <span className='w-7 shrink-0 rounded-sm overflow-hidden mr-2'>
        <img
          src={icon}
          alt=''
          width='27'
          height='22'
          loading='lazy'
          decoding='async'
          className='object-cover w-full h-full'
        />
      </span>
      <ArrowGrayIcon size='SMALL' />
    </>
  )
}

export const ChatChangeLang: FC = () => {
  const [selectedChatLanguage, setSelectedChatLanguage] = useState(languageVariants[0])

  return (
    <div className='bg-blue-secondary p-2 rounded flex items-center flex-nowrap'>
      <Listbox value={selectedChatLanguage} onChange={setSelectedChatLanguage}>
        <Listbox.Button className='items-center flex'>
          <ButtonChangeLang icon={selectedChatLanguage.icon} />
        </Listbox.Button>
        <Listbox.Options>
          <div className='absolute left-0 right-0 top-full pt-2.5'>
            <div className='relative p-2 border border-blue-highlight rounded rounded-tr-none bg-blue-secondary popup--corner-tr'>
              {languageVariants.map((item) => (
                <Listbox.Option
                  className='flex py-1.5 px-2 leading-2 rounded bg-blue-highlight hover:bg-blue-accent hover:text-white mb-1.5 border border-blue-accent'
                  as='span'
                  key={item.name.toLocaleLowerCase()}
                  value={item}
                >
                  <span className='w-6 shrink-0 rounded-sm overflow-hidden mr-2'>
                    <img
                      src={item.icon}
                      alt=''
                      width='24'
                      height='18'
                      loading='lazy'
                      decoding='async'
                      className='rounded'
                    />
                  </span>
                  <div className='text-13'>
                    {item.name.toUpperCase()}{' '}
                    <span className='text-gray-primary'>({item.usersOnline})</span>
                  </div>
                </Listbox.Option>
              ))}
            </div>
          </div>
        </Listbox.Options>
      </Listbox>
    </div>
  )
}
