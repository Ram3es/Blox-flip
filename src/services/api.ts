import axios, { AxiosError, AxiosResponse } from 'axios'
import { getToast } from '../helpers/toast'

const BASE_URL = import.meta.env.VITE_AUTH_URL

export const POST = async <T, B = undefined>(
  endPoint: string,
  data?: B
): Promise<AxiosResponse<T>> =>
  await getInstance().post(endPoint, data)

const getInstance = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  instance.interceptors.request.use(
    config => {
      if (config.url === '/auth/roblox/login-with-cookie') {
        const token = localStorage.getItem('token') ?? ''
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    async error => {
      return await Promise.reject(error)
    }
  )
  instance.interceptors.response.use(
    request => request,
    onResponseError
  )

  return instance
}

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  const { message } = error?.response?.data as { message: string }
  getToast(message ?? error.message, 'error')
  return await Promise.reject(error)
}
