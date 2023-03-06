import axios from 'axios'

//types
type LoginRequestType = {
  email: string
  password: string
  rememberMe: boolean
}

type RegisterRequestType = {
  email: string
  password: string
}

type LoginResponseType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  // количество колод

  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean // подтвердил ли почту
  rememberMe: boolean

  error?: string
}

//instance
export const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:7542/2.0/'
      : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

//authAPI
export const authAPI = {
  login(data: LoginRequestType) {
    return instance.post<LoginResponseType>('/auth/login', data).then(res => res.data)
  },
  me() {
    return instance.post<LoginResponseType>('/auth/me', {}).then(res => res.data)
  },
  register(data: RegisterRequestType){
    return instance.post<LoginResponseType>('/auth/register', data).then(res => res.data)
  }
}
