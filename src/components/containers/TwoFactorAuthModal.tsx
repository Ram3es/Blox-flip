import { FC, useState } from 'react'
import ModalWrapper from './ModalWrapper'
import InputWithLabel from '../base/InputWithLabel'
import { Button } from '../base/Button'
import { Disclosure } from '@headlessui/react'
import ArrowTriangleIcon from '../icons/ArrowTriangleIcon'
import clsx from 'clsx'
import { useSocketCtx } from '../../store/SocketStore'
import { Form, Formik } from 'formik'
import { getToast } from '../../helpers/toast'
import { defaultPasswordSchema } from '../../helpers/yupSchema'

interface TwoFactorAuthModalProps {
  handleClose: Function
}

const TwoFactorAuthModal: FC<TwoFactorAuthModalProps> = ({ handleClose }) => {
  const [disclosure, setDisclosure] = useState(false)
  const { socket } = useSocketCtx()

  return (
    <ModalWrapper
      closeModal={handleClose}
      modalClasses="relative py-6 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-2xl w-full m-auto overflow-hidden"
    >
      <div className="flex flex-col gap-4 px-4">
        <div className="text-center text-3xl font-extrabold text-lightblue-secondary uppercase shrink-0 px-4 py-4">
          2-Step Verification
        </div>
        <div className="flex flex-col gap-2 text-gray-primary">
          <p>
            {' '}
            To keep our users safe, we only allow people with 2FA Authentication Enabled to Wager.
          </p>

          <p>
            {' '}
            If you already have it enabled, just enter your latest 2FA Key at the time of Trading
            and our System will do the rest.
          </p>

          <p>
            {' '}
            You can also share your 2FA Key with us and we&#39;ll generate all 2FA Codes in the
            future for you.
          </p>
        </div>
        <Formik
          initialValues={{
            code: ''
          }}
          validationSchema={defaultPasswordSchema('code')}
          onSubmit={(values) => {
            socket.emit(
              'save_2fa',
              { code: values.code },
              // eslint-disable-next-line @typescript-eslint/naming-convention
              (err: boolean, success_message: string) => {
                if (err) {
                  getToast('Error occurred')
                }
                if (!err) {
                  getToast(success_message)
                  handleClose()
                }
              }
            )
          }}
        >
          {({ handleChange, values }) => (
            <Form className="space-y-4">
              <InputWithLabel
                type="password"
                label="Code"
                placeholder="Enter code"
                labelClasses="flex flex-col w-full"
                onChange={handleChange('code')}
                value={values.code}
              />
              <Button
                type="submit"
                className="flex items-center justify-center w-[256px] mx-auto h-10 text-sm font-bold rounded bg-green-primary hover:bg-green-highlight px-2.5"
              >
                Verify Key
              </Button>
            </Form>
          )}
        </Formik>
        <Disclosure>
          <Disclosure.Button
            onClick={() => setDisclosure((prev) => !prev)}
            className="pl-4 pr-4 rounded-10 gradient-background--blue__secondary py-4 flex items-center justify-between w-full cursor-pointer relative"
          >
            <div className="flex items-center justify-between w-full">
              <span className="rounded-md px-5 py-2 font-medium text-sm gradient--background--blue__third text-gray-primary">
                How to Enable 2FA / How to Re-Generate 2FA Key
              </span>

              <div className="flex items-center justify-between gap-2 text-gray-primary">
                <ArrowTriangleIcon
                  className={clsx('h-2', {
                    'rotate-180': disclosure
                  })}
                />
              </div>
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className="flex flex-col gap-2 max-h-[200px] text-gray-primary overflow-auto scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full">
            <p>
              <span className="font-bold text-lightblue-secondary">1&#41;</span> Navigate to{' '}
              <span
                onClick={() => {
                  window.open(
                    'https://www.roblox.com/my/account#!/security',
                    '_blank',
                    'noreferrer'
                  )
                }}
                className="text-white cursor-pointer underline"
              >
                https://www.roblox.com/my/account#!/security
              </span>
            </p>
            <p>
              <span className="font-bold text-lightblue-secondary">1.5&#41;</span> If you already
              have an Authenticator set up but you don&#39;t have your 2FA Key, Disable it first and
              then Follow the Next Steps
            </p>
            <p>
              <span className="font-bold text-lightblue-secondary">2&#41;</span> Set up the
              Authenticator, tick the option next to: Authenticator App (Very Secure)
            </p>
            <p>
              <span className="font-bold text-lightblue-secondary">3&#41;</span> Click the Text
              Below the QR Code saying &#39;Click here for manual entry&#39;
            </p>
            <p>
              <span className="font-bold text-lightblue-secondary">4&#41;</span> You will be given a
              2FA Key, Save it and keep it Safe.
            </p>
            <p>
              <span className="font-bold text-lightblue-secondary">5&#41;</span> Set up the 2FA
              Authentication, you can use any 2FA App, we recommend Authy.
            </p>
            <p>
              <span className="font-bold text-lightblue-secondary">6&#41;</span> Once you&#39;ve set
              up 2FA and Saved your 2FA Key, enter it above so you never have to enter your 2FA Code
              on our site again.
            </p>
            <p>
              <span className="font-bold text-lightblue-secondary">7&#41;</span> If you don&#39;t
              want to share your 2FA Key with us, you will have to enter your latest 6 digit 2FA
              Code any time you wish to Deposit or Wager in Skin Games.
            </p>
          </Disclosure.Panel>
        </Disclosure>
      </div>
    </ModalWrapper>
  )
}

export default TwoFactorAuthModal
