import axios, { AxiosResponse } from 'axios'

const BASE_URL = import.meta.env.VITE_AUTH_URL

export const POST = async <T, B = undefined>(
  endPoint: string,
  data?: B
): Promise<AxiosResponse<T>> =>
  await getInstance().post(endPoint, data)

const getInstance = () => {
  const instance = axios.create({
    baseURL: BASE_URL
  })
  return instance
}
