import { AppRootStateType } from './store'

export const getLoading = (state: AppRootStateType) => state.app.loading
export const getErrorMessage = (state: AppRootStateType) => state.app.errorMessage
