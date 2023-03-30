import { IState } from './Store'

export interface IAction {
  type: string
  payload?: any
}

export const Reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    default:
      return state
  }
}
