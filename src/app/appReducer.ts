type InitialStateType = typeof initialState

const initialState = {
  errorMessage: '',
}

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'SET-ERROR':
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      }
    default:
      return state
  }
}

// types
type ActionsType = SetErrorACType
type SetErrorACType = ReturnType<typeof setErrorAC>

// action creators
export const setErrorAC = (errorMessage: string) => {
  return {
    type: 'SET-ERROR',
    payload: {
      errorMessage,
    },
  } as const
}
