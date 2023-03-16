import { packsAPI, ResponseTypePacks } from './packsAPI'
import { AppThunk } from '../../app/store'
import { setErrorAC, setLoadingAC } from '../../app/appReducer'
import { handleError } from '../../common/utils/error-utils'

const initialState: initialStateType = {
  cardPacks: [],
  cardPacksTotalCount: 0,
  maxCardsCount: 100,
  minCardsCount: 0,
  page: 1,
  pageCount: 5,
  sortDirection: 'up',
  error: '',
}

export const packsReducer = (
  state: initialStateType = initialState,
  action: PacksActionsType
): initialStateType => {
  switch (action.type) {
    case 'packs/SET-NEW-PACKS':
      return { ...state, ...action.packsInfo }
    case 'packs/SET-PACKS-SORTED-UP':
      return { ...state, ...action.packsInfo, sortDirection: 'up' }
    case 'packs/SET-PACKS-SORTED-DOWN':
      return { ...state, ...action.packsInfo, sortDirection: 'down' }
    case 'packs/ADD-PACK':
      return { ...state, cardPacks: [action.pack, ...state.cardPacks] }
    default:
      return state
  }
}

// action creators

const setAllPacksAC = (packsInfo: ResponseTypePacks) =>
  ({ type: 'packs/SET-NEW-PACKS', packsInfo } as const)
export const setAllPacksSortUpdAC = (packsInfo: ResponseTypePacks) =>
  ({ type: 'packs/SET-PACKS-SORTED-UP', packsInfo } as const)
export const setAllPacksSortDownAC = (packsInfo: ResponseTypePacks) =>
  ({ type: 'packs/SET-PACKS-SORTED-DOWN', packsInfo } as const)
export const addPackAC = (pack: PackType) => ({ type: 'packs/ADD-PACK', pack } as const)

// thunk creators

export const getAllPacksTC = (): AppThunk => async dispatch => {
  dispatch(setLoadingAC(true))
  try {
    let res = await packsAPI.getAllPacks()
    dispatch(setAllPacksAC(res))
  } catch (e: any) {
    console.log(e)
    handleError(e, dispatch)
  } finally {
    dispatch(setLoadingAC(false))
  }
}

export const getSortUpPacksTC = (): AppThunk => async dispatch => {
  try {
    let res = await packsAPI.getSortUpPacks()
    dispatch(setAllPacksSortUpdAC(res))
  } catch (e: any) {
    handleError(e, dispatch)
  }
}

export const getSortDownPacksTC = (): AppThunk => async dispatch => {
  try {
    let res = await packsAPI.getSortDownPacks()
    dispatch(setAllPacksSortDownAC(res))
  } catch (e: any) {
    handleError(e, dispatch)
  }
}

export const addPackTC = (): AppThunk => async dispatch => {
  try {
    let newPack = {
      cardsPack: {
        name: 'New Added Pack',
        // private: false,
      },
    }
    await packsAPI.addPack(newPack)
    let res = await packsAPI.getAllPacks()
    console.log(res)
    dispatch(setAllPacksAC(res))
    // console.log(res)
    // dispatch(addPackAC(res))
    // dispatch(getAllPacksTC())
  } catch (e: any) {}
}

//types

export type PacksActionsType =
  | ReturnType<typeof setAllPacksAC>
  | ReturnType<typeof setAllPacksSortUpdAC>
  | ReturnType<typeof setAllPacksSortDownAC>
  | ReturnType<typeof addPackAC>

type initialStateType = {
  cardPacks: PackType[]
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
  sortDirection: 'up' | 'down'
  error: string
}

type PackType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
}
