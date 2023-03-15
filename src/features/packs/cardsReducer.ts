import {Dispatch} from "redux";
import {packsAPI, ResponseTypeCards} from "./packsAPI";
import {setLoadingAC} from "../../app/appReducer";
import {handleError} from "../../common/utils/error-utils";

const initialState: InitialStateType = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 5,
    minGrade: 1,
    page: 1,
    pageCount: 10,
    packUserId: '',
    sortDirection: 'up'
}


export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'cards/SET-CARDS':
            return {...state, ...action.cardsInfo}
        case 'packs/SET-CARDS-SORTED-UP':
            return {...state, ...action.cardsInfo, sortDirection: "up"}
        case 'packs/SET-CARDS-SORTED-DOWN':
            return {...state, ...action.cardsInfo, sortDirection: "down"}
        default:
            return state
    }
}

// action creators

const setAllFriendsCardsAC = (cardsInfo: ResponseTypeCards) => ({type: 'cards/SET-CARDS', cardsInfo} as const)
export const setCardsSortUpdAC = (cardsInfo: ResponseTypeCards) => ({
    type: 'packs/SET-CARDS-SORTED-UP',
    cardsInfo
} as const)
export const setCardsSortDownAC = (cardsInfo: ResponseTypeCards) => ({
    type: 'packs/SET-CARDS-SORTED-DOWN',
    cardsInfo
} as const)

// think creators


export const getCardsTC = (cardsPack_id: string) => async (dispatch: Dispatch) => {
    dispatch(setLoadingAC(true))
    try {
        let res = await packsAPI.getAllCards(cardsPack_id)
        dispatch(setAllFriendsCardsAC(res))
    } catch (e: any) {
        handleError(e, dispatch)
    } finally {
        dispatch(setLoadingAC(false))
    }
}

export const getCardsSortUpTC = (cardsPack_id: string) => async (dispatch: Dispatch) => {
    try {
        let res = await packsAPI.getSortUpCards(cardsPack_id)
        dispatch(setCardsSortUpdAC(res))
    } catch (e: any) {
        handleError(e, dispatch)
    }
}

export const getCardsSortDownTC = (cardsPack_id: string) => async (dispatch: Dispatch) => {
    try {
        let res = await packsAPI.getSortDownCards(cardsPack_id)
        dispatch(setCardsSortDownAC(res))
    } catch (e: any) {
        handleError(e, dispatch)
    }
}

//types

type ActionsType =
    ReturnType<typeof setAllFriendsCardsAC>
    | ReturnType<typeof setCardsSortUpdAC>
    | ReturnType<typeof setCardsSortDownAC>


export type InitialStateType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
    sortDirection: 'up' | 'down'
}

type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}

