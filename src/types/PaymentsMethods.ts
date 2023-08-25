export interface IPaymentMethods {
  roblox: { name: string, methods: IMethodLabel[] }
  crypto: { name: string, methods: IMethodLabel[] }
  fiat: { name: string, methods: IMethodLabel[] }
  gift: { name: string, methods: IMethodLabel[] }
  survey: { name: string, methods: IMethodLabel[] }
}

export interface IMethodLabel {
  path: string
  title: string
  image: string
  smallSize?: { width: string, height: string }
  type?: string
  shortName?: string
}

export interface ICryptoData {
  address: string
  rate: number
}
