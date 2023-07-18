import { ChangeEvent, useCallback, useState } from 'react'

import { Listbox } from '@headlessui/react'

import clsx from 'clsx'

import { Button } from '../base/Button'
import ModalWrapper from './ModalWrapper'
import InputWithInlineLabel from '../common/InputWithInlineLabel'

import ArrowTriangleIcon from '../icons/ArrowTriangleIcon'
import ChallengeIcon from '../icons/ChallengeIcon'
import DiamondIcon from '../icons/DiamondIcon'

interface ChallengeCreationModalProps {
  onClose: () => void
  handleFunction: () => void
}

interface GameVariantInterface {
  gameName: string
}

const gameVariants: GameVariantInterface[] = [
  { gameName: 'champion' },
  { gameName: 'wheel' },
  { gameName: 'plinko' },
  { gameName: 'coinflip' },
  { gameName: 'jackpot' },
  { gameName: 'cases' },
  { gameName: 'case battles' }
]

const ChallengeCreationModal = ({ onClose, handleFunction }: ChallengeCreationModalProps) => {
  const [inputWager, setInputWager] = useState(0)
  const [inputPrize, setInputPrize] = useState(0)
  const [inputMultiplier, setInputMultiplier] = useState('')
  const [selectedGame, setSelectedGame] = useState<GameVariantInterface | null>(gameVariants[0])

  const handleChangeInputWager = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInputWager(Number(event.target.value))
  }, [])

  const handleChangeInputPrize = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInputPrize(Number(event.target.value))
  }, [])

  const handleChangeInputMultiplier = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const numericValue = event.target.value.replace(/[^0-9.]/g, '')
    setInputMultiplier(numericValue + 'x')
  }, [])

  return (
    <ModalWrapper
      closeModal={onClose}
      modalClasses="mt-4 md:mt-auto relative py-5 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-4xl w-full m-auto"
    >
      <div className="flex items-center gap-6 border-b-[1px] border-blue-accent-primary pb-4 mb-6">
        <div className="flex items-center gap-2">
          <ChallengeIcon />
          <h3 className="uppercase text-gradient-gold text-3xl font-black">challenge creation</h3>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <InputWithInlineLabel
          type="number"
          placeholder="..."
          value={inputWager !== 0 ? inputWager : ''}
          onChange={handleChangeInputWager}
          label="Min wager"
          icon={
            <div className="relative w-6 h-6 text-center leading-6 shrink-0 bg-green-primary/20 rounded text-green-primary">
              <DiamondIcon className="-inset-full absolute m-auto" />
            </div>
          }
        />
        <InputWithInlineLabel
          type="text"
          placeholder="..."
          value={inputMultiplier}
          onChange={handleChangeInputMultiplier}
          label="Min multiplier"
        />
        <InputWithInlineLabel
          type="number"
          placeholder="..."
          value={inputPrize !== 0 ? inputPrize : ''}
          onChange={handleChangeInputPrize}
          label="Prize"
          labelClasses="rounded-md px-5 py-2 font-medium text-sm bg-green-primary/20 text-green-primary"
          icon={
            <div className="relative w-6 h-6 text-center leading-6 shrink-0 bg-green-primary/20 rounded text-green-primary">
              <DiamondIcon className="-inset-full absolute m-auto" />
            </div>
          }
        />
        <Listbox
          value={selectedGame}
          onChange={setSelectedGame}
          as="div"
          className="relative pl-4 pr-4 rounded-10 gradient-background--blue__secondary py-4 w-full cursor-text flex items-center justify-between"
        >
          <span className="capitalize rounded-md px-5 py-2 font-medium text-sm gradient--background--blue__third text-gray-primary">
            Game
          </span>
          <Listbox.Button
            as="div"
            className="cursor-pointer text-gray-primary capitalize font-medium text-base flex justify-between items-center pl-10"
          >
            <div className="flex items-center gap-2">
              {selectedGame?.gameName}
              <ArrowTriangleIcon className="w-2 h-2" />
            </div>
          </Listbox.Button>
          <Listbox.Options className="focus:outline-none absolute top-14 right-[-1.5rem] w-48 p-2 rounded bg-blue-accent-secondary list-none space-y-1.5">
            <div className="w-0 h-0 border-solid border-r-8 border-b-8 rotate-90 border-r-blue-accent-secondary border-transparent absolute top-[-8px] right-[42px]" />
            {gameVariants.map((variant) => (
              <Listbox.Option key={variant.gameName} value={variant}>
                {({ selected }) => (
                  <li
                    className={clsx(
                      'capitalize text-15 cursor-pointer py-1.5 px-2.5 rounded font-medium hover:text-white',
                      {
                        'text-white border border-blue-fourth': selected,
                        'text-gray-primary bg-blue-third': !selected
                      }
                    )}
                  >
                    {variant.gameName}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
        <div className="py-4 space-y-8">
          <div className="flex items-start justify-center gap-4">
            <Button color="BlueAccentPrimary" onClick={onClose}>
              <span className="py-3 px-4 sm:px-10 text-15 font-bold text-gray-primary">Cancel</span>
            </Button>
            <Button color="GreenPrimary" onClick={handleFunction}>
              <span className="py-3 px-4 sm:px-10 text-15 font-bold text-white truncate">
                Create challenge
              </span>
            </Button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default ChallengeCreationModal
