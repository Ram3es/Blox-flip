import { IRobloxCard } from '../../types/ItemCard'
import { GET, POST } from '../api'

export const getDepositInventory = async () => await GET<{ inventory: IRobloxCard[] }>('/trading/roblox/deposit/inventory')
export const depositByRobloxInventory = async (assetIds: number[]) => await POST('/trading/roblox/deposit', { assetIds })
