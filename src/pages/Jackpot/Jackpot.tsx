import { ChangeEvent, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Button } from '../../components/base/Button'
import ItemCard from '../../components/common/Cards/ItemCard'
import GameInfoListItem from '../../components/common/GameInfoListItem'
import StrippedBgItem from '../../components/common/StrippedBgItem'
import VerifyBets from '../../components/common/VerifyBets'
import Image from '../../components/base/Image'
import { cards } from '../../mocks/cards'
import {
  IJackpotCard,
  IRootJackpotAll,
  IRootJackpotWager
} from '../../types/Jackpot'
import JackpotWheel from './JackpotWheel'
import { Context } from '../../store/Store'
import JoinedUserRow from '../../components/common/Cards/JackpotUserCard'
import CoinsWithDiamond from '../../components/common/CoinsWithDiamond'
import { formatNumber, localeStringToNumber } from '../../helpers/numbers'
import { Input } from '../../components/base/Input'
import DiamondIcon from '../../components/icons/DiamondIcon'
import { useSocketCtx } from '../../store/SocketStore'
import { getToast } from '../../helpers/toast'
import { useJackpot } from '../../store/JackpotStore'

const Jackpot = () => {
  const { socket } = useSocketCtx()
  const {
    timer,
    winner,
    gameInfo,
    joinedUsers
  } = useJackpot()

  const [roundInfo, setRoundInfo] = useState<IRootJackpotAll | null>(null)

  const [selectedCards, setSelectedCard] = useState<IJackpotCard[]>([])
  const [wager, setWager] = useState({ amountString: '', amountNumber: 0 })

  const {
    state: { user }
  } = useContext(Context)

  const jackpot = joinedUsers.reduce((acc, user) => +acc + +user.wager, 0)

  const wagerRef = useRef<HTMLInputElement>(null)

  const handleWagerChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      setWager({ amountString: value, amountNumber: Number(localeStringToNumber(value, 'en-US')) })
    },
    [wager]
  )

  const handleKeyPress = (event: KeyboardEvent) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault()
    }
  }

  const inputValue = wager.amountNumber === 0 ? wager.amountString : formatNumber(wager.amountNumber)

  useEffect(() => {
    const wager = wagerRef.current

    if (wager) {
      wager.addEventListener('keypress', handleKeyPress)
    }

    return () => {
      if (wager) {
        wager.removeEventListener('keypress', handleKeyPress)
      }
    }
  }, [wagerRef])

  useEffect(() => {
    setTimeout(() => socket.emit('load_jackpot', { id: 1 }), 10000)
  }, [])

  const handleJoinGame = useCallback(() => {
    const sendedData: IRootJackpotWager = {
      id: 1,
      wager: wager.amountNumber
    }

    socket.emit('jackpot_wager', sendedData, (err: string | boolean) => {
      if (typeof err === 'string') {
        getToast(err)
      }
    })
  }, [wager])

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <div className="w-full flex-col gap-1">
        <VerifyBets path="/provably-fair#jackpot" />
        <div className="flex w-full flex-col-reverse gap-10 ls:flex-row">
          <div className="flex flex-col items-center gap-2 md:flex-row ls:flex-col ls:gap-6">
            <div className="mx-0 flex h-[492px] w-[492px] scale-75 items-center justify-center xs:mx-auto xs:scale-100 md:mx-0">
              <JackpotWheel
                jackPot={jackpot}
                joinedUsers={joinedUsers}
                winner={winner}
              />
            </div>
            <div className="mx-auto flex w-full max-w-[382px] flex-col gap-4">
              <div className="flex justify-between gap-3">
                <GameInfoListItem label="TOTAL PLAYERS">
                  <span>{joinedUsers.length}</span>
                </GameInfoListItem>
                <GameInfoListItem label="WIN CHANCE %">
                  <span className="text-green-primary">
                    {joinedUsers.find((player) => player.user.id === user?.id)?.chance ?? 0} %
                  </span>
                </GameInfoListItem>
                <GameInfoListItem label="YOUR DEPOSIT">
                  <CoinsWithDiamond
                    iconContainerSize="Small"
                    typographyQuantity={joinedUsers.find((player) => player.user.id === user?.id)?.wager ?? 0}
                  />
                </GameInfoListItem>
              </div>
              <div className="w-full border-b border-blue-accent-secondary" />
              <div
                style={{ direction: 'rtl' }}
                className="h-[490px] overflow-auto pl-2.5 scrollbar-thin scrollbar-track-blue-darken/40 scrollbar-thumb-blue-secondary scrollbar-track-rounded-full scrollbar-thumb-rounded-full "
              >
                <div className="h-[480px]" style={{ direction: 'ltr' }}>
                  {selectedCards.map((card, idx) => (
                    <ItemCard
                      key={card.id}
                      id={card.id}
                      name={card.name}
                      price={card.price}
                      image={card.image}
                      color={card.color}
                      userAvatar={card.avatar}
                      itemClasses={`${
                        cards.length - 1 === idx ? 'mb-0' : 'mb-2'
                      } px-1 shrink-0 w-full xs:w-full group/item is-user is-added`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-5">
            <div className="flex w-full flex-wrap items-end gap-3">
              <GameInfoListItem label="MIN. BET">
                <CoinsWithDiamond iconContainerSize="Small" typographyQuantity={1500} />
              </GameInfoListItem>
              <GameInfoListItem label="MAX. BET">
                <CoinsWithDiamond iconContainerSize="Small" typographyQuantity={115500} />
              </GameInfoListItem>
              <GameInfoListItem label="bet amount:" labelStyle="Green" childrenStyle="None">
                <div className="h-[45px] relative z-10 rounded-lg border bg-green-primary/15 border-green-primary/40 border-dashed flex items-center justify-between px-2">
                  <span className="w-5 h-5 text-center leading-6 shrink-0 bg-green-primary/20 rounded relative mr-2 text-green-primary">
                    <DiamondIcon className="-inset-full absolute m-auto" width="15" height="12" />
                  </span>
                  <Input
                    type="text"
                    placeholder="..."
                    variant="OUTLINED"
                    value={inputValue}
                    onChange={handleWagerChange}
                    ref={wagerRef}
                  />
                </div>
              </GameInfoListItem>
              <Button color="GreenPrimary" variant="GreenGradient" onClick={handleJoinGame}>
                <div className="flex h-12 w-[121px] items-center justify-center">Join Game</div>
              </Button>
            </div>
            <div className="w-full border-b border-blue-accent-secondary " />
            <StrippedBgItem color="Blue">
              <div className="flex w-full flex-col items-center">
                <div className="flex items-center">
                  <span className="mr-1 text-base font-bold uppercase text-green-primary">Round starts in</span>
                  {`${timer ?? 0}s`}
                </div>
                <div className="w-full truncate text-center text-gray-primary">{`Hash: ${gameInfo?.hash ?? ''}`}</div>
              </div>
            </StrippedBgItem>
            <div className="h-[310px] z-10 pr-6 scrollbar-thin scrollbar-track-blue-darken/40 scrollbar-thumb-blue-secondary scrollbar-track-rounded-full scrollbar-thumb-rounded-full">
              <div className="flex flex-col gap-y-2 p-0.5 ">
                {joinedUsers.map((player) => (
                  <JoinedUserRow key={player.user.id + Math.random() * 1000} player={player} />
                ))}
              </div>
            </div>
            <div className="w-full border-b border-blue-accent-secondary" />
            {winner && (
              <StrippedBgItem color="Green" wrapContentClasses="py-2 px-6 xs:py-5">
                <div className="flex flex-col items-center justify-between xs:flex-row">
                  <div className="mb-2 flex w-full flex-col items-center gap-1 text-sm xs:mb-0 xs:flex-row">
                    <div className="radial--blue mx-auto my-1 h-11 w-[50px] shrink-0 overflow-hidden rounded border border-blue-highlight xs:mx-0">
                      <Image image={winner.winner.avatar} />
                    </div>
                    <div className="ml-2 flex items-center gap-1">
                      <span className="block max-w-[150px] truncate text-green-primary">{winner.winner.name}</span>
                      <span className="block">has won the jackpot</span>
                    </div>
                  </div>
                  <CoinsWithDiamond containerColor="GreenGradient" containerSize="XL" typographyQuantity={115500} />
                </div>
              </StrippedBgItem>
            )}
            <div className="flex flex-col gap-y-2 p-0.5 opacity-50">
              {joinedUsers.map((player) => (
                <JoinedUserRow key={player.user.id + Math.random() * 1000} player={player} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Jackpot
