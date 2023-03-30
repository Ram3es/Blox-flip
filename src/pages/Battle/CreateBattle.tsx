import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/base/Button'
import InputWithLabel from '../../components/base/InputWithLabel'
import AddBoxCard from '../../components/common/Cards/AddBoxCard'
import UnboxingWithCounter from '../../components/common/Cards/UnboxingWithCounter'
import { QuantityCoins } from '../../components/common/QuantityCoins/QuantityCoins'
import ToggleTabs from '../../components/common/ToggleTabs'
import BattleModal from '../../components/containers/BattleModal'
import PaymentMethodContainer from '../../components/containers/PaymentMethodContainer'
import { CopyIcon } from '../../components/icons/CopyIcon'
import DaggersGreenGradient from '../../components/icons/DaggersGreenGradient'
import UnboxingIconTitle from '../../components/icons/UnboxingIconTitle'
import VerticalDivider from '../../components/icons/VerticalDivider'
import NavHeader from '../../components/navigate/NavHeader'
import { gameSettings } from '../../constants/battle'
import { IUnboxCardCounter } from '../../types/ItemCard'

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
  const navigate = useNavigate()

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

  const onSubmitModal = useCallback((cards: IUnboxCardCounter[]) => setCasesToBet(cards), [])

  const convertAmountBoxes = (): IUnboxCardCounter[] => {
    let converted = [] as IUnboxCardCounter[]
    casesBetted.forEach(box => {
      const multiplyed: IUnboxCardCounter[] = Array.from(Array(box.amount).fill(box))
      converted = converted.concat(multiplyed)
    })
    return converted
  }

  const createGame = () => {
    console.log({
      ...batlleSettings,
      rounds: amountCases,
      price: totalCost,
      cases: casesBetted
    })

    const responseFromDB = {
      gameSetting: {
        ...batlleSettings,
        rounds: amountCases,
        price: totalCost
      },
      cases: convertAmountBoxes(),
      players: [
        {
          id: new Date().getTime().toString(),
          name: 'Boris Johnson',
          avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe_FBy0_PayvR5hOX1F6i5ItKIblV1_y7HTg&usqp=CAU',
          level: 17,
          dropsCards: [],
          wonDiamonds: 0
        }, ...Array.from(Array(batlleSettings.mode.requiredPlayers - 1))],
      id: '1234567',
      date: '2032-03-12T23:46:58.567Z',
      status: 'created'

    }
    navigate(`/battle/${responseFromDB.id}`, { state: responseFromDB })
  }
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
                        onClick={createGame}
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
          {gameSettings.map(setting => (
            <ToggleTabs
              key={setting.label}
              label={setting.label}
              options={setting.tabs}
              onSelect={(option) => setSetting(state => ({ ...state, [setting.name]: option }))}
              />))}
              {batlleSettings.privacy.variant === 'Private' && (
                  <div ref={fieldWithLinkRef} className='relative px-2 w-full grow shrink-0 mb-4'>
                  <InputWithLabel
                    type='text'
                    name='affiliate'
                    label='Your referral link'
                    labelClasses='flex flex-col w-full mb-4 items-center'
                    titleClasses='gradient-blue-secondary text-gray-primary rounded-t-xl py-2 px-5 inline-block'
                    inputWrapperClasses='bg-dark/25 rounded-xl overflow-hidden w-full'
                    inputClasses='overflow-ellipsis grow w-0 bg-transparent bg-none border-none outline-none shadow-none leading-5 py-4 mr-12 truncate'
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
