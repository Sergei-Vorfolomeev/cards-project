type InitialStateType = typeof initialState

const initialState = {
  loading: false,
  errorMessage: '',
}

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionsType
): InitialStateType => {
  switch (action.type) {
    case 'SET_ERROR':
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      }
    case 'SET_LOADING':
      return { ...state, loading: action.loading }
    default:
      return state
  }
}

// types
export type AppActionsType = SetErrorACType | SetLoadingACType
type SetErrorACType = ReturnType<typeof setErrorAC>
type SetLoadingACType = ReturnType<typeof setLoadingAC>

// action creators
export const setErrorAC = (errorMessage: string) => {
  return {
    type: 'SET_ERROR',
    payload: {
      errorMessage,
    },
  } as const
}
export const setLoadingAC = (loading: boolean) => ({ type: 'SET_LOADING', loading } as const)
