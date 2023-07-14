import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const getToast = (message: string): void => {
  toast(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    className: 'px-4 py-2 bg-blue-accent text-white font-semibold text-base'
  })
}
