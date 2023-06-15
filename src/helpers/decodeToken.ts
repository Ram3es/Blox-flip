import { Buffer } from 'buffer'

export const decodeBase64 = (str: string): string => decodeURIComponent(Buffer.from(str, 'base64').toString())
