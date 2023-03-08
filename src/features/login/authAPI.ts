import axios from "axios";

//types
export type LoginRequestType = {
  email: string
  password: string
  rememberMe: boolean
}

type RegisterRequestType = {
  email: string
  password: string
}
export type LoginResponseType = {
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
export type ChangeDataResponseType = {
  name?: string
  avatar?: string // url or base64
}

export type ResponseType = {
  info: string
  error: string
  updatedUser: LoginResponseType
}

//instance
export const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:7542/2.0/"
      : "https://neko-back.herokuapp.com/2.0/",
  withCredentials: true
});

//authAPI
export const authAPI = {
  login(data: LoginRequestType) {
    return instance.post<LoginResponseType>("/auth/login", data).then(res => res.data);
  },
  logout() {
    return instance.delete<ResponseType>("/auth/me").then(res => res);
  },
  me() {
    return instance.post<LoginResponseType>("/auth/me", {}).then(res => res.data);
  },
  register(data: RegisterRequestType) {
    return instance.post<LoginResponseType>("/auth/register", data).then(res => res.data);
  },
  changeData(data:ChangeDataResponseType) {
    return instance.put<ResponseType>("/auth/me", data).then(res => res);
  }
};
