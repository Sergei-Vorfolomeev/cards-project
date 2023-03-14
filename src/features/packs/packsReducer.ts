import { packsAPI } from './packsAPI'
import { AppThunk } from '../../app/store'

const initialState: initialStateType = {
  cardPacks: [],
  cardPacksTotalCount: 0,
  maxCardsCount: 100,
  minCardsCount: 0,
  page: 1,
  pageCount: 5,
}

export const packsReducer = (
  state: initialStateType = initialState,
  action: PacksActionsType
): initialStateType => {
  switch (action.type) {
    case 'packs/SET-NEW-PACKS':
      return { ...action.packs }
    case 'packs/SET-PACKS-SORTED':
      return { ...state, cardPacks: [...action.packs] }
    case 'packs/ADD-PACK':
      return { ...state, cardPacks: [action.pack, ...state.cardPacks] }
    default:
      return state
  }
}

// action creators

const setAllPacksAC = (packs: initialStateType) => ({ type: 'packs/SET-NEW-PACKS', packs } as const)
export const setAllPacksSortedAC = (packs: PackType[]) =>
  ({ type: 'packs/SET-PACKS-SORTED', packs } as const)
export const addPackAC = (pack: PackType) => ({ type: 'packs/ADD-PACK', pack } as const)

// think creators

export const getAllPacksTC = (): AppThunk => async dispatch => {
  try {
    let res = await packsAPI.getAllPacks()
    console.log(res)
    dispatch(setAllPacksAC(res))
  } catch (e: any) {}
}

export const setAllPacksSortedTC =
  (packs: PackType[]): AppThunk =>
  dispatch => {
    try {
      dispatch(setAllPacksSortedAC(packs))
    } catch (e: any) {}
  }

export const addPackTC = (): AppThunk => async dispatch => {
  try {
    const pack = {
      _id: '12345',
      user_id: '54321',
      name: 'New added pack',
      cardsCount: 2,
      created: Date.now().toString(),
      updated: Date.now().toString(),
    }
    let res = await packsAPI.addPack()
    dispatch(addPackAC(pack))
    dispatch(getAllPacksTC())
  } catch (e: any) {}
}

//types

export type PacksActionsType =
  | ReturnType<typeof setAllPacksAC>
  | ReturnType<typeof setAllPacksSortedAC>
  | ReturnType<typeof addPackAC>

type initialStateType = {
  cardPacks: PackType[]
  cardPacksTotalCount?: number
  maxCardsCount?: number
  minCardsCount?: number
  page?: number
  pageCount?: number
}

type PackType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
}
