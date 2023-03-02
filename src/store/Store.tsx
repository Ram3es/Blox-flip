import React, { createContext, FC, PropsWithChildren, useReducer } from 'react'
import { Reducer } from './Reducer'

const initialState = {}

export const Context = createContext({})

const Store: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)
  return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
  )
}

export default Store
