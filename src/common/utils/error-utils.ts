import axios from 'axios'
import { setErrorAC } from '../../app/appReducer'
import { ErrorType } from '../../features/login/authReducer'
import { Dispatch } from 'redux'

export const handleError = (e: unknown, dispatch: Dispatch) => {
  if (axios.isAxiosError<ErrorType>(e)) {
    const error = e.response?.data ? e.response.data.error : e.message
    dispatch(setErrorAC(error))
  } else {
    dispatch(setErrorAC('Some error'))
  }
}
