import { Dispatch } from 'redux'
import { authAPI, LoginRequestType, LoginResponseType } from './authAPI'
import axios from 'axios'
import { setErrorAC } from '../../app/appReducer'

type InitialStateType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  // количество колод

  created: Date | null
  updated: Date | null
  isAdmin: boolean
  verified: boolean // подтвердил ли почту
  rememberMe: boolean

  error?: string
  isAuth: boolean
}

const initialState = {
  _id: '',
  email: '',
  name: '',
  avatar: '',
  publicCardPacksCount: 0,
  // количество колод

  created: null,
  updated: null,
  isAdmin: false,
  verified: false, // подтвердил ли почту
  rememberMe: false,

  error: '',
  isAuth: false,
}

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        ...action.payload.data,
        isAuth: action.payload.value,
      }
    default:
      return state
  }
}

//types
type ActionsType = LoginACType
type LoginACType = ReturnType<typeof loginAC>

type ErrorType = {
  error: string
}

// action creators
const loginAC = (data: LoginResponseType | InitialStateType, value: boolean) => {
  return {
    type: 'LOGIN',
    payload: {
      data,
      value,
    },
  } as const
}

// thunk creators
export const loginTC = (data: LoginRequestType) => async (dispatch: Dispatch) => {
  try {
    const res: LoginResponseType = await authAPI.login(data)
    dispatch(loginAC(res, true))
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      const error = e.response?.data ? e.response.data.error : e.message
      dispatch(setErrorAC(error))
    } else {
      dispatch(setErrorAC('Some error'))
    }
  }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.logout()
    console.log(res)
    if (res.statusText === 'OK') {
      dispatch(loginAC(initialState, false))
    }
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      const error = e.response?.data ? e.response.data.error : e.message
      dispatch(setErrorAC(error))
    } else {
      dispatch(setErrorAC('Some error'))
    }
  }
}

export const meTC = () => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.me()
    dispatch(loginAC(res, true))
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      const error = e.response?.data ? e.response.data.error : e.message
      dispatch(setErrorAC(error))
    } else {
      dispatch(setErrorAC('Some error'))
    }
  }
}
