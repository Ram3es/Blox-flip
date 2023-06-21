import { Buffer } from 'buffer'

export const decodeBase64 = (str: string): string => decodeURIComponent(Buffer.from(str, 'base64').toString())
export const encodeBase64 = (str: string): string => Buffer.from(str, 'utf8').toString('base64')
