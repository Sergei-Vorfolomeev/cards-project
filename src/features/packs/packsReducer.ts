import { packsAPI, ResponseTypePacks } from './packsAPI'
import { AppThunk } from '../../app/store'
import { setLoadingAC } from '../../app/appReducer'
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
  isMyPacks: false,
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
    case 'packs/TOGGLE-IS-MY-PACKS':
      return { ...state, isMyPacks: action.value }
    default:
      return state
  }
}

// action creators

const setPacksAC = (packsInfo: ResponseTypePacks) =>
  ({ type: 'packs/SET-NEW-PACKS', packsInfo } as const)
export const setAllPacksSortUpdAC = (packsInfo: ResponseTypePacks) =>
  ({ type: 'packs/SET-PACKS-SORTED-UP', packsInfo } as const)
export const setAllPacksSortDownAC = (packsInfo: ResponseTypePacks) =>
  ({ type: 'packs/SET-PACKS-SORTED-DOWN', packsInfo } as const)
export const toggleIsMyPacksAC = (value: boolean) =>
  ({ type: 'packs/TOGGLE-IS-MY-PACKS', value } as const)

// thunk creators

export const getPacksTC =
  (userId?: string): AppThunk =>
  async dispatch => {
    dispatch(setLoadingAC(true))
    try {
      let res = await packsAPI.getPacks(userId)
      dispatch(setPacksAC(res))
    } catch (e) {
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
  } catch (e) {
    handleError(e, dispatch)
  }
}

export const getSortDownPacksTC = (): AppThunk => async dispatch => {
  try {
    let res = await packsAPI.getSortDownPacks()
    dispatch(setAllPacksSortDownAC(res))
  } catch (e) {
    handleError(e, dispatch)
  }
}

export const addPackTC =
  (userId?: string): AppThunk =>
  async dispatch => {
    try {
      let newPack = {
        cardsPack: {
          name: 'New Added Pack',
        },
      }
      await packsAPI.addPack(newPack)
      let res = await packsAPI.getPacks(userId)
      dispatch(setPacksAC(res))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

export const deletePackTC =
  (packId: string, userId?: string): AppThunk =>
  async dispatch => {
    try {
      await packsAPI.deletePack(packId)
      let res = await packsAPI.getPacks(userId)
      dispatch(setPacksAC(res))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

export const updatePackTC =
  (packId: string, userId?: string): AppThunk =>
  async dispatch => {
    try {
      let updatedPack = {
        cardsPack: {
          _id: packId,
          name: 'Updated Pack',
        },
      }
      await packsAPI.updatePack(updatedPack)
      let res = await packsAPI.getPacks(userId)
      dispatch(setPacksAC(res))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

//types

export type PacksActionsType =
  | ReturnType<typeof setPacksAC>
  | ReturnType<typeof setAllPacksSortUpdAC>
  | ReturnType<typeof setAllPacksSortDownAC>
  | ReturnType<typeof toggleIsMyPacksAC>

type initialStateType = {
  cardPacks: PackType[]
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
  sortDirection: 'up' | 'down'
  error: string
  isMyPacks: boolean
}

export type PackType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
}
