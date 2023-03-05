type InitialStateType = typeof initialState

const initialState = {
  isAuth: false,
}

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuth: action.payload.value,
      }
    default:
      return state
  }
}

//types
type ActionsType = LoginACType
type LoginACType = ReturnType<typeof loginAC>

// action creators
const loginAC = (value: boolean) => {
  return {
    type: 'LOGIN',
    payload: {
      value,
    },
  } as const
}

// thunk creators
