import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AuthActionsType, authReducer } from '../features/login/authReducer'
import { AppActionsType, appReducer } from './appReducer'
import { PacksActionsType, packsReducer } from '../features/packs/packsReducer'
import { CardsActionsType, cardsReducer } from '../features/packs/cardsReducer'

// store
const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  packs: packsReducer,
  cards: cardsReducer,
})
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

//custom hooks
export const useAppDispatch = () => useDispatch<AppThunkDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

//@ts-ignore
window.store = store

// types
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppRootActionsType =
  | AuthActionsType
  | AppActionsType
  | PacksActionsType
  | CardsActionsType
export type AppThunkDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppRootActionsType
>
