import {Dispatch} from "redux";
import {packsAPI, ResponseTypePacks} from "./packsAPI";
import {setErrorAC, setLoadingAC} from "../../app/appReducer";
import {handleError} from "../../common/utils/error-utils";

const initialState: initialStateType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 100,
    minCardsCount: 0,
    page: 1,
    pageCount: 5,
    sortDirection: 'up',
    error: ''
}


export const packsReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'packs/SET-NEW-PACKS':
            return {...state, ...action.packsInfo}
        case 'packs/SET-PACKS-SORTED-UP':
            return {...state, ...action.packsInfo, sortDirection: "up"}
        case 'packs/SET-PACKS-SORTED-DOWN':
            return {...state, ...action.packsInfo, sortDirection: "down"}
        default:
            return state
    }
}

// action creators

const setAllPacksAC = (packsInfo: ResponseTypePacks) => ({type: 'packs/SET-NEW-PACKS', packsInfo} as const)
export const setAllPacksSortUpdAC = (packsInfo: ResponseTypePacks) => ({type: 'packs/SET-PACKS-SORTED-UP', packsInfo} as const)
export const setAllPacksSortDownAC = (packsInfo: ResponseTypePacks) => ({type: 'packs/SET-PACKS-SORTED-DOWN', packsInfo} as const)

// think creators

export const getAllPacksTC = () => async (dispatch: Dispatch) => {
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

export const getSortUpPacksTC = () => async (dispatch: Dispatch) => {
    try {
        let res = await packsAPI.getSortUpPacks()
        dispatch(setAllPacksSortUpdAC(res))
    } catch (e: any) {
        handleError(e, dispatch)
    }
}

export const getSortDownPacksTC = () => async (dispatch: Dispatch) => {
    try {
        let res = await packsAPI.getSortDownPacks()
        dispatch(setAllPacksSortDownAC(res))
    } catch (e: any) {
        handleError(e, dispatch)
    }
}

//types

type ActionsType =
    ReturnType<typeof setAllPacksAC>
    | ReturnType<typeof setAllPacksSortUpdAC>
    | ReturnType<typeof setAllPacksSortDownAC>

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
    cardsCount: number,
    created: string,
    updated: string,
}


