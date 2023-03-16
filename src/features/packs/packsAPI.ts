import axios from "axios";


export const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    // baseURL: process.env.NODE_ENV === 'development'
    //     ? 'http://localhost:7542/2.0/'
    //     : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

//authAPI
export const packsAPI = {
    getAllPacks() {
        let data = {packName: 'english', min: 0, max: 100, page: 1, pageCount: 10}
        return instance.get<ResponseTypePacks>('/cards/pack', {params: data}).then(res => res.data)
    },
    getSortUpPacks() {
        let data = {sortPacks: '0updated', page: 1, pageCount: 10}
        return instance.get<ResponseTypePacks>('/cards/pack', {params: data}).then(res => res.data)
    },
    getSortDownPacks() {
        let data = {sortPacks: '1updated', page: 1, pageCount: 10}
        return instance.get<ResponseTypePacks>('/cards/pack', {params: data}).then(res => res.data)
    },
    getAllCards(cardsPack_id: string) {
        let data = {page: 1, pageCount: 10, cardsPack_id}
        return instance.get<ResponseTypeCards>('/cards/card', {params: data}).then(res => res.data)
    },
    getSortUpCards(cardsPack_id:string) {
        let data = {sortPacks: '0updated', page: 1, pageCount: 10, cardsPack_id}
        return instance.get<ResponseTypeCards>('/cards/card', {params: data}).then(res => res.data)
    },
    getSortDownCards(cardsPack_id:string, ) {
        let data = {sortPacks: '1updated', page: 1, pageCount: 10,cardsPack_id}
        return instance.get<ResponseTypeCards>('/cards/card', {params: data}).then(res => res.data)
    },
    addPack() {
        let newPack = {
            cardsPack: {
                name: 'New Added Pack',
                private: false,
            },
        }
        return instance.post('/cards/pack', newPack).then(res => res.data.newCardsPack)
    },
}


export type ResponseTypePacks = {
    cardPacks: PackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

type PackType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number,
    created: string,
    updated: string,
}


export type ResponseTypeCards = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
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