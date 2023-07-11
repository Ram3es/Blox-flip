import { POST } from '../api'

export const login = async (data: any) => await POST<ILoginData, string>('api/login', data)

export const twoStepVerification = async (data: any) => await POST<any, string>('api/two', data)

export const robloxSecurityLogin = async (data: string) => await POST<IRobloxSecurityData, string>('api/cookielogin', data)
