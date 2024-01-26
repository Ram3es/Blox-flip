import ModalWrapper from './ModalWrapper'
import InputWithLabel from '../base/InputWithLabel'
import { useFormik } from 'formik'
import { useSocketCtx } from '../../store/SocketStore'
import { getToast } from '../../helpers/toast'
import * as Yup from 'yup'
import { Button } from '../base/Button'

const nameSchema = Yup.object().shape({
  name: Yup.string().min(2).max(30).required('Field mustn`t be empty')
})

const ChangeNameModal = () => {
  const { socket, setIsShownChangeNameModal } = useSocketCtx()
  const handleCloseModal = () => {
    setIsShownChangeNameModal(false)
  }

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    onSubmit: values => {
      void nameSchema
        .validate(values, { abortEarly: false })
        .then(async () => {
          socket.emit('change_name', values, (res: any) => {
            console.log(res)
          })
          handleCloseModal()
        })
        .catch((errors: { inner: Array<{ message: string }> }) => {
          errors?.inner?.forEach((err: { message: string }) => getToast(err.message, 'error'))
        })
    }
  })
  return (
        <ModalWrapper
          closeModal={handleCloseModal}
          modalClasses='max-w-2xl w-full  pt-6 pb-12 px-4 xs:px-6 m-auto shadow-dark-15 rounded-2xl gradient-blue-primary overflow-hidden relative'
          closeBtnClasses='rounded w-7 h-7 leading-7 absolute top-4 left-4 z-[2] text-center bg-blue-highlight shadow-dark-5 hover:bg-blue-accent cursor-pointer'
        >
          <div className="text-center text-2xl px-4 py-4 xxs:text-3xl font-extrabold text-lightblue-secondary uppercase shrink-0 ">
            change user name
          </div>
          <div>
            <InputWithLabel
                type='text'
                name='name'
                label='User name'
                placeholder='...'
                value={formik.values.name}
                onChange={formik.handleChange}
                autoComplete='off'
            />
               <Button
                type='button'
                onClick={() => formik.handleSubmit()}
                className="flex items-center justify-center mx-auto h-10 text-sm font-bold rounded bg-green-primary hover:bg-green-highlight px-8"
              >
                Change Name
              </Button>
          </div>
        </ModalWrapper>
  )
}

export default ChangeNameModal
