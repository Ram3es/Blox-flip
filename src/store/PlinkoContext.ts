import { createContext, ReactNode, useContext, useState } from 'react'
import { PlinkoContext as PlinkoContextInterface } from '../types/Plinko'

interface PlinkoProviderProps {
  children: ReactNode
}

const initialState: PlinkoContextInterface = {
  isStarted: false,
  paths: null
}

const PlinkoContext = createContext(initialState)

export const usePlinko = () => {
  return useContext(PlinkoContext)
}

export const PlinkoProvider = ({ children }: PlinkoProviderProps) => {
  const [isStarted, setIsStarted] = useState(false)
  const [paths, setPaths] = useState(null)

  return <PlinkoContext.Provider value={{ paths, isStarted }}>{children}</PlinkoContext.Provider>
}
