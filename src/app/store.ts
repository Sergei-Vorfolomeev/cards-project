import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk, { ThunkDispatch } from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { authReducer } from '../features/login/authReducer'
import { registrationReducer } from '../features/registation/registration-reducer'

// store
const rootReducer = combineReducers({
  auth: authReducer,
  registrationReducer: registrationReducer,
})
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

//custom hooks
export const useAppDispatch = () => useDispatch<AppThunkDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

//@ts-ignore
window.store = store

// types
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
