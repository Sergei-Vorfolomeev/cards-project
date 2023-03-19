import { AppRootStateType } from 'app/store'

export const getLoadingSelector = (state: AppRootStateType) => state.app.loading
export const getErrorMessageSelector = (state: AppRootStateType) => state.app.errorMessage
