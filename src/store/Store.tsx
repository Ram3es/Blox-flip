import React, { createContext, FC, PropsWithChildren, useContext, useReducer } from 'react'
import { IUser } from '../types/User'
import { PlinkoProvider } from './PlinkoStore'
import { Reducer, IAction } from './Reducer'
import { CoinFlipProvider } from './CoinFlipStore'
import { ChatProvider } from './ChatStore'
import { BattleCaseProvider } from './BattleCaseStore'
import SocketCtxProvider from './SocketStore'
import { CaseOpeningProvider } from './CaseOpeningStore'
import { JackpotProvider } from './JackpotStore'
import { WheelProvider } from './WheelStore'
import { LiveFeedProvider } from './LiveFeedStore'

export interface IState {
  user?: IUser
  hash?: string
  referal?: {
    type: string
    code: string
  }
}

const initialState: IState = {}

interface IContext {
  state: IState
  dispatch: React.Dispatch<IAction>
}

export const Context = createContext<IContext>({ state: initialState, dispatch: () => null })

export const useAppStore = () => useContext(Context)

const Store: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)

  return (
    <Context.Provider value={{ state, dispatch }}>
      <SocketCtxProvider>
        <ChatProvider>
          <LiveFeedProvider>
            <CaseOpeningProvider>
              <BattleCaseProvider>
                <PlinkoProvider>
                  <CoinFlipProvider>
                    <JackpotProvider>
                      <WheelProvider>{children}</WheelProvider>
                    </JackpotProvider>
                  </CoinFlipProvider>
                </PlinkoProvider>
              </BattleCaseProvider>
            </CaseOpeningProvider>
          </LiveFeedProvider>
        </ChatProvider>
      </SocketCtxProvider>
    </Context.Provider>
  )
}

export default Store
