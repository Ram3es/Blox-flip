export const Reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    default:
      return state
  }
}
