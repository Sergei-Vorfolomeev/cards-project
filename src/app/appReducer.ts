import { AppThunk } from 'app/store'
import { handleError } from 'common/utils/error-utils'
import { meTC } from 'features/login/authReducer'
import { getPacksTC } from 'features/packs/packsReducer'

type InitialStateType = typeof initialState

const initialState = {
  isInitialized: false,
  loading: false,
  errorMessage: '',
}

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionsType
): InitialStateType => {
  switch (action.type) {
    case 'INITIALIZE_APP':
      return { ...state, isInitialized: action.status }
    case 'SET_ERROR':
      return { ...state, errorMessage: action.errorMessage }
    case 'SET_LOADING':
      return { ...state, loading: action.loading }
    default:
      return state
  }
}

// types
export type AppActionsType = SetErrorACType | SetLoadingACType | InitializeAppACType
type InitializeAppACType = ReturnType<typeof initializeAppAC>
type SetErrorACType = ReturnType<typeof setErrorAC>
type SetLoadingACType = ReturnType<typeof setLoadingAC>

// action creators
export const initializeAppAC = (status: boolean) => ({ type: 'INITIALIZE_APP', status } as const)
export const setErrorAC = (errorMessage: string) => ({ type: 'SET_ERROR', errorMessage } as const)
export const setLoadingAC = (loading: boolean) => ({ type: 'SET_LOADING', loading } as const)

// thunk creators
export const initializeAppTC = (): AppThunk => async dispatch => {
  dispatch(setLoadingAC(true))
  try {
    await dispatch(meTC())
    await dispatch(getPacksTC({}))
  } catch (e) {
    handleError(e, dispatch)
  } finally {
    dispatch(setLoadingAC(false))
    dispatch(initializeAppAC(true))
  }
}
