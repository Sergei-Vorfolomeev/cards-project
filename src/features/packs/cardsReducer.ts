import {Dispatch} from 'redux'
import {getCardsDataType, packsAPI, ResponseTypeCards} from './packsAPI'
import {setLoadingAC} from '../../app/appReducer'
import {handleError} from '../../common/utils/error-utils'
import {AppThunk} from '../../app/store'

const initialState: InitialStateType = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 5,
    minGrade: 1,
    page: 1,
    pageCount: 10,
    packUserId: '',
    sortDirection: 'up',
}

export const cardsReducer = (
    state: InitialStateType = initialState,
    action: CardsActionsType
): InitialStateType => {
    switch (action.type) {
        case 'cards/SET-CARDS':
            return {...state, ...action.cardsInfo}
        case 'packs/SET-CARDS-SORTED-UP':
            return {...state, ...action.cardsInfo, sortDirection: 'up'}
        case 'packs/SET-CARDS-SORTED-DOWN':
            return {...state, ...action.cardsInfo, sortDirection: 'down'}
        case 'cards/SET-DEFAULT-CARDS':
            return {...state, cardsTotalCount:0}
        default:
            return state
    }
}

// action creators

export const setCardsAC = (cardsInfo: ResponseTypeCards) =>
    ({type: 'cards/SET-CARDS', cardsInfo} as const)
export const setCardDefaultsAC = () =>
    ({type: 'cards/SET-DEFAULT-CARDS'} as const)
export const setCardsSortUpdAC = (cardsInfo: ResponseTypeCards) =>
    ({
        type: 'packs/SET-CARDS-SORTED-UP',
        cardsInfo,
    } as const)
export const setCardsSortDownAC = (cardsInfo: ResponseTypeCards) =>
    ({
        type: 'packs/SET-CARDS-SORTED-DOWN',
        cardsInfo,
    } as const)

// thunk creators

export const getCardsTC = (cardsInfo: getCardsDataType): AppThunk => async dispatch => {
    dispatch(setLoadingAC(true))
    try {
        let res = await packsAPI.getCards(cardsInfo)
        dispatch(setCardsAC(res))
    } catch (e) {
        handleError(e, dispatch)
    } finally {
        dispatch(setLoadingAC(false))
    }
}

export const getCardsSortUpTC =
    (cardsPack_id: string): AppThunk =>
        async dispatch => {
            try {
                let res = await packsAPI.getSortUpCards(cardsPack_id)
                dispatch(setCardsSortUpdAC(res))
            } catch (e) {
                handleError(e, dispatch)
            }
        }

export const getCardsSortDownTC =
    (cardsPack_id: string): AppThunk =>
        async dispatch => {
            try {
                let res = await packsAPI.getSortDownCards(cardsPack_id)
                dispatch(setCardsSortDownAC(res))
            } catch (e) {
                handleError(e, dispatch)
            }
        }

export const addCardTC =
    (cardsPack_id: string): AppThunk =>
        async dispatch => {
            try {
                let newCard = {
                    card: {
                        cardsPack_id,
                    },
                }
                await packsAPI.addCard(newCard)
                let res = await packsAPI.getCards({cardsPack_id})
                dispatch(setCardsAC(res))
            } catch (e) {
                handleError(e, dispatch)
            }
        }

export const deleteCardTC =
    (cardsPack_id: string, cardId: string): AppThunk =>
        async dispatch => {
            try {
                await packsAPI.deleteCard(cardId)
                let res = await packsAPI.getCards({cardsPack_id})
                dispatch(setCardsAC(res))
            } catch (e) {
                handleError(e, dispatch)
            }
        }

export const updateCardTC =
    (cardsPack_id: string, cardId: string): AppThunk =>
        async dispatch => {
            try {
                let updatedCard = {
                    card: {
                        _id: cardId,
                        question: 'new question',
                    },
                }
                await packsAPI.updateCard(updatedCard)
                let res = await packsAPI.getCards({cardsPack_id})
                dispatch(setCardsAC(res))
            } catch (e) {
                handleError(e, dispatch)
            }
        }

//types

export type CardsActionsType =
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof setCardsSortUpdAC>
    | ReturnType<typeof setCardsSortDownAC>
    | ReturnType<typeof setCardDefaultsAC>

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
