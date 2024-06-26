/* eslint-disable @typescript-eslint/indent */
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSocketCtx } from '../../store/SocketStore'
import { useCopyToClipboard } from '../../helpers/hooks/useCopyToClipboard'

import InputWithLabel from '../../components/base/InputWithLabel'
import AddBoxCard from '../../components/common/Cards/AddBoxCard'
import ToggleTabs from '../../components/common/ToggleTabs'
import BattleModal from '../../components/containers/BattleModal'
import PaymentMethodContainer from '../../components/containers/PaymentMethodContainer'
import DaggersGreenGradient from '../../components/icons/DaggersGreenGradient'
import UnboxingIconTitle from '../../components/icons/UnboxingIconTitle'
import VerticalDivider from '../../components/icons/VerticalDivider'
import NavHeader from '../../components/navigate/NavHeader'
import CardWithCounter from '../../components/common/Cards/CardWithCounter'
import CoinsWithDiamond from '../../components/common/CoinsWithDiamond'

import { Button } from '../../components/base/Button'
import { CopyIcon } from '../../components/icons/CopyIcon'

import { getParticipantsByDisplayMode } from '../../helpers/caseBattleHelpers'
import { getToast } from '../../helpers/toast'

import {
  DEFAULT_PLAYERS_VARIANTS,
  GAME_MODE_TABS,
  PLAYERS_VARIANTS_TABS,
  PRIVACY_TABS,
  SHARED_PLAYERS_VARIANTS
} from '../../constants/battle-cases'
import { IRootCaseItemWithAmount } from '../../types/Cases'
import {
  DisplayedBattleModeEnum,
  RootBattleModeEnum,
  IRootMaximumPlayers,
  IRootBattle
} from '../../types/CaseBattles'

enum PolicyEnum {
  'private' = 'private',
  'public' = 'public'
}

interface DisplayBattleConfig {
  gameMode: {
    variant: keyof typeof DisplayedBattleModeEnum
  }
  gameType: {
    variant: keyof typeof RootBattleModeEnum
  }
  policy: {
    variant: PolicyEnum
  }
}

interface BattleConfig {
  team: boolean
  gamemode: keyof typeof RootBattleModeEnum
  participants: IRootMaximumPlayers
  cases: string[]
  private?: 1 | 0
}

