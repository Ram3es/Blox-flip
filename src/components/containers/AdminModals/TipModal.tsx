import * as Yup from 'yup'

import ModalWrapper from '../ModalWrapper'
import InputWithInlineLabel from '../../common/InputWithInlineLabel'
import ActionModalHeader from './ActionModalHeader'
import TipIcon from '../../icons/TipIcon'
import { Button } from '../../base/Button'

import type { IChatUser } from '../../../types/User'
import DiamondIcon from '../../icons/DiamondIcon'
import { useFormik } from 'formik'
import { useSocketCtx } from '../../../store/SocketStore'
import { getToast } from '../../../helpers/toast'

interface TipModalProps {
  user: IChatUser
  handleFunction: () => void
}

const TipModal = ({ user, handleFunction }: TipModalProps) => {
  const { socket } = useSocketCtx()

  const verifySchema = Yup.object({
    value: Yup.number().min(1, 'Value must be greater than 0').required('Value Required'),
    verifyValue: Yup.number()
      .min(1, 'Verify value must be greater than 0')
      .required('Verify value Required')
      .test('equal', 'Values must be equal', function (value) {
        return value === this.resolve(Yup.ref('value'))
      })
  })

  const formik = useFormik({
    initialValues: {
      value: undefined,
      verifyValue: undefined
    },
    onSubmit: (values, { setSubmitting }) => {
      verifySchema
        .validate(values, { abortEarly: false })
        .then(() => {
          const sendedData = {
            id: user.id,
            amount: values.value
          }
          socket.emit('tip_user', sendedData, (err: string | boolean) => {
            if (typeof err === 'string') {
              getToast(err)
            }
            if (!err) {
              getToast(`${user.name} tipped`)
            }
          })
          handleFunction()
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
      closeModal={handleFunction}
      modalClasses="relative py-5 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-4xl w-full m-auto overflow-hidden"
    >
      <ActionModalHeader user={user}>
        <div className="text-blue-golf flex items-center gap-2">
          <TipIcon />
          <span className="font-black xxs:text-3xl uppercase hidden sm:block">tip user</span>
        </div>
      </ActionModalHeader>
      <div className="py-4 space-y-8">
        <form className="py-4 space-y-8" onSubmit={formik.handleSubmit}>
          <InputWithInlineLabel
            type="number"
            placeholder="..."
            value={formik.values.value}
            onChange={formik.handleChange('value')}
            label="Tip amount"
            icon={
              <div className="relative w-6 h-6 text-center leading-6 shrink-0 bg-green-primary/20 rounded text-green-primary">
                <DiamondIcon className="-inset-full absolute m-auto" />
              </div>
            }
          />
          <InputWithInlineLabel
            type="number"
            placeholder="..."
            value={formik.values.verifyValue}
            onChange={formik.handleChange('verifyValue')}
            label="Verify amount"
            icon={
              <div className="relative w-6 h-6 text-center leading-6 shrink-0 bg-green-primary/20 rounded text-green-primary">
                <DiamondIcon className="-inset-full absolute m-auto" />
              </div>
            }
          />
          <div className="flex items-start justify-center gap-4">
            <Button type="reset" onClick={() => formik.resetForm()} color="BlueAccentPrimary">
              <span className="py-3 px-8 sm:px-10 text-15 font-bold text-gray-primary">Cancel</span>
            </Button>
            <Button type="submit" color="GreenPrimary">
              <span className="py-3 px-8 sm:px-10 text-15 font-bold text-white">Send tip</span>
            </Button>
          </div>
        </form>
        <div className="rounded-15 gradient-background--blue__secondary py-2 px-10 text-center">
          <p className="font-semibold text-base text-gray-secondary-light">
            Please double check the tip amount before sending the tip.
          </p>
          <p className="font-semibold text-base text-orange-light">
            We are NOT responsible for any miss-clicks or wrong input amounts tipped to other users. You and only you
            are responsible for making a tip.
          </p>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default TipModal
