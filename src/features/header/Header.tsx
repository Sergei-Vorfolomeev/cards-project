import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import { ButtonComponent } from 'common/components/button/ButtonComponent'
import { PATH } from '../../common/components/routes/RoutesComponent'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { logoutTC } from '../login/authReducer'

export const Header = () => {
  const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <div className={styles.header}>
      <span>IT-Incubator</span>
      {isAuth ? (
        <ButtonComponent
          name={'Log Out'}
          callBack={() => {
            dispatch(logoutTC())
            navigate(PATH.LOGIN)
          }}
        />
      ) : (
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
