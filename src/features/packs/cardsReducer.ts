import {Dispatch} from "redux";
import {packsAPI} from "./packsAPI";

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
            return {...state, cards: [...action.packs]}
        // case 'packs/SET-PACKS-SORTED-UP':
        //     return {...state, cardPacks: [...action.packs], sortDirection: "up"}
        // case 'packs/SET-PACKS-SORTED-DOWN':
        //     return {...state, cardPacks: [...action.packs], sortDirection: "down"}
        default:
            return state
    }
}

// action creators

const setAllFriendsCardsAC = (packs: CardType[]) => ({type: 'cards/SET-CARDS', packs} as const)
// export const setAllPacksSortUpdAC = (packs: PackType[]) => ({type: 'packs/SET-PACKS-SORTED-UP', packs} as const)
// export const setAllPacksSortDownAC = (packs: PackType[]) => ({type: 'packs/SET-PACKS-SORTED-DOWN', packs} as const)

// think creators


export const getFriendsCardsTC = (cardsPack_id: string) => async (dispatch: Dispatch) => {
    try {
        let res = await packsAPI.getFriendsPacks(cardsPack_id)
        dispatch(setAllFriendsCardsAC(res.cards))
    } catch (e: any) {

    }
}


//types

type ActionsType =
    ReturnType<typeof setAllFriendsCardsAC>


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

