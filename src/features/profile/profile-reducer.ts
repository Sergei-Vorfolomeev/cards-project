import { Dispatch } from 'redux'
import { authAPI } from '../login/authAPI'

const initialValue: initialValueType = {
  loading: false,
  error: '',
  isAuth: true,
}

export const profileReducer = (state: initialValueType = initialValue, action: ActionTypes): initialValueType => {
    switch (action.type) {
        case SET_LOGOUT:
            return {...state, isAuth: action.isAuth}
        case SET_LOADING:
            return {...state, loading: action.loading}
        case SET_ERROR:
            return {...state, error: action.error}
        default:
            return state
    }
}

// action creators
export const setLogoutAC = (isAuth: boolean) => ({type: SET_LOGOUT, isAuth} as const)
const setProfileLoadingAC = (loading: boolean) => ({type: SET_LOADING, loading} as const)
const setProfileErrorAC = (error: string) => ({type: SET_ERROR, error} as const)

// thunk creators
export const setProfileTC = () => (dispatch: Dispatch) => {
    dispatch(setProfileLoadingAC(true))
    return authAPI.logout()
        .then((res) => {
            dispatch(setLogoutAC(false))
        })
        .catch((e) => {
            dispatch( setProfileErrorAC(e.response.data.error))
        })
        .finally(() => dispatch(setProfileLoadingAC(false)))

}

export const setNewNameTC = () => (dispatch: Dispatch) => {
    dispatch(setProfileLoadingAC(true))
    return authAPI.logout()
      .then((res) => {
          dispatch(setLogoutAC(false))
      })
      .catch((e) => {
          dispatch( setProfileErrorAC(e.response.data.error))
      })
      .finally(() => dispatch(setProfileLoadingAC(false)))

}

// const
const SET_LOGOUT = 'profile/SET_LOGOUT'
const SET_LOADING = 'profile/SET_LOADING'
const SET_ERROR = 'profile/SET_ERROR'

// actions
type ActionTypes =
  | ReturnType<typeof setProfileLoadingAC>
  | ReturnType<typeof setProfileErrorAC>
  | ReturnType<typeof setLogoutAC>

// types
type initialValueType = {
  loading: boolean
  error: string
  isAuth: boolean
}