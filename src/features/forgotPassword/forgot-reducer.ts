import {Dispatch} from "redux"
import {authAPI} from "../login/authAPI";

const initialState: initialStateType = {
    error: '',
    email: '',
    isLoading: false,
    letterWasSent: false,
    newPasswordWasSet: false,
}

export const forgotReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case SENT_LETTER:
            return {...state, letterWasSent: action.letterWasSent}
        case SET_LOADING:
            return {...state, isLoading: action.isLoading}
        case SET_ERROR:
            return {...state, error: action.error}
        case SET_EMAIL:
            return {...state, email: action.email}
        case SET_NEW_PASSWORD:
            return {...state, newPasswordWasSet: action.newPasswordWasSet}
        default:
            return state
    }
}

// action creators

const setErrorAC = (error: string) => ({type: SET_ERROR, error}) as const
const setEmailAC = (email: string) => ({type: SET_EMAIL, email}) as const
const setLoadingAC = (isLoading: boolean) => ({type: SET_LOADING, isLoading}) as const
const sentSentLetterAC = (letterWasSent: boolean) => ({type: SENT_LETTER, letterWasSent}) as const
const setNewPasswordAC = (newPasswordWasSet: boolean) => ({type: SET_NEW_PASSWORD, newPasswordWasSet}) as const

// thunk creators

export const sentEmailTC = (email: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingAC(true))
    dispatch(sentSentLetterAC(false))
    dispatch(setNewPasswordAC(false))
    dispatch( setEmailAC(''))
    return authAPI.forgot(email)
        .then((res) => {
            dispatch(sentSentLetterAC(true))
            dispatch( setEmailAC(email))
        })
        .catch((e) => {
            e.response.data.error ? dispatch(setErrorAC(e.response.data.error)) : dispatch(setErrorAC('Invalid Email'))
        })
        .finally(() => dispatch(setLoadingAC(false)))
}

export const updatePasswordTC = (password: string, resetPasswordToken: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingAC(true))
    return authAPI.setNewPasswordRequest(password, resetPasswordToken)
        .then((res)=> {
            setEmailAC('')
            dispatch(setNewPasswordAC(true))
        })
        .catch((e) => {
            e.response.data.error ? dispatch(setErrorAC(e.response.data.error)) : dispatch(setErrorAC('Invalid password'))
        })
        .finally(() => dispatch(setLoadingAC(false)))
}

// const

const SET_LOADING = 'forgot/SET_LOADING'
const SET_ERROR = 'forgot/SET_ERROR'
const SET_EMAIL = 'forgot/SET_EMAIL'
const SENT_LETTER = 'forgot/SENT_LETTER'
const SET_NEW_PASSWORD = 'forgot/SET_NEW_PASSWORD'

// types

type initialStateType = {
    error: string
    email: string
    isLoading: boolean
    letterWasSent: boolean
    newPasswordWasSet: boolean
}

type ActionsType =
    ReturnType<typeof setErrorAC>
    | ReturnType<typeof setEmailAC>
    | ReturnType<typeof setLoadingAC>
    | ReturnType<typeof sentSentLetterAC>
    | ReturnType<typeof setNewPasswordAC>