import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { ICoinFlip, ICoinFlipList } from '../types/CoinFlip'
import { useSocketCtx } from './SocketStore'

interface CoinFlipProviderProps {
  children: ReactNode
}

export interface ICoinFlipContext {
  games: ICoinFlip[]
  setGames: Dispatch<SetStateAction<ICoinFlip[]>>
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const CoinFlipContext = createContext<ICoinFlipContext>({} as ICoinFlipContext)

export const useCoinFlip = () => {
  return useContext(CoinFlipContext)
}

export const CoinFlipProvider = ({ children }: CoinFlipProviderProps) => {
  const { socket } = useSocketCtx()

  const [games, setGames] = useState<ICoinFlip[]>([])

  const removeGameById = (games: ICoinFlip[], gameId: string): ICoinFlip[] => games.filter((game) => game.id !== gameId)

  useEffect(() => {
    socket.on('coinflip_remove', (id: string) => {
      if (id) {
        const filteredGames = removeGameById(games, id)
        setGames(filteredGames)
      }
    })

    socket.on('coinflip_new', (data: ICoinFlip) => {
      setGames((prev) => [...prev, data])
    })

    socket.on('coinflip_lobbies', (games: ICoinFlipList) => {
      setGames(Object.values(games))
    })

    socket.on('coinflip_update', (joining: ICoinFlip | boolean) => {
      console.log(joining, 'coinflip_update')

      if (typeof joining === 'boolean') {
        console.log('failed COINFLIP_UPDATE')
      } else {
        setGames((prev) => {
          return prev.map((game) => (game.id === joining.id ? joining : game))
        })
      }
    })

    socket.on('coinflip_over', (joining: ICoinFlip | boolean) => {
      if (typeof joining === 'boolean') {
        console.log('failed joining in COINFLIP_OVER')
      } else {
        setGames((prev) => {
          return prev.map((game) => (game.id === joining.id ? joining : game))
        })
      }
    })

    return () => {
      socket.off('coinflip_remove')
      socket.off('coinflip_new')
      socket.off('coinflip_update')
      socket.off('coinflip_over')
    }
  }, [socket])

  return (
    <CoinFlipContext.Provider
      value={{
        games,
        setGames
      }}
    >
      {children}
    </CoinFlipContext.Provider>
  )
}
