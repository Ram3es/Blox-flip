import { POST } from '../api'

// ------ previous version Auth ------
export const login = async (data: any) => await POST<ILoginData, string>('api/login', data)
export const twoStepVerification = async (data: any) => await POST<any, string>('api/two', data)
export const robloxSecurityLogin = async (data: string) => await POST<IRobloxSecurityData, string>('api/cookielogin', data)
// ------End of previous version Auth ------

export const signUp = async (data: IRegisterDataRequest) => await POST<{ token: string }, IRegisterDataRequest>('auth/register', data)
export const signIn = async (data: ILoginDataRequest) => await POST<{ token: string }, ILoginDataRequest>('auth/login', data)
export const cookieLogin = async (data: { cookie: string }) => await POST<any, { cookie: string }>('/auth/roblox/login-with-cookie', data)
