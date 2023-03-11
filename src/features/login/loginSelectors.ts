import { AppRootStateType } from '../../app/store'

export const getIsAuth = (state: AppRootStateType) => state.auth.isAuth
export const getRegister = (state: AppRootStateType) => state.auth.register
export const getEmail = (state: AppRootStateType) => state.auth.email
export const getLetterWasSent = (state: AppRootStateType) => state.auth.letterWasSent
export const getNewPasswordWasSet = (state: AppRootStateType) => state.auth.newPasswordWasSet
