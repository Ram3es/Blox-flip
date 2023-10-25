import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { useSocketCtx } from './SocketStore'
import { ILiveFeedUser } from '../types/LiveFeed'

interface LiveFeedProviderProps {
  children: ReactNode
}

interface ILiveFeedContext {
  bets: ILiveFeedUser[]
  setBets: Dispatch<SetStateAction<ILiveFeedUser[]>>
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const LiveFeedContext = createContext<ILiveFeedContext>({} as ILiveFeedContext)

export const useLiveFeed = () => {
  return useContext(LiveFeedContext)
}

export const LiveFeedProvider = ({ children }: LiveFeedProviderProps) => {
  const [bets, setBets] = useState<ILiveFeedUser[]>([])

  const { socket } = useSocketCtx()

  useEffect(() => {
    socket.on('bets', (data: ILiveFeedUser[]) => {
      setBets((prev) => [...prev, ...data])
    })

    socket.on('push_bet', (data: ILiveFeedUser) => {
      setBets((prev) => [...prev, data])
    })

    return () => {
      socket.off('push_bet')
      socket.off('bets')
    }
  }, [])

  return (
    <LiveFeedContext.Provider
      value={{
        bets,
        setBets
      }}
    >
      {children}
    </LiveFeedContext.Provider>
  )
}
