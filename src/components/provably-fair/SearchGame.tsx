import InputWithInlineLabel from '../common/InputWithInlineLabel'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSocketCtx } from '../../store/SocketStore'
import { getToast } from '../../helpers/toast'
import { Listbox } from '@headlessui/react'
import ArrowTriangleIcon from '../icons/ArrowTriangleIcon'
import { GAME_VARIANTS } from '../containers/ChallengeCreationModal'
import clsx from 'clsx'
import { Button } from '../base/Button'
import { IGameInfo } from '../../types/History'
import { useState } from 'react'

const MODE_VARIANTS = [...GAME_VARIANTS, 'Random.ORG']

const SearchGame = () => {
  const { socket } = useSocketCtx()
  const [gameInfo, setGameInfo] = useState<IGameInfo | { seed: string | number }>()

  const challengeSchema = Yup.object({
    input: Yup.string().required('Field Required'),
    type: Yup.string().required('Game Required')
  })
  const formik = useFormik({
    initialValues: {
      input: '',
      type: ''
    },
    onSubmit: (values, { setSubmitting }) => {
      challengeSchema
        .validate(values, { abortEarly: false })
        .then(() => {
          socket.emit('provably_fair', values, (err: boolean, gameInfo: IGameInfo | { seed: string | number }) => {
            if (typeof err === 'string') {
              return getToast(err)
            }
            setGameInfo(gameInfo)
          })
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

  const updateSeed = () => {
    socket.emit('regenerate_seed', {}, (res: any) => {
      getToast(res)
    })
  }

  return (
    <div className='w-full max-w-[800px] flex flex-col gap-6  mx-auto mb-6'>
        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-4 items-center' >
            <InputWithInlineLabel
              type="text"
              label='Hash or ID'
              value={formik.values.input}
              onChange={formik.handleChange('input')}
            />
             <Listbox
               value={formik.values.type}
               onChange={(variant: string) => { void formik.setFieldValue('type', variant) }}
               as="div"
               className="relative pl-4 pr-4 rounded-10 gradient-background--blue__secondary py-4 w-full cursor-text flex items-center justify-between"
            >
          <span className="capitalize rounded-md px-5 py-2 font-medium text-sm gradient--background--blue__third text-gray-primary">
            Mode
          </span>
          <Listbox.Button
            as="div"
            className="cursor-pointer text-gray-primary capitalize font-medium text-base flex justify-between items-center pl-10"
          >
            <div className="flex items-center gap-2">
              {formik.values.type}
              <ArrowTriangleIcon className="w-2 h-2" />
            </div>
          </Listbox.Button>
          <Listbox.Options className="z-10 focus:outline-none absolute top-14 right-[-1.5rem] w-48 p-2 rounded bg-blue-accent-secondary list-none space-y-1.5">
            <div className="w-0 h-0 border-solid border-r-8 border-b-8 rotate-90 border-r-blue-accent-secondary border-transparent absolute top-[-8px] right-[42px]" />
            {MODE_VARIANTS.map((variant) => (
              <Listbox.Option key={variant} value={variant}>
                {({ selected }) => (
                  <div
                    className={clsx(
                      'capitalize text-15 cursor-pointer py-1.5 px-2.5 rounded font-medium hover:text-white',
                      {
                        'text-white border border-blue-fourth': selected,
                        'text-gray-primary bg-blue-third': !selected
                      }
                    )}
                  >
                    {variant}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
        <Button
          type='submit'
          className='flex h-10 items-center justify-center min-w-[160px] leading-9 text-sm font-bold rounded bg-green-primary hover:bg-green-highlight px-2.5'
        >
          Search Game
        </Button>
      </form>
      {gameInfo && (
        <div className='flex flex-col gap-2 py-4 px-8 rounded-10 gradient-background--blue__secondary'>
            {Object.entries(gameInfo).map(([key, value]) => (
            <span
              key={key}
              className=' flex gap-2'
            >
              <span className='capitalize'>{key === 'random' ? 'Serial' : key }:</span>
              {key === 'random' && value === -1 ? 'Random.ORG was not used for this Round as it contained no active players. We generated the roll from the Server Seed only.' : value}
            </span>))}
        </div>
      )}
      <div className='flex flex-col'>
        <p className='w-full pb-10 text-lg font-normal leading-5 text-gray-primary'>
        Your Client Seed is used in Plinko and Case Opening. Click this Button to Regenerate it. You can only view your Previous Seed after you Make a new one.
        </p>
        <Button
          className='flex h-10 w-max mx-auto items-center justify-center min-w-[160px] leading-9 text-sm font-bold rounded bg-green-primary hover:bg-green-highlight px-2.5'
          onClick={updateSeed}
        >
          Regenerate Client Seed
        </Button>
      </div>
    </div>
  )
}

export default SearchGame
