import { IState } from './Store'

export interface IAction {
  type: string
  payload?: any
}

export const Reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'LOGOUT': {
      localStorage.removeItem('token')
      return { ...state, user: undefined, hash: undefined }
    }
    case 'CONNECT':
      return { ...state, hash: action.payload }
    case 'REFERAL':
      return { ...state, referal: action.payload }
    default:
      return state
  }
}
