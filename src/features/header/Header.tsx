import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import { Button } from '../../common/components/button/Button'
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
        <Button
          name={'Log Out'}
          callBack={() => {
            dispatch(logoutTC())
            navigate(PATH.LOGIN)
          }}
        />
      ) : (
        <Button
          name={'Sign In'}
          callBack={() => {
            navigate(PATH.LOGIN)
          }}
        />
      )}
    </div>
  )
}
