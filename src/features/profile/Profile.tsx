import React from 'react'
import s from './Profile.module.css'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { PATH } from '../../common/components/routes/RoutesComponent'
import { Error } from '../../common/components/error/Error'
import { Loader } from '../../common/components/loader/Loader'
import avatar from './img/avatar.jpg'
import { EditableSpan } from './editable-span/EditableSpan'
import { changeDataTC, logoutTC } from '../login/authReducer'
import { Navigate, useNavigate } from 'react-router-dom'

export const Profile = () => {
  const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
  const email = useAppSelector<string>(state => state.auth.email)
  const name = useAppSelector<string>(state => state.auth.name)
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
        <button className={s.profile_backbutton}>Back to Packs List</button>
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
