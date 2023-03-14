import axios from 'axios'

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
    let data = { packName: 'english', min: 0, max: 100, page: 1, pageCount: 100 }
    return instance.get<PacksResponseType>('/cards/pack', { params: data }).then(res => res.data)
  },
}

export type PacksResponseType = {
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
  cardsCount: number
  created: string
  updated: string
}
