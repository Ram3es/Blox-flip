import axios from 'axios'

export const fetchAsset = async (assetIds: string) => {
  try {
    // proxy request
    const { data: { data: assets } } = await axios.get(`/proxy-image?assetIds=${assetIds}&returnPolicy=PlaceHolder&size=110x110&format=Png&isCircular=false`)
    return assets
  } catch (error) {
    console.error('Error fetching asset:', error)
  }
}
