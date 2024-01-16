import { toast, TypeOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const getToast = (message: string, type?: TypeOptions): void => {
  toast(message, {
    type,
    className: 'px-4 py-2 bg-blue-accent text-white font-semibold text-base'
  })
}
