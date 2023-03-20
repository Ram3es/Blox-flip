import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '../../components/Base/Button'
import InputWithLabel from '../../components/Base/InputWithLabel'
import AddBoxCard from '../../components/common/Cards/AddBoxCard'
import UnboxingWithCounter from '../../components/common/Cards/UnboxingWithCounter'
import { QuantityCoins } from '../../components/Common/QuantityCoins/QuantityCoins'
import ToggleTabs from '../../components/common/ToggleTabs'
import BattleModal from '../../components/Containers/BattleModal'
import PaymentMethodContainer from '../../components/Containers/PaymentMethodContainer'
import { CopyIcon } from '../../components/Icons/CopyIcon'
import DaggersGreenGradient from '../../components/Icons/DaggersGreenGradient'
import UnboxingIconTitle from '../../components/Icons/UnboxingIconTitle'
import VerticalDivider from '../../components/Icons/VerticalDivider'
import NavHeader from '../../components/Navigate/NavHeader'
import { battleSettingVariants } from '../../constants/Battle'
import { IUnboxCardCounter } from '../../types/itemCard'

const battleInitState = {
  rounds: 0,
  price: 0,
  mode: { variant: '1v1', requiredPlayers: 2 },
  privacy: { variant: 'Public' },
  typeGame: { variant: 'Standard' }
}

const CreateBattle = () => {
  const [isOpenModal, setOpenModal] = useState(false)
  const [casesBetted, setCasesToBet] = useState<IUnboxCardCounter[]>([])
  const [referralLink] = useState('https://robloxsite.com/i?/h371s9f!39g_123')
  const [batlleSettings, setSetting] = useState(battleInitState)

  const fieldWithLinkRef = useRef<HTMLDivElement>(null)

  const incrementCounter = useCallback((id: string) => setCasesToBet(state => [...state.map(box => {
    if (box.id === id) {
      return { ...box, amount: box.amount + 1 }
    }
    return box
  })]), [casesBetted])

  const decrementCounter = useCallback((id: string) => setCasesToBet(state => [...state.map(box => {
    if (box.id === id) {
      return { ...box, amount: box.amount - 1 }
    }
    return box
  })]), [casesBetted])

  const { amountCases, totalCost } = casesBetted.length
    ? casesBetted.reduce((acc, card) => {
      acc.amountCases += card.amount
      acc.totalCost += card.price * card.amount
      return acc
    }, { amountCases: 0, totalCost: 0 })
    : { amountCases: 0, totalCost: 0 }

  const onSubmitModal = useCallback((cards: IUnboxCardCounter[]) => setCasesToBet(cards), [])

  const handleReferralLinkCopy = () => {
    navigator.clipboard.writeText(referralLink).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    if (fieldWithLinkRef.current) {
      fieldWithLinkRef.current.scrollIntoView(
        {
          behavior: 'smooth',
          block: 'end'
        })
    }
  }, [batlleSettings])
  return (
        <div className ="max-w-1190 w-full mx-auto">
          <NavHeader
            title='Battle Creation'
            renderIcon={() => <DaggersGreenGradient iconClasses='w-[25px] h-[25px] ml-2' />}
            ><div>
                <div className="flex flex-wrap items-center ">
                  <div className=' flex items-center mb-3 xxs:mb-0'>
                    <div className="w-4 shrink-0 mr-2.5 text-blue-golf">
                      <UnboxingIconTitle iconClasses='w-[17px] h-[17px]' />
                    </div>
                    <div className="flex text-gray-primary font-semibold shrink-0">
                      <div className="text-white text-center w-5 mr-1 ">{amountCases}</div>
                      Cases
                    </div>
                    <div className="w-px shrink-0 mx-4">
                      <VerticalDivider />
                    </div>
                  </div>
                    <div className='flex items-center mt-3 xxs:mt-0'>
                      <span className="text-gray-primary mr-2.5 font-semibold">Total cost</span>
                      <div className="bg-green-primary/15 flex items-center p-1.5 pr-4 rounded">
                        <QuantityCoins quantity={totalCost} />
                      </div>
                      <div className="w-px shrink-0 mx-4">
                        <VerticalDivider />
                      </div>
                    </div>
                    <div className=' w-full flex justify-end xxs:w-fit mt-3 xxs:mt-0 '>
                      <Button
                        onClick={() => []}
                        className="bg-green-primary hover:bg-green-500  border border-green-primary py-2 px-7 leading-4 rounded "
                        >Create
                      </Button>
                    </div>
                </div>
              </div>
          </NavHeader>
          <PaymentMethodContainer>
            <AddBoxCard openModal={() => setOpenModal(true)} />
            {casesBetted.map((card) => (
              <UnboxingWithCounter
                key={card.id}
                id={card.id}
                name={card.name}
                price={card.price}
                count={card.amount}
                increment={() => incrementCounter(card.id) }
                decrement={() => decrementCounter(card.id)} />
            )) }
          </PaymentMethodContainer>
          {battleSettingVariants.map(variant => (
            <ToggleTabs
              key={variant.label}
              label={variant.label}
              options={variant.tabs}
              onSelect={(option) => setSetting(state => ({ ...state, [variant.name]: option }))}
              />))}
              {batlleSettings.privacy.variant === 'Private' && (
                  <div ref={fieldWithLinkRef} className='relative px-2 w-full xs:w-1/2 md:w-auto grow shrink-0 mb-4'>
                  <InputWithLabel
                    type='text'
                    name='affiliate'
                    label='Your referral link'
                    labelClasses='flex flex-col w-full mb-4 items-center'
                    titleClasses='gradient-blue-secondary text-gray-primary rounded-t-xl py-2 px-5 inline-block'
                    inputWrapperClasses='bg-dark/25 rounded-xl overflow-hidden w-full'
                    inputClasses='overflow-ellipsis grow w-0 mr-2 bg-transparent bg-none border-none outline-none shadow-none leading-5 py-4 mr-12 truncate'
                    value={referralLink}
                    placeholder='...'
                    readOnly
                  />
                  <div className='absolute z-20 top-[60px] right-7'>
                    <Button className='w-7 shrink-0' onClick={handleReferralLinkCopy} type='button'>
                      <CopyIcon />
                    </Button>
                  </div>
                </div>
              )}
          <BattleModal
            isOpen={isOpenModal}
            onSubmit={onSubmitModal}
            onClose={() => setOpenModal(false)}
             />
        </div>
  )
}

export default CreateBattle
