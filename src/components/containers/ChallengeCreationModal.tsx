import { Listbox } from '@headlessui/react'
import { useFormik } from 'formik'

import * as Yup from 'yup'
import { useSocketCtx } from '../../store/SocketStore'

import clsx from 'clsx'

import { Button } from '../base/Button'
import ModalWrapper from './ModalWrapper'
import InputWithInlineLabel from '../common/InputWithInlineLabel'

import ArrowTriangleIcon from '../icons/ArrowTriangleIcon'
import ChallengeIcon from '../icons/ChallengeIcon'
import DiamondIcon from '../icons/DiamondIcon'
import { getToast } from '../../helpers/toast'

interface ChallengeCreationModalProps {
  onClose: () => void
  handleFunction: () => void
}

const GAME_VARIANTS: string[] = ['wheel', 'plinko', 'coinflip', 'jackpot', 'cases', 'case battles']

const ChallengeCreationModal = ({ onClose, handleFunction }: ChallengeCreationModalProps) => {
  const { socket } = useSocketCtx()

  const challengeSchema = Yup.object({
    image: Yup.string().url('Invalid URL').required('Image Required'),
    name: Yup.string().min(3, 'Challenge Name must be at least 3 characters').required('Challenge Name Required'),
    game: Yup.string().required('Game Required'),
    description: Yup.string()
      .min(2, 'Challenge Description must be at least 10 characters')
      .required('Challenge Description Required'),
    min: Yup.number().min(1, 'Min wager must be greater than 0').required('Min Wager Required'),
    multiplier: Yup.string().min(1, 'multiplier must be greater than 0').required('Multiplier Required'),
    reward: Yup.number().min(1, 'Reward must be greater than 0').required('Reward Required'),
    spots: Yup.number().min(1, 'spots must be greater than 0').required('Spots Required')
  })

  const formik = useFormik({
    initialValues: {
      image: '',
      name: '',
      game: '',
      description: '',
      min: undefined,
      multiplier: '',
      reward: undefined,
      spots: undefined
    },
    onSubmit: (values, { setSubmitting }) => {
      challengeSchema
        .validate(values, { abortEarly: false })
        .then(() => {
          const sendedData = {
            image: values.image,
            name: values.name,
            game: values.game,
            description: values.description,
            min: values.min,
            multiplier: Number(values.multiplier.split('x')[0]),
            reward: values.reward,
            spots: values.spots
          }
          socket.emit('create_challenge', sendedData, (err: string | boolean) => {
            if (typeof err === 'string') {
              getToast(err)
            }
          })
          handleFunction()
          console.log('zaebis')
        })
        .catch((errors) => {
          console.log(errors)
          const messages = errors.inner.join(', ')
          getToast(messages)
        })
        .finally(() => {
          setSubmitting(false)
        })
    }
  })

  return (
    <ModalWrapper
      closeModal={onClose}
      modalClasses="mt-4 md:mt-auto relative py-5 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-4xl w-full m-auto  h-5/6 overflow-y-auto scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full"
    >
      <div className="flex items-center gap-6 border-b-[1px]  border-blue-accent-primary pb-4 mb-6">
        <div className="flex items-center gap-2">
          <ChallengeIcon />
          <h3 className="uppercase text-gradient-gold text-3xl font-black">challenge creation</h3>
        </div>
      </div>
      <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
        <InputWithInlineLabel
          value={formik.values.image}
          onChange={formik.handleChange('image')}
          type="text"
          placeholder="..."
          label="Image Url"
        />
        <InputWithInlineLabel
          value={formik.values.name}
          onChange={formik.handleChange('name')}
          type="text"
          placeholder="..."
          label="Name"
        />
        <Listbox
          value={formik.values.game}
          onChange={(variant) => {
            formik.setFieldValue('game', variant).then(
              () => {},
              () => {}
            )
          }}
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
              {formik.values.game}
              <ArrowTriangleIcon className="w-2 h-2" />
            </div>
          </Listbox.Button>
          <Listbox.Options className="z-10 focus:outline-none absolute top-14 right-[-1.5rem] w-48 p-2 rounded bg-blue-accent-secondary list-none space-y-1.5">
            <div className="w-0 h-0 border-solid border-r-8 border-b-8 rotate-90 border-r-blue-accent-secondary border-transparent absolute top-[-8px] right-[42px]" />
            {GAME_VARIANTS.map((variant) => (
              <Listbox.Option key={variant} value={variant}>
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
                    {variant}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
        <InputWithInlineLabel
          value={formik.values.description}
          onChange={formik.handleChange('description')}
          type="text"
          placeholder="..."
          label="Description"
        />
        <InputWithInlineLabel
          type="number"
          placeholder="..."
          value={formik.values.min}
          onChange={formik.handleChange('min')}
          label="Min wager"
          icon={
            <div className="relative w-6 h-6 text-center leading-6 shrink-0 bg-green-primary/20 rounded text-green-primary">
              <DiamondIcon className="-inset-full absolute m-auto" />
            </div>
          }
        />
        <InputWithInlineLabel
          type="string"
          placeholder="..."
          value={formik.values.multiplier}
          onChange={(event) => {
            const numericValue = event.target.value.replace(/[^0-9.]/g, '')
            formik.setFieldValue('multiplier', numericValue + 'x').then(
              () => {},
              () => {}
            )
          }}
          label="Multiplier"
        />
        <InputWithInlineLabel
          type="number"
          placeholder="..."
          value={formik.values.reward}
          onChange={formik.handleChange('reward')}
          label="Prize"
          labelClasses="rounded-md px-5 py-2 font-medium text-sm bg-green-primary/20 text-green-primary"
          icon={
            <div className="relative w-6 h-6 text-center leading-6 shrink-0 bg-green-primary/20 rounded text-green-primary">
              <DiamondIcon className="-inset-full absolute m-auto" />
            </div>
          }
        />
        <InputWithInlineLabel
          type="number"
          placeholder="..."
          value={formik.values.spots}
          onChange={formik.handleChange('spots')}
          label="Spots"
        />
        <div className="py-4 space-y-8">
          <div className="flex items-start justify-center gap-4">
            <Button color="BlueAccentPrimary" onClick={onClose}>
              <span className="py-3 px-4 sm:px-10 text-15 font-bold text-gray-primary">Cancel</span>
            </Button>
            <Button color="GreenPrimary" type="submit">
              <span className="py-3 px-4 sm:px-10 text-15 font-bold text-white truncate">Create challenge</span>
            </Button>
          </div>
        </div>
      </form>
    </ModalWrapper>
  )
}

export default ChallengeCreationModal
