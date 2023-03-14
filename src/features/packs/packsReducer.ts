import {Dispatch} from "redux";
import {packsAPI} from "./packsAPI";

const initialState: initialStateType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 100,
    minCardsCount: 0,
    page: 1,
    pageCount: 5,
    sortDirection: 'up'
}


export const packsReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'packs/SET-NEW-PACKS':
            return {...state, cardPacks: [...action.packs]}
        case 'packs/SET-PACKS-SORTED-UP':
            return {...state, cardPacks: [...action.packs], sortDirection: "up"}
        case 'packs/SET-PACKS-SORTED-DOWN':
            return {...state, cardPacks: [...action.packs], sortDirection: "down"}
        default:
            return state
    }
}

// action creators

const setAllPacksAC = (packs: PackType[]) => ({type: 'packs/SET-NEW-PACKS', packs} as const)
export const setAllPacksSortUpdAC = (packs: PackType[]) => ({type: 'packs/SET-PACKS-SORTED-UP', packs} as const)
export const setAllPacksSortDownAC = (packs: PackType[]) => ({type: 'packs/SET-PACKS-SORTED-DOWN', packs} as const)

// think creators

export const getAllPacksTC = () => async (dispatch: Dispatch) => {
    try {
        let res = await packsAPI.getAllPacks()
        dispatch(setAllPacksAC(res.cardPacks))
    } catch (e: any) {

    }
}

export const getSortUpPacksTC = () => async (dispatch: Dispatch) => {
    try {
        let res = await packsAPI.getSortUpPacks()
        dispatch(setAllPacksSortUpdAC(res.cardPacks))
    } catch (e: any) {

    }
}

export const getSortDownPacksTC = () => async (dispatch: Dispatch) => {
    try {
        let res = await packsAPI.getSortDownPacks()
        dispatch(setAllPacksSortDownAC(res.cardPacks))
    } catch (e: any) {

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
}

type PackType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number,
    created: string,
    updated: string,
}


