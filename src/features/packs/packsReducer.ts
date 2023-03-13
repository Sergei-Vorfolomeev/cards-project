import {Dispatch} from "redux";
import {packsAPI} from "./packsAPI";

const initialState: initialStateType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 100,
    minCardsCount: 0,
    page: 1,
    pageCount: 5,
}


export const packsReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'packs/SET-NEW-PACKS':
            return {...action.packs}
        case 'packs/SET-PACKS-SORTED':
            return {...state, cardPacks: [...action.packs]}
        default:
            return state
    }
}

// action creators

const setAllPacksAC = (packs: initialStateType) => ({type: 'packs/SET-NEW-PACKS', packs} as const)
export const setAllPacksSortedAC = (packs: PackType[]) => ({type: 'packs/SET-PACKS-SORTED', packs} as const)


// think creators

export const getAllPacksTC = () => async (dispatch: Dispatch) => {
    try {
        let res = await packsAPI.getAllPacks()
        dispatch(setAllPacksAC(res))
    } catch (e:any) {

    }
}

export const setAllPacksSortedTC = (packs: PackType[]) =>  (dispatch: Dispatch) => {
    try {
        dispatch(setAllPacksSortedAC(packs))
    } catch (e:any) {

    }
}

//types

type ActionsType = ReturnType<typeof setAllPacksAC> |  ReturnType<typeof setAllPacksSortedAC>

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
    cardsCount: number,
    created: string,
    updated: string,
}


