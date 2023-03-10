import { Dispatch } from 'redux'
import { authAPI, ChangeDataResponseType, LoginRequestType, UserResponseType } from './authAPI'
import axios from 'axios'
import { setErrorAC, setLoadingAC } from '../../app/appReducer'

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
  register: boolean
  letterWasSent: boolean
  newPasswordWasSet: boolean
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
  register: false,
  letterWasSent: false,
  newPasswordWasSet: false,
}

// const
const LOGIN = 'LOGIN'
const SET_REGISTER = 'SET_REGISTER'
const SET_EMAIL = 'forgot/SET_EMAIL'
const SENT_LETTER = 'forgot/SENT_LETTER'
const SET_NEW_PASSWORD = 'forgot/SET_NEW_PASSWORD'
const CHANGE_DATA = 'CHANGE_DATA'

// reducer
export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action.payload.data,
        isAuth: action.payload.value,
      }
    case SET_REGISTER:
      return { ...state, register: action.register }
    case SENT_LETTER:
      return { ...state, letterWasSent: action.letterWasSent }
    case SET_EMAIL:
      return { ...state, email: action.email }
    case SET_NEW_PASSWORD:
      return { ...state, newPasswordWasSet: action.newPasswordWasSet }
    case CHANGE_DATA:
      return {
        ...state,
        name: action.payload.data.name ?? '',
        avatar: action.payload.data.avatar,
        updated: action.payload.data.updated,
      }
    default:
      return state
  }
}

//types
type ActionsType =
  | LoginACType
  | ChangeDataACType
  | SetRegisterACType
  | SetEmailACType
  | SentSentLetterACType
  | SetNewPasswordACType
type LoginACType = ReturnType<typeof loginAC>
type SetRegisterACType = ReturnType<typeof setRegisterAC>
type ChangeDataACType = ReturnType<typeof changeDataAC>
type SetEmailACType = ReturnType<typeof setEmailAC>
type SentSentLetterACType = ReturnType<typeof sentSentLetterAC>
type SetNewPasswordACType = ReturnType<typeof setNewPasswordAC>

export type ErrorType = {
  error: string
}
type changeDataACType = ChangeDataResponseType & {
  updated: null | Date
}

// action creators
const loginAC = (data: UserResponseType | InitialStateType, value: boolean) => {
  return {
    type: LOGIN,
    payload: {
      data,
      value,
    },
  } as const
}

const changeDataAC = (data: changeDataACType) => {
  return {
    type: CHANGE_DATA,
    payload: {
      data,
    },
  } as const
}

export const setRegisterAC = (register: boolean) => ({ type: SET_REGISTER, register } as const)
const setEmailAC = (email: string) => ({ type: SET_EMAIL, email } as const)
const sentSentLetterAC = (letterWasSent: boolean) => ({ type: SENT_LETTER, letterWasSent } as const)
const setNewPasswordAC = (newPasswordWasSet: boolean) =>
  ({ type: SET_NEW_PASSWORD, newPasswordWasSet } as const)

// thunk creators
export const loginTC = (data: LoginRequestType) => async (dispatch: Dispatch) => {
  dispatch(setLoadingAC(true))
  try {
    const res: UserResponseType = await authAPI.login(data)
    dispatch(loginAC(res, true))
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      const error = e.response?.data ? e.response.data.error : e.message
      dispatch(setErrorAC(error))
    } else {
      dispatch(setErrorAC('Some error'))
    }
  } finally {
    dispatch(setLoadingAC(false))
  }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
  dispatch(setLoadingAC(true))
  try {
    const res = await authAPI.logout()
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
  } finally {
    dispatch(setLoadingAC(false))
  }
}

export const meTC = () => async (dispatch: Dispatch) => {
  dispatch(setLoadingAC(true))
  try {
    const res = await authAPI.me()
    dispatch(loginAC(res, true))
    dispatch(setRegisterAC(true))
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      const error = e.response?.data ? e.response.data.error : e.message
      dispatch(setErrorAC(error))
    } else {
      dispatch(setErrorAC('Some error'))
    }
  } finally {
    dispatch(setLoadingAC(false))
  }
}

export const setRegisterTC = (email: string, password: string) => (dispatch: Dispatch) => {
  dispatch(setLoadingAC(true))
  let data = { email, password }
  authAPI
    .register(data)
    .then(() => {
      dispatch(setRegisterAC(true))
    })
    .catch(e => {
      if (axios.isAxiosError<ErrorType>(e)) {
        const error = e.response?.data ? e.response.data.error : e.message
        dispatch(setErrorAC(error))
      } else {
        dispatch(setErrorAC('Some error'))
      }
    })
    .finally(() => dispatch(setLoadingAC(false)))
}

export const changeDataTC = (data: ChangeDataResponseType) => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.changeData(data)
    if (res.statusText === 'OK') {
      const { data } = res
      dispatch(
        changeDataAC({
          name: data.updatedUser.name,
          avatar: data.updatedUser.avatar,
          updated: data.updatedUser.updated,
        })
      )
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

export const sentEmailTC = (email: string) => (dispatch: Dispatch) => {
  dispatch(setLoadingAC(true))
  dispatch(sentSentLetterAC(false))
  dispatch(setNewPasswordAC(false))
  dispatch(setEmailAC(''))
  return authAPI
    .forgot(email)
    .then(res => {
      dispatch(sentSentLetterAC(true))
      dispatch(setEmailAC(email))
    })
    .catch(e => {
      console.log(e)
      if (axios.isAxiosError<ErrorType>(e)) {
        const error = e.response?.data ? e.response?.data.error : e.message
        dispatch(setErrorAC(error))
      } else {
        dispatch(setErrorAC('Invalid Email'))
      }
    })
    .finally(() => dispatch(setLoadingAC(false)))
}

export const updatePasswordTC =
  (password: string, resetPasswordToken: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingAC(true))
    return authAPI
      .setNewPasswordRequest(password, resetPasswordToken)
      .then(() => {
        setEmailAC('')
        dispatch(setNewPasswordAC(true))
      })
      .catch(e => {
        if (axios.isAxiosError<ErrorType>(e)) {
          const error = e.response?.data ? e.response?.data.error : e.message
          dispatch(setErrorAC(error))
        } else {
          dispatch(setErrorAC('Invalid Email'))
        }
      })
      .finally(() => dispatch(setLoadingAC(false)))
  }
