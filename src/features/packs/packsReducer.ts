import { packsAPI } from './packsAPI'
import { AppThunk } from '../../app/store'

const initialState: initialStateType = {
  cardPacks: [],
  cardPacksTotalCount: 0,
  maxCardsCount: 100,
  minCardsCount: 0,
  page: 1,
  pageCount: 5,
  sortDirection: 'up',
}

export const packsReducer = (
  state: initialStateType = initialState,
  action: PacksActionsType
): initialStateType => {
  switch (action.type) {
    case 'packs/SET-NEW-PACKS':
      return { ...state, cardPacks: [...action.packs] }
    case 'packs/SET-PACKS-SORTED-UP':
      return { ...state, cardPacks: [...action.packs], sortDirection: 'up' }
    case 'packs/SET-PACKS-SORTED-DOWN':
      return { ...state, cardPacks: [...action.packs], sortDirection: 'down' }
    case 'packs/ADD-PACK':
      return { ...state, cardPacks: [action.pack, ...state.cardPacks] }
    default:
      return state
  }
}

// action creators

const setAllPacksAC = (packs: PackType[]) => ({ type: 'packs/SET-NEW-PACKS', packs } as const)
export const setAllPacksSortUpdAC = (packs: PackType[]) =>
  ({ type: 'packs/SET-PACKS-SORTED-UP', packs } as const)
export const setAllPacksSortDownAC = (packs: PackType[]) =>
  ({ type: 'packs/SET-PACKS-SORTED-DOWN', packs } as const)
export const addPackAC = (pack: PackType) => ({ type: 'packs/ADD-PACK', pack } as const)

// thunk creators

export const getAllPacksTC = (): AppThunk => async dispatch => {
  try {
    let res = await packsAPI.getAllPacks()
    console.log(res)
    dispatch(setAllPacksAC(res.cardPacks))
  } catch (e: any) {}
}

export const getSortUpPacksTC = (): AppThunk => async dispatch => {
  try {
    let res = await packsAPI.getSortUpPacks()
    dispatch(setAllPacksSortUpdAC(res.cardPacks))
  } catch (e: any) {}
}

export const getSortDownPacksTC = (): AppThunk => async dispatch => {
  try {
    let res = await packsAPI.getSortDownPacks()
    dispatch(setAllPacksSortDownAC(res.cardPacks))
  } catch (e: any) {}
}
export const addPackTC = (): AppThunk => async dispatch => {
  try {
    await packsAPI.addPack()
    let res = await packsAPI.getAllPacks()
    console.log(res)
    dispatch(setAllPacksAC(res.cardPacks))
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
}

type PackType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
}
