import React, { useState } from 'react'
import ButtonsToggle from '../base/ButtonToggle'

interface IToggleTabsProps<T extends { variant: string }> {
  label?: string
  options: T[]
  onSelect: (option: T) => void
}

const ToggleTabs = <T extends { variant: string }>({
  label,
  options,
  onSelect
}: IToggleTabsProps<T>) => {
  const [currentTab, setCurrentTab] = useState(options[0])

  const onSelectedTab = (option: T) => {
    setCurrentTab(option)
    onSelect(option)
  }
  return (
    <div className='flex flex-wrap justify-between items-center mb-6 border-b border-blue-accent-secondary'>
      <div className='flex flex-col xxs:flex-row items-start xxs:items-center text-17 font-semibold'>
        {label && <span className='shrink-0 mx-2.5'>{label}</span>}
        <div className='flex flex-wrap items-center min-w-full order-3 lg:min-w-0 lg:order-2 text-17 font-semibold'>
          <ButtonsToggle
            options={options}
            currentSelect={currentTab}
            peakFunction={onSelectedTab}
            activeClasses='text-green-primary li--active'
            btnClasses='mx-2.5 flex flex-col justify-center min-h-full py-5 group text-gray-primary hover:text-white '
          />
        </div>
      </div>
    </div>
  )
}

export default ToggleTabs
