import { Dispatch } from 'redux'
import { authAPI } from '../login/authAPI'

const initialValue: initialValueType = {
  loading: false,
  register: false,
  error: '',
}

export const registrationReducer = (state: initialValueType = initialValue, action: ActionTypes): initialValueType => {
    switch (action.type) {
        case SET_LOADING:
            return {...state, loading: action.loading}
        case SET_REGISTER:
            return {...state, register: action.register}
        case SET_ERROR:
            return {...state, error: action.error}
        default:
            return state
    }
}

// action creators
const setRegisterAC = (register: boolean) => ({ type: SET_REGISTER, register } as const)
export const setRegisterLoadingAC = (loading: boolean) => ({ type: SET_LOADING, loading } as const)
const setRegisterErrorAC = (error: string) => ({ type: SET_ERROR, error } as const)

// thunk creators
export const setRegisterTC = (email: string, password: string) => (dispatch: Dispatch) => {
    dispatch(setRegisterLoadingAC(true))
    let data = {email, password}
    return authAPI.register(data)
        .then((res) => {
            dispatch(setRegisterAC(true))
            console.log(res)
        })
        .catch((e) => {
            console.log(e.response.data.error)
            dispatch( setRegisterErrorAC(e.response.data.error))
        })
        .finally(() => dispatch(setRegisterLoadingAC(false)))
}

// const
const SET_REGISTER = 'register/SET_REGISTER'
const SET_LOADING = 'register/SET_LOADING'
const SET_ERROR = 'register/SET_ERROR'

// actions
type ActionTypes =
  | ReturnType<typeof setRegisterAC>
  | ReturnType<typeof setRegisterLoadingAC>
  | ReturnType<typeof setRegisterErrorAC>

// types
type initialValueType = {
    loading: boolean
    register: boolean
    error: string
}