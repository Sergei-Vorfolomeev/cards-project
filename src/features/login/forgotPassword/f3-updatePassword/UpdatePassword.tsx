import React, { ChangeEvent, useState } from 'react'
import s from './UpdatePassword.module.css'
import ForgotTitle from '../f4-common/forgotTitle/ForgotTitle'
import RegistrationInput from '../../../registration/registrationInput/RegistrationInput'
import ForgotButton from '../f4-common/forgotButton/ForgotButton'
import { Error } from '../../../../common/components/error/Error'
import { useAppDispatch } from '../../../../app/store'
import { Loader } from '../../../../common/components/loader/Loader'
import { Navigate, useParams } from 'react-router-dom'
import { PATH } from '../../../../common/components/routes/RoutesComponent'
import { setErrorAC } from '../../../../app/appReducer'
import { updatePasswordTC } from '../../authReducer'
import { useSelector } from 'react-redux'
import { getErrorMessageSelector, getLoadingSelector } from '../../../../app/appSelectors'
import { getNewPasswordWasSetSelector } from 'features/login/selectors/loginSelectors'

const UpdatePassword = () => {
  const newPasswordWasSet = useSelector(getNewPasswordWasSetSelector)
  const isLoading = useSelector(getLoadingSelector)
  const errorMessage = useSelector(getErrorMessageSelector)

  const dispatch = useAppDispatch()

  const [newPassword, setNewPassword] = useState<string>('')

  const updatePasswordParam = useParams().setNewPasswordToken

  const buttonOnClickHandler = () => {
    if (newPassword.length > 6) {
      updatePasswordParam
        ? dispatch(updatePasswordTC(newPassword, updatePasswordParam))
        : dispatch(setErrorAC('errorApi'))
    } else {
      dispatch(setErrorAC('Minimum password length is 7 symbols'))
    }
  }
  const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.currentTarget.value)
  }

  if (newPasswordWasSet) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div className={s.updatePassword}>
      <div className={s.updatePassword_container}>
        {isLoading && <Loader />}
        <ForgotTitle text={'Create new password'} />
        <div style={{ height: '80px' }}></div>
        <RegistrationInput
          type={'password'}
          id={'setNewPassword'}
          text={''}
          value={newPassword}
          onChange={inputOnChangeHandler}
        />
        {errorMessage && <Error message={errorMessage} />}
        <p>Create new password and we will send you further instructions to email</p>
        <ForgotButton text={'Create new password'} onClick={buttonOnClickHandler} />
      </div>
    </div>
  )
}

export default UpdatePassword