const CreateBattle = () => {
  const { socket } = useSocketCtx()
  const [isOpenModal, setOpenModal] = useState(false)
  const [casesBetted, setCasesToBet] = useState<IRootCaseItemWithAmount[]>([])
  const { text: referralLink, handleCopyText: handleReferralLink } = useCopyToClipboard(
    'https://robloxsite.com/i?/h371s9f!39g_123'
  )
  const [displayBattleConfig, setDisplayBattleConfig] = useState<DisplayBattleConfig>({
    gameMode: {
      variant: DisplayedBattleModeEnum['1v1']
    },
    gameType: {
      variant: RootBattleModeEnum.regular
    },
    policy: {
      variant: PolicyEnum.public
    }
  })

  const fieldWithLinkRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const incrementCounter = useCallback(
    (name: string) =>
      setCasesToBet((state) => [
        ...state.map((box) => {
          if (box.name === name) {
            return { ...box, amount: box.amount + 1 }
          }
          return box
        })
      ]),
    [casesBetted]
  )

  const decrementCounter = useCallback(
    (name: string) => {
      const found = casesBetted.find((betted) => betted.name === name)
      if (found?.amount === 1) {
        setCasesToBet((prev) => [...prev.filter((card) => card.name !== found.name)])
      }
      setCasesToBet((state) => [
        ...state.map((box) => {
          if (box.name === name) {
            return { ...box, amount: box.amount - 1 }
          }
          return box
        })
      ])
    },
    [casesBetted]
  )

  const { amountCases, totalCost } = casesBetted.length
    ? casesBetted.reduce(
        (acc, card) => {
          acc.amountCases += card.amount
          acc.totalCost += card.price * card.amount
          return acc
        },
        { amountCases: 0, totalCost: 0 }
      )
    : { amountCases: 0, totalCost: 0 }

  useEffect(() => {
    if (fieldWithLinkRef.current) {
      fieldWithLinkRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      })
    }
  }, [displayBattleConfig])

  const onSubmitModal = useCallback((cards: IRootCaseItemWithAmount[]) => setCasesToBet(cards), [])

  const createGame = () => {
    if (casesBetted.length === 0) {
      getToast('Select minimum 1 case')
      return
    }

    const sendedData: BattleConfig = {
      team: displayBattleConfig.gameMode.variant === DisplayedBattleModeEnum['2v2'],
      gamemode:
        displayBattleConfig.gameType.variant === RootBattleModeEnum.crazy
          ? RootBattleModeEnum.crazy
          : displayBattleConfig.gameType.variant === RootBattleModeEnum.shared
          ? RootBattleModeEnum.shared
          : RootBattleModeEnum.regular,
      participants: getParticipantsByDisplayMode(displayBattleConfig.gameMode.variant),
      cases: casesBetted.flatMap((item) =>
        item.amount > 1 ? Array.from({ length: item.amount }, () => item.short) : item.short
      )
    }

    socket.emit('create_battle', sendedData, (error: string | boolean, battle: IRootBattle) => {
      if (typeof error === 'string') {
        getToast(error)
      }
      if (!error) {
        navigate(`/battle/${battle.id}`)
      }
    })
  }

  return (
    <div className="max-w-1190 w-full mx-auto">
      <NavHeader
        title="Battle Creation"
        renderIcon={() => <DaggersGreenGradient iconClasses="w-[25px] h-[25px] ml-2" />}
      >
        <div>
          <div className="flex flex-wrap items-center ">
            <div className=" flex items-center mb-3 xxs:mb-0">
              <div className="w-4 shrink-0 mr-2.5 text-blue-golf">
                <UnboxingIconTitle iconClasses="w-[17px] h-[17px]" />
              </div>
              <div className="flex text-gray-primary font-semibold shrink-0">
                <div className="text-white text-center w-5 mr-1 ">{amountCases}</div>
                Cases
              </div>
              <div className="w-px shrink-0 mx-4">
                <VerticalDivider />
              </div>
            </div>
            <div className="flex items-center mt-3 xxs:mt-0">
              <span className="text-gray-primary mr-2.5 font-semibold">Total cost</span>
              <CoinsWithDiamond
                containerColor="GreenDarken"
                typographyQuantity={totalCost}
                typographyFontSize="Size16"
              />
              <div className="w-px shrink-0 mx-4">
                <VerticalDivider />
              </div>
            </div>
            <div className="w-full flex justify-end xxs:w-fit mt-3 xxs:mt-0">
              <Button
                onClick={createGame}
                className="bg-green-primary hover:bg-green-500  border border-green-primary py-2 px-7 leading-4 rounded "
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      </NavHeader>
      <PaymentMethodContainer>
        <AddBoxCard openModal={() => setOpenModal(true)} />
        {casesBetted
          .filter((card) => card.amount > 0)
          .map((card) => (
            <CardWithCounter
              key={card.name}
              name={card.name}
              price={card.price}
              count={card.amount}
              increment={() => incrementCounter(card.name)}
              decrement={() => decrementCounter(card.name)}
            />
          ))}
      </PaymentMethodContainer>
      <ToggleTabs
        label={PLAYERS_VARIANTS_TABS.label}
        options={
          displayBattleConfig.gameType.variant === 'shared'
            ? SHARED_PLAYERS_VARIANTS
            : DEFAULT_PLAYERS_VARIANTS
        }
        onSelect={(option) =>
          setDisplayBattleConfig((state) => ({ ...state, [PLAYERS_VARIANTS_TABS.name]: option }))
        }
      />
      <ToggleTabs
        label={GAME_MODE_TABS.label}
        options={GAME_MODE_TABS.tabs}
        onSelect={(option) =>
          setDisplayBattleConfig((state) => ({ ...state, [GAME_MODE_TABS.name]: option }))
        }
      />
      <ToggleTabs
        label={PRIVACY_TABS.label}
        options={PRIVACY_TABS.tabs}
        onSelect={(option) =>
          setDisplayBattleConfig((state) => ({ ...state, [PRIVACY_TABS.name]: option }))
        }
      />
      {displayBattleConfig.policy.variant === PolicyEnum.private && (
        <div ref={fieldWithLinkRef} className="relative px-2 w-full grow shrink-0 mb-4">
          <InputWithLabel
            type="text"
            name="affiliate"
            label="Your referral link"
            labelClasses="flex flex-col w-full mb-4 items-center"
            titleClasses="gradient-blue-secondary text-gray-primary rounded-t-xl py-2 px-5 inline-block"
            inputWrapperClasses="bg-dark/25 rounded-xl overflow-hidden w-full"
            inputClasses="overflow-ellipsis grow w-0 bg-transparent bg-none border-none outline-none shadow-none leading-5 py-4 mr-12 truncate"
            value={referralLink}
            placeholder="..."
            readOnly
          />
          <div className="absolute z-20 top-[60px] right-7">
            <Button className="w-7 shrink-0" onClick={handleReferralLink} type="button">
              <CopyIcon />
            </Button>
          </div>
        </div>
      )}
      {isOpenModal && (
        <BattleModal
          casesBetted={casesBetted}
          onSubmit={onSubmitModal}
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  )
}

export default CreateBattle
