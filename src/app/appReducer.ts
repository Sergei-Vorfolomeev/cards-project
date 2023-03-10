type InitialStateType = typeof initialState

const initialState = {
  loading: false,
  errorMessage: '',
}

const SET_ERROR = 'SET_ERROR'
const SET_LOADING = 'SET_LOADING'

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      }
    case SET_LOADING:
      return { ...state, loading: action.loading }
    default:
      return state
  }
}

// types
type ActionsType = SetErrorACType | SetLoadingACType
type SetErrorACType = ReturnType<typeof setErrorAC>
type SetLoadingACType = ReturnType<typeof setLoadingAC>

// action creators
export const setErrorAC = (errorMessage: string) => {
  return {
    type: SET_ERROR,
    payload: {
      errorMessage,
    },
  } as const
}
export const setLoadingAC = (loading: boolean) => ({ type: SET_LOADING, loading } as const)
