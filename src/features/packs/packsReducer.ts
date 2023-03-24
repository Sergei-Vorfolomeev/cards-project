import { setLoadingAC } from 'app/appReducer'
import { AppThunk } from 'app/store'
import { handleError } from 'common/utils/error-utils'
import { getPacksDataType, packsAPI, ResponseTypePacks } from 'features/packs/packsAPI'

const initialState: InitialStateType = {
  cardPacks: [],
  cardPacksTotalCount: 0,
  maxCardsCount: 100,
  minCardsCount: 0,
  page: 1,
  pageCount: 5,
  sortDirection: 'up',
  error: '',
  buttonDisableBecauseProcess: false,
}

export const packsReducer = (
  state: InitialStateType = initialState,
  action: PacksActionsType
): InitialStateType => {
  switch (action.type) {
    case 'packs/SET-NEW-PACKS':
      return { ...state, ...action.packsInfo, cardPacks: [...action.packsInfo.cardPacks] }
    case 'packs/SET-PACKS-SORTED-UP':
      return {
        ...state,
        ...action.packsInfo,
        cardPacks: [...action.packsInfo.cardPacks],
        sortDirection: 'up',
      }
    case 'packs/SET-PACKS-SORTED-DOWN':
      return {
        ...state,
        ...action.packsInfo,
        cardPacks: [...action.packsInfo.cardPacks],
        sortDirection: 'down',
      }
    case 'packs/SET-MIN-NAX-CARDS-COUNT':
      return { ...state, maxCardsCount: action.maxCardsCount, minCardsCount: action.minCardsCount }
    case 'packs/SET-BUTTON-DISABLE':
      return { ...state, buttonDisableBecauseProcess: action.buttonDisable }
    default:
      return state
  }
}

// action creators

const setPacksAC = (packsInfo: ResponseTypePacks) =>
  ({ type: 'packs/SET-NEW-PACKS', packsInfo } as const)
const toggleButtonDisableAC = (buttonDisable: boolean) =>
  ({ type: 'packs/SET-BUTTON-DISABLE', buttonDisable } as const)

export const setAllPacksSortUpdAC = (packsInfo: ResponseTypePacks) =>
  ({ type: 'packs/SET-PACKS-SORTED-UP', packsInfo } as const)
export const setAllPacksSortDownAC = (packsInfo: ResponseTypePacks) =>
  ({ type: 'packs/SET-PACKS-SORTED-DOWN', packsInfo } as const)
export const setMinMaxCardValuesAC = (minMaxValue: number[]) =>
  ({
    type: 'packs/SET-MIN-NAX-CARDS-COUNT',
    minCardsCount: minMaxValue[0],
    maxCardsCount: minMaxValue[1],
  } as const)

// thunk creators

export const getPacksTC =
  (data: getPacksDataType): AppThunk =>
  async dispatch => {
    dispatch(setLoadingAC(true))
    try {
      let res = await packsAPI.getPacks(data)

      dispatch(setPacksAC(res))
    } catch (e) {
      handleError(e, dispatch)
    } finally {
      dispatch(setLoadingAC(false))
    }
  }

export const getSortUpPacksTC =
  (data: getPacksDataType): AppThunk =>
  async dispatch => {
    try {
      let res = await packsAPI.getSortUpPacks(data)

      dispatch(setAllPacksSortUpdAC(res))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

export const getSortDownPacksTC =
  (data: getPacksDataType): AppThunk =>
  async dispatch => {
    try {
      let res = await packsAPI.getSortDownPacks(data)

      dispatch(setAllPacksSortDownAC(res))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

export const addPackTC =
  (packName: string, isPrivate: boolean, userId?: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(toggleButtonDisableAC(true))
      let newPack = {
        cardsPack: {
          name: packName,
          private: isPrivate,
        },
      }

      await packsAPI.addPack(newPack)
      let res = await packsAPI.getPacks({ user_id: userId })

      dispatch(setPacksAC(res))
    } catch (e) {
      handleError(e, dispatch)
    } finally {
      dispatch(toggleButtonDisableAC(false))
    }
  }

export const deletePackTC =
  (packId: string, userId?: string): AppThunk =>
  async dispatch => {
    try {
      await packsAPI.deletePack(packId)
      let res = await packsAPI.getPacks({ user_id: userId })

      dispatch(setPacksAC(res))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

export const updatePackTC =
  (packId: string, packName: string, isPrivate: boolean, userId?: string): AppThunk =>
  async dispatch => {
    try {
      let updatedPack = {
        cardsPack: {
          _id: packId,
          name: packName,
          private: isPrivate,
        },
      }

      await packsAPI.updatePack(updatedPack)
      let res = await packsAPI.getPacks({ user_id: userId })

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
  | ReturnType<typeof setMinMaxCardValuesAC>
  | ReturnType<typeof toggleButtonDisableAC>

type InitialStateType = {
  cardPacks: PackType[]
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
  sortDirection: 'up' | 'down'
  error: string
  buttonDisableBecauseProcess: boolean
}

export type PackType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
  private: boolean
}
