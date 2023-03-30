import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { popUpHeaderToggleAC } from '../../app/appReducer'
import { logoutTC } from '../login/authReducer'

import styles from './Header.module.css'

import { useAppDispatch, useAppSelector } from 'app/store'
import backToProfile from 'common/assets/pictures/backToProfile.svg'
import defaultAvatar from 'common/assets/pictures/defaultAvatar.jpg'
import logout from 'common/assets/pictures/logout.svg'
import { ButtonComponent } from 'common/components/button/ButtonComponent'
import { PATH } from 'common/components/routes/RoutesComponent'

export const Header = () => {
  const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const profileImg = useAppSelector(state => state.auth.avatar)
  const userName = useAppSelector(state => state.auth.name)
  const popUpHeader = useAppSelector(state => state.app.popUpHeaderOpen)

  return (
    <div className={styles.header}>
      <span>IT-Incubator</span>
      {isAuth && (
        <div>
          <div
            className={styles.headerAvatar}
            onClick={() => dispatch(popUpHeaderToggleAC(popUpHeader === true ? false : true))}
          >
            <span>{userName}</span>
            <img className={styles.header_avatar} src={profileImg ? profileImg : defaultAvatar} />
          </div>
        </div>
      )}

      {isAuth && popUpHeader && (
        <div className={styles.popUp}>
          <div
            className={styles.header_profile}
            onClick={() => {
              dispatch(popUpHeaderToggleAC(popUpHeader === true ? false : true))
              navigate(PATH.PROFILE)
            }}
          >
            <img src={backToProfile} />
            <span>Profile</span>
          </div>
          <div
            className={styles.header_logout}
            onClick={() => {
              dispatch(popUpHeaderToggleAC(popUpHeader === true ? false : true))
              dispatch(logoutTC())
              navigate(PATH.LOGIN)
            }}
          >
            <img src={logout} />
            <span>Log out</span>
          </div>
        </div>
      )}

      {!isAuth && (
        <ButtonComponent
          name={'Sign In'}
          callBack={() => {
            navigate(PATH.LOGIN)
          }}
        />
      )}
    </div>
  )
}
