import { POST } from './api'

export const login = async (data: any) => await POST('api/login', data)
