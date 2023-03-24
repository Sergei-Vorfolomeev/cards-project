import React from 'react'

import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

import { changeDataTC, logoutTC } from '../login/authReducer'

import { EditableSpan } from './editable-span/EditableSpan'
import avatar from './img/avatar.jpg'
import s from './Profile.module.css'
import { getName } from './profileSelectors'

import { useAppDispatch, useAppSelector } from 'app/store'
import { Error } from 'common/components/error/Error'
import { Loader } from 'common/components/loader/Loader'
import { PATH } from 'common/components/routes/RoutesComponent'
import { getEmailSelector, getIsAuthSelector } from 'features/login/selectors/loginSelectors'

export const Profile = () => {
  const isAuth = useSelector(getIsAuthSelector)
  const email = useSelector(getEmailSelector)
  const name = useSelector(getName)
  const loading = useAppSelector(state => state.app.loading)
  const errorMessage = useAppSelector<string>(state => state.app.errorMessage)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onClickHandler = () => {
    dispatch(logoutTC())
    navigate(PATH.LOGIN)
  }

  const onChangeHandler = (newValue: string) => {
    if (newValue) {
      dispatch(changeDataTC({ name: newValue }))
    }
  }

  if (!isAuth) {
    return <Navigate to={PATH.LOGIN} />
  }

  return loading ? (
    <Loader />
  ) : (
    <div className={s.profile_container}>
      <div className={s.backbutton_wrapper}>
        <button className={s.profile_backbutton} onClick={() => navigate(PATH.PACKS_ALL)}>
          Back to Packs List
        </button>
      </div>
      <div className={s.profile_wrapper}>
        <h2>Personal Information</h2>
        <div>
          <div>
            <img src={avatar} alt="avatar" />
          </div>
          <div className={s.profileName}>
            <EditableSpan value={name} onChange={onChangeHandler} />
          </div>
          <div className={s.profileEmail}>{email}</div>
          <button className={s.profileButton} onClick={onClickHandler}>
            Log out
          </button>
        </div>
        {errorMessage && <Error message={errorMessage} />}
      </div>
    </div>
  )
}
