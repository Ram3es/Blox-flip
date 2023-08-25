
import { matchPath, useLocation, useMatch } from 'react-router-dom'
import GamesSection from '../../components/home-page/GamesSection'
import { LiveFeed } from '../../components/live-feed/LiveFeed'
import { useAppStore } from '../../store/Store'
import { useEffect } from 'react'

export const Home = () => {
  const { dispatch } = useAppStore()
  const { pathname } = useLocation()

  const pathList = [{ pathPattern: '/r/:code' }, { pathPattern: '/p/:code' }]
  const matchedPath = pathList.find(({ pathPattern }) => matchPath(pathPattern, pathname))
  const pathObj = matchedPath && useMatch(matchedPath.pathPattern)

  useEffect(() => {
    if (pathObj) {
      const type = pathObj.pathname.split('/')[1]
      const code = pathObj?.params
      dispatch({ type: 'REFERAL', payload: { type, ...code } })
    }
  }, [])

  return (
    <div>
      <GamesSection />
      <LiveFeed />
    </div>
  )
}
