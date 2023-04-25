import React, { createContext, FC, PropsWithChildren, useReducer } from 'react'
import { IUser } from '../types/User'
import { PlinkoProvider } from './PlinkoStore'
import { Reducer, IAction } from './Reducer'
import { CoinFlipProvider } from './CoinFlipStore'
import { KingProvider } from './KingStore'
import { ChatProvider } from './ChatStore'

export interface IState {
  user?: IUser
}

const initialState: IState = {}

interface IContext {
  state: IState
  dispatch: React.Dispatch<IAction>
}

export const Context = createContext<IContext>({ state: initialState, dispatch: () => null })

const Store: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)
  return (
    <Context.Provider value={{ state, dispatch }}>
      <ChatProvider>
        <PlinkoProvider>
          <CoinFlipProvider>
            <KingProvider>{children}</KingProvider>
          </CoinFlipProvider>
        </PlinkoProvider>
      </ChatProvider>
    </Context.Provider>
  )
}

export default Store
