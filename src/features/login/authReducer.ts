import { Dispatch } from "redux";
import { authAPI, ChangeDataResponseType, LoginRequestType, LoginResponseType } from "./authAPI";
import axios from "axios";
import { setErrorAC } from "../../app/appReducer";
import { setRegisterLoadingAC } from "../registation/registration-reducer";

type InitialStateType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  // количество колод

  created: Date | null
  updated: Date | null
  isAdmin: boolean
  verified: boolean // подтвердил ли почту
  rememberMe: boolean

  error?: string
  isAuth: boolean
}

const initialState = {
  _id: "",
  email: "",
  name: "",
  avatar: "",
  publicCardPacksCount: 0,
  // количество колод

  created: null,
  updated: null,
  isAdmin: false,
  verified: false, // подтвердил ли почту
  rememberMe: false,

  error: "",
  isAuth: false
};

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        ...action.payload.data,
        isAuth: action.payload.value
      };
    case "LOGOUT":
      return {
        ...state,
        isAuth: action.payload.isAuth
      };
    case "CHANGE_DATA":
      return {
        ...state,
        name: action.payload.data.name ?? "",
        avatar: action.payload.data.avatar,
        updated: action.payload.data.updated
      };
    default:
      return state;
  }
};

//types
type ActionsType = LoginACType | ChangeDataACType | LogoutACType
type LoginACType = ReturnType<typeof loginAC>
type LogoutACType = ReturnType<typeof logoutAC>
type ChangeDataACType = ReturnType<typeof changeDataAC>
type ErrorType = {
  error: string
}
type changeDataACType = ChangeDataResponseType & {
  updated: null | Date
}

// action creators
const loginAC = (data: LoginResponseType | InitialStateType, value: boolean) => {
  return {
    type: "LOGIN",
    payload: {
      data,
      value
    }
  } as const;
};

const changeDataAC = (data: changeDataACType) => {
  return {
    type: "CHANGE_DATA",
    payload: {
      data
    }
  } as const;
};

const logoutAC = (isAuth: boolean) => {
  return {
    type: "LOGOUT",
    payload: {
      isAuth
    }
  } as const;
};

// thunk creators
export const loginTC = (data: LoginRequestType) => async (dispatch: Dispatch) => {
  try {
    const res: LoginResponseType = await authAPI.login(data);
    dispatch(loginAC(res, true));
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      const error = e.response?.data ? e.response.data.error : e.message;
      dispatch(setErrorAC(error));
    } else {
      dispatch(setErrorAC("Some error"));
    }
  }
};

export const logoutTC = () => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.logout();
    if (res.statusText === "OK") {
      dispatch(logoutAC(false));
    }
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      const error = e.response?.data ? e.response.data.error : e.message;
      dispatch(setErrorAC(error));
    } else {
      dispatch(setErrorAC("Some error"));
    }
  }
};

export const meTC = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setRegisterLoadingAC(true));
    const res = await authAPI.me();
    dispatch(loginAC(res, true));
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      const error = e.response?.data ? e.response.data.error : e.message;
      dispatch(setErrorAC(error));
    } else {
      dispatch(setErrorAC("Some error"));
    }
  } finally {
      dispatch(setRegisterLoadingAC(false));
  }

};

export const changeDataTC = (data: ChangeDataResponseType) => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.changeData(data);
    if (res.statusText === "OK") {
      const { data } = res;
      dispatch(changeDataAC({
        name: data.updatedUser.name,
        avatar: data.updatedUser.avatar,
        updated: data.updatedUser.updated
      }));
    }
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      const error = e.response?.data ? e.response.data.error : e.message;
      dispatch(setErrorAC(error));
    } else {
      dispatch(setErrorAC("Some error"));
    }
  }
};

